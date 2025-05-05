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
		let { collection, category, value } = options;
		return {
			collection: collection,
			query: {
				limit: -1,
				fields: [category, value],
				// group: [category],
				// aggregate: { [aggregate ?? 'avg']: [value] },
			},
		};
	},
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
				field: 'values',
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
