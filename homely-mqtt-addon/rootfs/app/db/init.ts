import { appConfig } from "../utils/config";
import { sequelize } from "./connection";

const force = appConfig.database.reset ?? false;

/**
 * Initialise the database connection and sync the models.
 */
export const init = async () => {
	await sequelize.sync({ force });
};
