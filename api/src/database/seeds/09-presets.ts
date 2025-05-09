import { type TableSeed } from './run.js';

export default {
	table: 'presets',
	columns: {
		id: { increments: true },
		bookmark: { type: 'string', length: 255 },
		user: { type: 'uuid', references: { table: 'users', column: 'id' } },
		role: { type: 'uuid', references: { table: 'roles', column: 'id' } },
		collection: { type: 'string', length: 64, references: { table: 'collections', column: 'collection' } },
		search: { type: 'string', length: 100 },
		filters: { type: 'json' },
		layout: { type: 'string', length: 100, default: 'tabular' },
		layout_query: { type: 'json' },
		layout_options: { type: 'json' },
	},
} as TableSeed;
