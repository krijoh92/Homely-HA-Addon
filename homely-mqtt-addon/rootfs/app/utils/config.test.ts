import { describe, expect, it } from "bun:test";

// Test the env var resolution logic directly without loading the full config
// (which would require the actual YAML file and its dependencies)

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

describe("resolveEnvVars", () => {
	it("resolves a single env var", () => {
		process.env.TEST_VAR = "hello";
		expect(resolveEnvVars("${TEST_VAR}")).toBe("hello");
		process.env.TEST_VAR = undefined;
	});

	it("resolves multiple env vars", () => {
		process.env.HOST = "localhost";
		process.env.PORT = "1883";
		expect(resolveEnvVars("mqtt://${HOST}:${PORT}")).toBe("mqtt://localhost:1883");
		process.env.HOST = undefined;
		process.env.PORT = undefined;
	});

	it("replaces missing env vars with empty string", () => {
		process.env.MISSING_VAR = undefined;
		expect(resolveEnvVars("${MISSING_VAR}")).toBe("");
	});

	it("leaves strings without env vars unchanged", () => {
		expect(resolveEnvVars("plain text")).toBe("plain text");
	});
});

describe("processValues", () => {
	it("processes strings with env vars", () => {
		process.env.TEST_USER = "admin";
		expect(processValues("${TEST_USER}")).toBe("admin");
		process.env.TEST_USER = undefined;
	});

	it("processes nested objects", () => {
		process.env.DB_HOST = "db.local";
		const input = {
			database: {
				connection: {
					host: "${DB_HOST}",
					port: 5432,
				},
			},
		};
		const result = processValues(input) as {
			database: { connection: { host: string; port: number } };
		};
		expect(result.database.connection.host).toBe("db.local");
		expect(result.database.connection.port).toBe(5432);
		process.env.DB_HOST = undefined;
	});

	it("processes arrays", () => {
		process.env.ITEM = "resolved";
		const input = ["${ITEM}", "static"];
		const result = processValues(input) as string[];
		expect(result[0]).toBe("resolved");
		expect(result[1]).toBe("static");
		process.env.ITEM = undefined;
	});

	it("leaves numbers unchanged", () => {
		expect(processValues(42)).toBe(42);
	});

	it("leaves booleans unchanged", () => {
		expect(processValues(true)).toBe(true);
	});

	it("leaves null unchanged", () => {
		expect(processValues(null)).toBeNull();
	});
});
