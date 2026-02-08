import pino from "pino";
import { appConfig } from "./config";

const logLevel = appConfig.logLevel;

export const logger = pino({
	level: logLevel ?? "info",
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
		},
	},
});
