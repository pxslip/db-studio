import { type TableSeed } from './run.js';

export default {
	table: 'fields',
	columns: {
		id: { increments: true },
		collection: {
			type: 'string',
			length: 64,
			nullable: false,
			references: { table: 'collections', column: 'collection' },
		},
		field: { type: 'string', length: 64, nullable: false },
		special: { type: 'string', length: 64 },
		interface: { type: 'string', length: 64 },
		options: { type: 'json' },
		display: { type: 'string', length: 64 },
		display_options: { type: 'json' },
		locked: { type: 'boolean', default: false, nullable: false },
		readonly: { type: 'boolean', default: false, nullable: false },
		hidden: { type: 'boolean', default: false, nullable: false },
		sort: { type: 'integer', unsigned: true },
		width: { type: 'string', length: 30, default: 'full' },
		group: { type: 'integer', unsigned: true, references: { table: 'fields', column: 'id' } },
		translations: { type: 'json' },
		note: { type: 'text' },
	},
} as TableSeed;
