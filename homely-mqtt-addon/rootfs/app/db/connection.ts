import { Sequelize } from "sequelize";
import { appConfig } from "../utils/config";
import { logger } from "../utils/logger";

const dbConfig = appConfig.database;

// ((sql: string, timing?: number) => void)
const dbLogger = (sql: string, timing?: number) => {
	return logger.debug(`[DB][${timing}ms] ${sql}`);
};

export const sequelize = new Sequelize({
	...dbConfig.connection,
	logging: dbLogger,
});
