import type { Field, DeepPartial, Type } from '@db-studio/types';

export interface DropdownOption {
	value: string;
	text: string;
	disabled?: boolean;
	type?: Type;
}

export interface AggregateFieldOptions {
	field: string;
	name: string;
	moreChoices?: DropdownOption[];
}

export function aggregateField({ field, name, moreChoices = [] }: AggregateFieldOptions): DeepPartial<Field> {
	return {
		field,
		type: 'string',
		name,
		meta: {
			width: 'full',
			interface: 'select-dropdown',
			options: {
				choices: [
					{
						text: '$t:count',
						value: 'count',
					},
					{
						text: '$t:count_distinct',
						value: 'countDistinct',
					},
					{
						text: '$t:avg',
						value: 'avg',
					},
					{
						text: '$t:avg_distinct',
						value: 'avgDistinct',
					},
					{
						text: '$t:sum',
						value: 'sum',
					},
					{
						text: '$t:sum_distinct',
						value: 'sumDistinct',
					},
					{
						text: '$t:min',
						value: 'min',
					},
					{
						text: '$t:max',
						value: 'max',
					},
					...moreChoices,
				],
			},
		},
	};
}
