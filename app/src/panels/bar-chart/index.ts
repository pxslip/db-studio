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
	// query(options) {
	// 	const required = ['collection', 'category', 'value'];
	// 	if (required.some((field) => !Object.keys(options).includes(field))) {
	// 		return;
	// 	}
	// 	let { collection, category, value, aggregate } = options;
	// 	const fields = useFieldsStore();
	// 	// test if values is a relational field
	// 	const valueField = fields.getField(collection, value);
	// 	// const valueType = getLocalTypeForField(collection, values);
	// 	// if (valueType && ['o2m', 'm2m'].includes(valueType)) {
	// 	// 	values = `${valueField?.collection}.`;
	// 	// }
	// 	return {
	// 		collection: collection,
	// 		query: {
	// 			group: [category],
	// 			aggregate: { [aggregate ?? 'avg']: [value] },
	// 			limit: -1,
	// 		},
	// 	};
	// },
	options: () => {
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
					interface: 'system-field-deep',
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
