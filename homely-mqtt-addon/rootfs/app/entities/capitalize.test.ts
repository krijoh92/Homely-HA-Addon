import { describe, expect, it } from "bun:test";

// Extract the capitalize function for testing without pulling in config/db dependencies
const capitalize = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "NOT_AVAILABLE");

describe("capitalize", () => {
	it("capitalizes the first letter of a lowercase string", () => {
		expect(capitalize("temperature")).toBe("Temperature");
	});

	it("keeps an already capitalized string", () => {
		expect(capitalize("Gateway")).toBe("Gateway");
	});

	it("returns NOT_AVAILABLE for empty string", () => {
		expect(capitalize("")).toBe("NOT_AVAILABLE");
	});

	it("capitalizes single character", () => {
		expect(capitalize("a")).toBe("A");
	});

	it("handles strings with underscores", () => {
		expect(capitalize("battery_low")).toBe("Battery_low");
	});

	it("handles strings with spaces", () => {
		expect(capitalize("network address")).toBe("Network address");
	});

	it("handles all-uppercase string", () => {
		expect(capitalize("ALARM")).toBe("ALARM");
	});

	it("handles strings starting with numbers", () => {
		expect(capitalize("123test")).toBe("123test");
	});
});
