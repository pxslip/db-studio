<template>
	<v-notice v-if="!collection" type="warning">
		{{ t('collection_field_not_setup') }}
	</v-notice>
	<template v-else>
		<v-menu placement="bottom-start" show-arrow attached>
			<template #activator="{ toggle }">
				<v-input :disabled="disabled" :placeholder="compPlaceholder" :model-value="field?.name">
					<template #append>
						<v-icon name="keyboard_arrow_down" outline clickable :disabled="disabled" @click="toggle" right />
					</template>
				</v-input>
			</template>
			<v-field-list :collection="collection" @add="addField" />
		</v-menu>
	</template>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed, inject, ref, watch } from 'vue';
import { useFieldsStore } from '@/stores/fields';

interface Props {
	collectionField?: string;
	collectionName?: string;
	typeAllowList?: string[];
	value?: string;
	disabled?: boolean;
	placeholder?: string;
	allowNone?: boolean;
	allowPrimaryKey?: boolean;
	allowForeignKeys?: boolean;
}

const { t } = useI18n();

const props = withDefaults(defineProps<Props>(), {
	typeAllowList: () => [],
	disabled: false,
	allowNone: false,
	allowPrimaryKey: false,
	allowForeignKeys: true,
});

const emit = defineEmits(['input']);

const fieldsStore = useFieldsStore();

const values = inject('values', ref<Record<string, any>>({}));

const collection = computed(() => (props.collectionField ? values.value[props.collectionField] : props.collectionName));
const compPlaceholder = computed(() => {
	return props.placeholder ?? t('select_a_field');
});
const addField = (value: string[]) => {
	emit('input', value[0] ?? null);
};

const field = computed(() => {
	if (collection && props.value) {
		return fieldsStore.getField(collection.value, props.value);
	}
});

// Reset value whenever the chosen collection changes
watch(collection, (newCol, oldCol) => {
	if (oldCol !== null && newCol !== oldCol) {
		emit('input', null);
	}
});
</script>
