import { definePanel, useCollection } from '@db-studio/extensions-sdk';
import { aggregateValue, aggregateField, type DropdownOption } from '@db-studio/extensions-sdk/fields';
import PanelComponent from './panel-bar-chart.vue';
import { computed } from 'vue';
import { useFieldsStore } from '@/stores/fields';
import { getLocalTypeForField } from '@/utils/get-local-type';

export default definePanel({
	id: 'ushmm.bar-chart',
	name: 'Bar Charts',
	icon: 'box',
	description: 'Create a panel that shows a Bar Chart',
	component: PanelComponent,
	query(options) {
		const required = ['collection', 'category', 'value'];
		if (required.some((field) => !Object.keys(options).includes(field))) {
			return;
		}
		let { collection, category, value, aggregate } = options;
		const fields = useFieldsStore();
		// test if values is a relational field
		const valueField = fields.getField(collection, value);
		// const valueType = getLocalTypeForField(collection, values);
		// if (valueType && ['o2m', 'm2m'].includes(valueType)) {
		// 	values = `${valueField?.collection}.`;
		// }
		return {
			collection: collection,
			query: {
				group: [category],
				aggregate: { [aggregate ?? 'avg']: [value] },
				limit: -1,
			},
		};
	},
	options: ({ options }) => {
		const aggregateRequiresNumber = computed(() => {
			if (options?.['aggregate']) {
				if (['avg', 'avgDistinct', 'sum', 'sumDistinct', 'min', 'max'].includes(options['aggregate'])) {
					return true;
				}
			}
			return false;
		});
		const valueFields = computed(() => {
			if (options?.['collection']) {
				const { fields } = useCollection(options['collection']);
				const choices = fields.value
					.map<DropdownOption | null>((field) => {
						if (field !== null && field !== undefined) {
							const type = getLocalTypeForField(field.collection, field.field);
							if (type !== null && !['alias', 'group', 'presentation', 'm2o', 'm2a', 'm2m'].includes(type)) {
								return { value: field.field, text: `${field.name} - ${field.type}`, type: field.type };
							}
						}
						return null;
					})
					.filter((value) => value !== null);
				if (aggregateRequiresNumber.value) {
					choices.filter((option) => {
						return option?.type && ['integer', 'bigInteger', 'float', 'decimal'].includes(option.type);
					});
				}
				return choices;
			}
			return [];
		});
		return [
			{
				field: 'collection',
				type: 'string',
				name: 'Collection',
				meta: {
					interface: 'system-collection',
					required: true,
					options: {
						includeSystem: true,
					},
					width: 'full',
				},
			},
			{
				field: 'category',
				name: 'Category Field',
				type: 'string',
				meta: {
					interface: 'system-field',
					required: true,
					width: 'half',
					options: {
						collectionField: 'collection',
						allowPrimaryKey: true,
						placeholder: '$t:primary_key',
					},
				},
			},
			aggregateValue({
				field: 'value',
				allowForeignKeys: true,
				allowPrimaryKey: true,
				collectionField: 'collection',
				functionField: 'aggregate',
			}),
			{
				schema: {
					default_value: 'avg',
				},
				...aggregateField({ field: 'aggregate', name: 'Aggregate Function' }),
			},
		];
	},
	minWidth: 12,
	minHeight: 8,
});
