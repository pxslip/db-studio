import { type TableSeed } from './run.js';

export default {
	table: 'revisions',
	columns: {
		id: { increments: true },
		activity: { type: 'integer', unsigned: true, nullable: false, references: { table: 'activity', column: 'id' } },
		collection: {
			type: 'string',
			length: 64,
			nullable: false,
			references: { table: 'collections', column: 'collection' },
		},
		item: { type: 'string', length: 255, nullable: false },
		data: { type: 'json' },
		delta: { type: 'json' },
		parent: { type: 'integer', unsigned: true, references: { table: 'revisions', column: 'id' } },
	},
} as TableSeed;
