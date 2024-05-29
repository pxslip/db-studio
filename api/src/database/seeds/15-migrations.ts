import { type TableSeed } from './run.js';

export default {
	table: 'migrations',
	columns: {
		version: { type: 'string', primary: true, nullable: false },
		name: { type: 'string', length: 255, nullable: false },
		timestamp: { type: 'timestamp', default: '$now' },
	},
} as TableSeed;
