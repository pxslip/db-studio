import { type Condition as BaseCondition, type DeepPartial, type Field, type Type } from '@db-studio/types';

export interface AggregateValueFieldParams {
	field?: string;
	name?: string;
	width?: 'half' | 'full';
	allowForeignKeys?: boolean;
	allowPrimaryKey?: boolean;
	numericAllowForeignKeys?: boolean;
	numericAllowPrimaryKey?: boolean;
	collectionField?: string;
	collectionName?: string;
	functionField?: string;
}

export interface AggregateValueFieldOptions {
	field: string;
	name: string;
	type: string;
	meta: {
		interface: string;
		width: string;
		options: MetaOptions;
		conditions: Condition[];
	};
}

interface MetaOptions {
	allowPrimaryKey: boolean;
	allowForeignKeys: boolean;
	typeAllowList: Type[];
	collectionField?: string;
	collectionName?: string;
}

interface Condition extends Omit<BaseCondition, 'name'> {
	options: MetaOptions;
}

export function aggregateValue({
	field = 'value',
	name = '$t:panels.time_series.value_field',
	width = 'half',
	numericAllowForeignKeys = false,
	numericAllowPrimaryKey = false,
	allowForeignKeys = true,
	allowPrimaryKey = true,
	functionField = 'function',
	collectionField,
	collectionName,
}: AggregateValueFieldParams): DeepPartial<Field> {
	if (!collectionField && !collectionName) {
		throw new Error('collectionField or collectionName is required');
	}
	const options: DeepPartial<Field> = {
		field,
		type: 'string',
		name,
		meta: {
			interface: 'system-field',
			width,
			options: {
				allowForeignKeys: numericAllowForeignKeys,
				allowPrimaryKey: numericAllowPrimaryKey,
				typeAllowList: ['integer', 'bigInteger', 'float', 'decimal'],
			},
			conditions: [
				{
					rule: {
						[functionField]: {
							_in: ['count', 'countDistinct'],
						},
					},
					options: {
						allowPrimaryKey,
						allowForeignKeys,
						typeAllowList: ['integer', 'bigInteger', 'uuid', 'string'],
					},
				},
			],
		},
	};
	if (options.meta && options.meta.options) {
		if (collectionField) {
			options.meta.options['collectionField'] = collectionField;
		} else if (collectionName) {
			options.meta.options['collectionName'] = collectionName;
		}
	}
	return options;
}
