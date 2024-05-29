import { type TableSeed } from './run.js';

export default {
	table: 'activity',
	columns: {
		id: { increments: true },
		action: { type: 'string', length: 45, nullable: false },
		user: { type: 'uuid' },
		timestamp: { type: 'timestamp', nullable: false, default: '$now' },
		ip: { type: 'string', length: 50, nullable: false },
		user_agent: { type: 'string', length: 255 },
		collection: {
			type: 'string',
			length: 64,
			nullable: false,
			references: { table: 'collections', column: 'collection' },
		},
		item: { type: 'string', length: 255, nullable: false },
		comment: { type: 'text' },
	},
} as TableSeed;
