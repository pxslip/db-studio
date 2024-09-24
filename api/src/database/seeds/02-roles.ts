import { type TableSeed } from './run.js';

export default {
	table: 'roles',
	columns: {
		id: { type: 'uuid', primary: true, nullable: false },
		name: { type: 'string', length: 100, nullable: false },
		icon: { type: 'string', length: 30, nullable: false, default: 'supervised_user_circle' },
		description: { type: 'text' },
		ip_access: { type: 'text' },
		enforce_tfa: { type: 'boolean', nullable: false, default: false },
		module_list: { type: 'json' },
		collection_list: { type: 'json' },
		admin_access: { type: 'boolean', nullable: false, default: false },
		app_access: { type: 'boolean', nullable: false, default: true },
	},
} as TableSeed;
