import { type TableSeed } from './run.js';

export default {
	table: 'permissions',
	columns: {
		id: { increments: true },
		role: { type: 'uuid', references: { table: 'roles', column: 'id' } },
		collection: {
			type: 'string',
			length: 64,
			nullable: false,
			references: { table: 'collections', column: 'collection' },
		},
		action: { type: 'string', length: 10, nullable: false },
		permissions: { type: 'json' },
		validation: { type: 'json' },
		presets: { type: 'json' },
		fields: { type: 'text' },
		limit: { type: 'integer', unsigned: true },
	},
} as TableSeed;
