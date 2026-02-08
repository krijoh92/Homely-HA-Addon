import { describe, expect, it } from "bun:test";
import { getValueByPath } from "./get-value-by-path";

describe("getValueByPath", () => {
	it("returns the value at a simple path", () => {
		const obj = { a: 1 };
		expect(getValueByPath(obj, "a")).toBe(1);
	});

	it("returns the value at a nested path", () => {
		const obj = { a: { b: { c: 42 } } };
		expect(getValueByPath(obj, "a.b.c")).toBe(42);
	});

	it("returns undefined for a missing path", () => {
		const obj = { a: { b: 1 } };
		expect(getValueByPath(obj, "a.c")).toBeUndefined();
	});

	it("returns undefined for a deeply missing path", () => {
		const obj = { a: { b: 1 } };
		expect(getValueByPath(obj, "x.y.z")).toBeUndefined();
	});

	it("returns undefined for an empty path", () => {
		const obj = { a: 1 };
		// empty string splits to [""], which is treated as key "" - not found
		expect(getValueByPath(obj, "")).toBeUndefined();
	});

	it("handles boolean values", () => {
		const obj = { alarm: { states: { fire: { value: true } } } };
		expect(getValueByPath(obj, "alarm.states.fire.value")).toBe(true);
	});

	it("handles string values", () => {
		const obj = { diagnostic: { states: { address: { value: "192.168.1.1" } } } };
		expect(getValueByPath(obj, "diagnostic.states.address.value")).toBe("192.168.1.1");
	});

	it("handles numeric values", () => {
		const obj = { temperature: { states: { temperature: { value: 22.5 } } } };
		expect(getValueByPath(obj, "temperature.states.temperature.value")).toBe(22.5);
	});

	it("handles null values in path", () => {
		const obj = { a: { b: null } };
		expect(getValueByPath(obj, "a.b")).toBeNull();
	});

	it("returns the intermediate object when path stops early", () => {
		const obj = { a: { b: { c: 1 } } };
		expect(getValueByPath(obj, "a.b")).toEqual({ c: 1 });
	});
});
