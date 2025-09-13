import runSeeds from '../../../database/seeds/run.js';
import getDatabase from '../../../database/index.js';
import logger from '../../../logger.js';
import { getEnv } from '../../../env.js';

export default async function start(): Promise<void> {
	const database = getDatabase();
	const { DB_PREFIX: prefix } = getEnv();

	try {
		await runSeeds(database, { prefix });
		database.destroy();
		process.exit(0);
	} catch (err: any) {
		logger.error(err);
		database.destroy();
		process.exit(1);
	}
}
