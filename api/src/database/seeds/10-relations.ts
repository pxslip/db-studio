import { type TableSeed } from './run.js';

export default {
	table: 'relations',
	columns: {
		id: { increments: true },
		many_collection: {
			type: 'string',
			length: 64,
			nullable: false,
			references: { table: 'collections', column: 'collection' },
		},
		many_field: { type: 'string', length: 64, nullable: false },
		many_primary: { type: 'string', length: 64, nullable: false },
		one_collection: { type: 'string', length: 64, references: { table: 'collections', column: 'collection' } },
		one_field: { type: 'string', length: 64 },
		one_primary: { type: 'string', length: 64 },
		one_collection_field: { type: 'string', length: 64 },
		one_allowed_collections: { type: 'text' },
		junction_field: { type: 'string', length: 64 },
	},
} as TableSeed;
