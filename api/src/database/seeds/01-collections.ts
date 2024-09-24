import { type TableSeed } from './run.js';

export default {
	table: 'collections',
	columns: {
		collection: { type: 'string', length: 64, primary: true, nullable: false },
		icon: { type: 'string', length: 30 },
		note: { type: 'text' },
		display_template: { type: 'string', length: 255 },
		hidden: { type: 'boolean', nullable: false, default: false },
		singleton: { type: 'boolean', nullable: false, default: false },
		translations: { type: 'json' },
		archive_field: { type: 'string', length: 64 },
		archive_app_filter: { type: 'boolean', nullable: false, default: true },
		archive_value: { type: 'string', length: 255 },
		unarchive_value: { type: 'string', length: 255 },
		sort_field: { type: 'string', length: 64 },
	},
} as TableSeed;
