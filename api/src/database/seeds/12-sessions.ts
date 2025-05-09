import { type TableSeed } from './run.js';

export default {
	table: 'sessions',
	columns: {
		token: { type: 'string', length: 64, primary: true, nullable: false },
		user: { type: 'uuid', nullable: false, references: { table: 'users', column: 'id' } },
		expires: { type: 'timestamp', nullable: false },
		ip: { type: 'string', length: 255 },
		user_agent: { type: 'string', length: 255 },
	},
} as TableSeed;
