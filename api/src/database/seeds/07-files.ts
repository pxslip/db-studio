import { type TableSeed } from './run.js';

export default {
	table: 'files',
	columns: {
		id: { type: 'uuid', primary: true, nullable: false },
		storage: { type: 'string', nullable: false },
		filename_disk: { type: 'string', length: 255 },
		filename_download: { type: 'string', length: 255, nullable: false },
		title: { type: 'string', length: 255 },
		type: { type: 'string', length: 255 },
		folder: { type: 'uuid', references: { table: 'folders', column: 'id' } },
		uploaded_by: { type: 'uuid', references: { table: 'users', column: 'id' } },
		uploaded_on: { type: 'timestamp', nullable: false, default: '$now' },
		modified_by: { type: 'uuid', references: { table: 'users', column: 'id' } },
		modified_on: { type: 'timestamp', nullable: false, default: '$now' },
		charset: { type: 'string', length: 50 },
		filesize: { type: 'integer', nullable: false, default: 0, unsigned: true },
		width: { type: 'integer', unsigned: true },
		height: { type: 'integer', unsigned: true },
		duration: { type: 'integer', unsigned: true },
		embed: { type: 'string', length: 200 },
		description: { type: 'text' },
		location: { type: 'text' },
		tags: { type: 'text' },
		metadata: { type: 'json' },
	},
} as TableSeed;
