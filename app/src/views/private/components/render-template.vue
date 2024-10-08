<template>
	<div ref="templateEl" class="render-template">
		<span class="vertical-aligner" />
		<template v-for="(part, index) in parts" :key="index">
			<value-null v-if="part === null || (typeof part === 'object' && part.value === null)" />
			<v-error-boundary v-else-if="typeof part === 'object' && part.component" :name="`display-${part.component}`">
				<component
					:is="`display-${part.component}`"
					v-bind="part.options"
					:value="part.value"
					:interface="part.interface"
					:interface-options="part.interfaceOptions"
					:type="part.type"
					:collection="part.collection"
					:field="part.field"
				/>

				<template #fallback>
					<span>{{ part.value }}</span>
				</template>
			</v-error-boundary>
			<span v-else-if="typeof part === 'string'" :dir="direction">{{ translate(part) }}</span>
			<span v-else>{{ part }}</span>
		</template>
	</div>
</template>

<script setup lang="ts">
import { useExtension } from '@/composables/use-extension';
import { useCollectionsStore } from '@/stores/collections';
import { useFieldsStore } from '@/stores/fields';
import { getDefaultDisplayForType } from '@/utils/get-default-display-for-type';
import { getLocalTypeForField } from '@/utils/get-local-type';
import { getRelatedCollection } from '@/utils/get-related-collection';
import { translate } from '@/utils/translate-literal';
import { Field } from '@db-studio/types';
import { getFlat } from '@db-studio/utils';
import { computed, ref } from 'vue';

interface Props {
	template: string;
	collection?: string;
	fields?: Field[];
	item?: Record<string, any>;
	direction?: string;
}

const props = withDefaults(defineProps<Props>(), {
	collection: undefined,
	fields: () => [],
	item: () => ({}),
	direction: undefined,
});

const fieldsStore = useFieldsStore();
const collectionStore = useCollectionsStore();

const templateEl = ref<HTMLElement>();

const regex = /({{.*?}})/g;

const parts = computed(() =>
	props.template
		.split(regex)
		.filter((p) => p)
		.map((part) => {
			if (part.startsWith('{{') === false) return part;

			let fieldKey = part.replace(/{{/g, '').replace(/}}/g, '').trim();
			let fieldKeyBefore = fieldKey.split('.').slice(0, -1).join('.');
			let fieldKeyAfter = fieldKey.split('.').slice(-1)[0];

			// Try getting the value from the item, return some question marks if it doesn't exist
			let value = getFlat(props.item, fieldKeyBefore.length > 0 ? fieldKeyBefore : fieldKey);

			if (value && typeof value === 'object') {
				return Array.isArray(value)
					? handleArray(value, { fieldKey, fieldKeyBefore, fieldKeyAfter })
					: handleObject(value as Record<string, unknown>, { fieldKey, fieldKeyBefore, fieldKeyAfter });
			}

			return value;
		})
		.map((p) => p ?? null),
);

interface HandlerOptions {
	fieldKey: string;
	fieldKeyBefore: string;
	fieldKeyAfter: string;
}

function handleArray(value: any, { fieldKey, fieldKeyAfter }: HandlerOptions) {
	const field = props.collection
		? fieldsStore.getField(props.collection, fieldKey)
		: (props.fields?.find((field) => field.field === fieldKey) ?? null);

	if (value === undefined) return null;

	if (!field) return value;

	const displayInfo = useExtension(
		'display',
		computed(() => field.meta?.display ?? null),
	);
	const renderOptions = {
		component: field.meta?.display,
		options: field.meta?.display_options,
		value: value,
		interface: field.meta?.interface,
		interfaceOptions: field.meta?.options,
		type: field.type,
		collection: field.collection,
		field: field.field,
	};

	if (!displayInfo.value) {
		const localType = getLocalTypeForField(field.collection, field.field);
		if (localType === 'standard') {
			// we've gotten an array of distinct values, just render them
			return value
				.map((item: Record<string, unknown>) => item?.[field.field])
				.filter((item: unknown) => !!item)
				.join(', ');
		}
		// handle the related collection templating
		const relatedCollection = getRelatedCollection(field.collection, field.field);
		// get the default template if available
		if (relatedCollection) {
			const collection = relatedCollection.junctionCollection ?? relatedCollection.relatedCollection;
			const template = collectionStore.getCollection(collection)?.meta?.display_template;
			if (template) {
				renderOptions.options = { template };
				renderOptions.value = (value as Record<string, any>[]).map((val) => val?.[fieldKeyAfter]);
			} else {
				// use the related collections primary key field
				const pk = fieldsStore
					.getFieldsForCollection(field.collection)
					.find((field) => field.schema?.is_primary_key)?.field;
				if (pk) {
					renderOptions.options = { template: `{{${pk}}}` };
				}
			}
		}

		renderOptions.options = { template: `{{${fieldKey}}}`, ...renderOptions.options };
		renderOptions.component = 'related-values';
	} else {
		if (renderOptions.component === 'raw') {
			if (typeof value[0] === 'object' && value[0]?.[field.field]) {
				renderOptions.value =
					value.length > 1
						? value.map((item: Record<string, unknown>) => item?.[field.field]).filter((item: unknown) => !!item)
						: value[0]?.[field.field];
			}
		}
	}

	return renderOptions;
}

function handleObject(
	container: Record<string, unknown> | unknown[],
	{ fieldKey, fieldKeyBefore, fieldKeyAfter }: HandlerOptions,
) {
	const value = getFlat(container, fieldKeyAfter);
	if (Array.isArray(value)) {
		return handleArray(value, { fieldKeyBefore, fieldKeyAfter, fieldKey });
	}
	const field = props.collection
		? fieldsStore.getField(props.collection, [fieldKeyBefore, fieldKeyAfter].filter((p) => p).join('.')) ||
			props.fields?.find((field) => field.field === fieldKeyAfter)
		: null;

	/**
	 * This is for cases where you are rendering a display template directly on
	 * directus_files. The $thumbnail fields doesn't exist, but instead renders a
	 * thumbnail based on the other fields in the file info. In that case, the value
	 * should be the whole related file object, not just the fake "thumbnail" field. By
	 * stripping out the thumbnail part in the field key path, the rest of the function
	 * will extract the value correctly.
	 */
	if (field && field.collection === 'directus_files' && field.field === '$thumbnail') {
		fieldKey = fieldKey
			.split('.')
			.filter((part) => part !== '$thumbnail')
			.join('.');
	}

	if (value === undefined) return null;

	if (!field) return value;

	const display = field?.meta?.display || getDefaultDisplayForType(field.type);

	// No need to render the empty display overhead in this case
	if (display === 'raw') return value;

	const displayInfo = useExtension(
		'display',
		computed(() => field.meta?.display ?? null),
	);

	// If used display doesn't exist in the current project, return raw value
	if (!displayInfo.value) return value;

	return {
		component: field.meta?.display,
		options: field.meta?.display_options,
		value: value,
		interface: field.meta?.interface,
		interfaceOptions: field.meta?.options,
		type: field.type,
		collection: field.collection,
		field: field.field,
	};
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/no-wrap';

.render-template {
	height: 100%;
	position: relative;
	max-width: 100%;
	padding-right: 8px;

	.vertical-aligner {
		display: inline-block;
		width: 0;
		height: 100%;
		vertical-align: middle;
	}

	@include no-wrap;

	> * {
		vertical-align: middle;
	}

	.render-template {
		display: inline;
	}
}

.subdued {
	color: var(--foreground-subdued);
}
</style>
