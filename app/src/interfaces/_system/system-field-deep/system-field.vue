<template>
	<v-notice v-if="!collectionField && !collectionName" type="warning">
		{{ t('collection_field_not_setup') }}
	</v-notice>
	<v-field-list v-else :collection="collection" :field="value" @add="$emit('input', $event)" />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed, inject, ref, watch } from 'vue';
import { useFieldsStore } from '@/stores/fields';

interface Props {
	collectionField?: string | null;
	collectionName?: string | null;
	typeAllowList?: string[];
	value?: string;
	disabled?: boolean;
	placeholder?: string;
	allowNone?: boolean;
	allowPrimaryKey?: boolean;
	includeFunctions?: boolean;
	includeRelations?: boolean;
}

const { t } = useI18n();

const fieldsStore = useFieldsStore();

const values = inject('values', ref<Record<string, any>>({}));

const props = withDefaults(defineProps<Props>(), {
	collectionField: null,
	collectionName: null,
	typeAllowList: () => [],
	disabled: false,
	allowNone: false,
	allowPrimaryKey: false,
	includeFunctions: true,
	includeRelations: true,
});

const emit = defineEmits(['input']);

const collection = computed(() => {
	if (props.collectionField) {
		return values.value[props.collectionField];
	}
	return props.collectionName;
});

const fields = computed(() => {
	if (!props.collectionField && !props.collectionName) return [];
	return fieldsStore.getFieldsForCollection(collection.value);
});

// Reset value whenever the chosen collection changes
watch(collection, (newCol, oldCol) => {
	if (oldCol !== null && newCol !== oldCol) {
		emit('input', null);
	}
});
</script>
