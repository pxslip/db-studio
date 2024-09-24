import { type TableSeed } from './run.js';

export default {
	table: 'settings',
	columns: {
		id: { increments: true },
		project_name: { type: 'string', length: 100, nullable: false, default: 'Directus' },
		project_url: { type: 'string', length: 255 },
		project_color: { type: 'string', length: 10, default: '#00C897' },
		project_logo: { type: 'uuid', references: { table: 'files', column: 'id' } },
		public_foreground: { type: 'uuid', references: { table: 'files', column: 'id' } },
		public_background: { type: 'uuid', references: { table: 'files', column: 'id' } },
		public_note: { type: 'text' },
		auth_login_attempts: { type: 'integer', default: 25, unsigned: true },
		auth_password_policy: { type: 'string', length: 100 },
		storage_asset_transform: { type: 'string', length: 7, default: 'all' },
		storage_asset_presets: { type: 'json' },
		custom_css: { type: 'text' },
	},
} as TableSeed;
