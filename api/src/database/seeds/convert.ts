import yaml from 'js-yaml';
import fs, { readFile, readdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import type { TableSeed } from './run.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const seedFiles = await readdir(__dirname, { encoding: 'utf-8', withFileTypes: true });

for (const file of seedFiles) {
	if (/\.ya?ml$/.test(file.name)) {
		const data = yaml.load((await readFile(join(__dirname, file.name), 'utf8')).toString()) as TableSeed;

		// Remove 'directus_' prefix from table name in the data object, we'll still default to it, but make that configurable at install time
		data.table = data.table.replace('directus_', '');

		for (const columnName in data.columns) {
			const column = data.columns[columnName];

			if (column?.references) {
				//update the reference to remove 'directus_' prefix if it exists
				column.references.table = column.references.table.replace('directus_', '');
			}
		}

		const jsonPath = file.name.replace(/ya?ml$/, 'ts');
		const jsonData = JSON.stringify(data);

		await writeFile(
			join(__dirname, jsonPath),
			`import { type TableSeed } from './run.js';\n\nexport default ${jsonData} as TableSeed`
		);
	}
}
