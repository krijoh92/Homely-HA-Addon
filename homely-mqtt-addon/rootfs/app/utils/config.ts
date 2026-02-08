import type { Config } from "../models/config";

// Bun built-in YAML import - no external yaml package needed
// @ts-expect-error Bun provides built-in YAML file imports
import rawConfig from "../config/local.yml";

function resolveEnvVars(value: string): string {
	return value.replace(/\$\{(\w+)\}/g, (_, name) => process.env[name] ?? "");
}

function processValues(obj: unknown): unknown {
	if (typeof obj === "string") {
		return resolveEnvVars(obj);
	}
	if (Array.isArray(obj)) {
		return obj.map(processValues);
	}
	if (obj !== null && typeof obj === "object") {
		const result: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(obj)) {
			result[key] = processValues(value);
		}
		return result;
	}
	return obj;
}

export const appConfig = processValues(rawConfig) as Config;
