import { type TableSeed } from './run.js';

export default {
	table: 'folders',
	columns: {
		id: { type: 'uuid', primary: true, nullable: false },
		name: { type: 'string', length: 255, nullable: false },
		parent: { type: 'uuid', references: { table: 'folders', column: 'id' } },
	},
} as TableSeed;
