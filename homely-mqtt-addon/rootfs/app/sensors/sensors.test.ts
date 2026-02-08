import { describe, expect, it } from "bun:test";
import { sensors } from "./index";

describe("sensors", () => {
	it("has the expected number of sensors", () => {
		// 4 alarm + 3 battery + 2 diagnostics + 3 metering + 1 temperature = 13
		expect(sensors.length).toBe(13);
	});

	it("all sensors have a path", () => {
		for (const sensor of sensors) {
			expect(sensor.path).toBeDefined();
			expect(typeof sensor.path).toBe("string");
			expect((sensor.path as string).length).toBeGreaterThan(0);
		}
	});

	it("all sensors have a valid format", () => {
		const validFormats = ["number", "string", "boolean"];
		for (const sensor of sensors) {
			expect(validFormats).toContain(sensor.format);
		}
	});

	it("all sensors have a valid type", () => {
		const validTypes = ["sensor", "binary_sensor"];
		for (const sensor of sensors) {
			expect(validTypes).toContain(sensor.type);
		}
	});

	it("all sensors have either a name or getName function", () => {
		for (const sensor of sensors) {
			const hasName = "name" in sensor && typeof sensor.name === "string";
			const hasGetName = "getName" in sensor && typeof sensor.getName === "function";
			expect(hasName || hasGetName).toBe(true);
		}
	});

	it("alarm sensor paths start with 'alarm.states.'", () => {
		const alarmSensors = sensors.filter((s) => (s.path as string).startsWith("alarm.states."));
		expect(alarmSensors.length).toBe(4);
	});

	it("battery sensor paths start with 'battery.states.'", () => {
		const batterySensors = sensors.filter((s) => (s.path as string).startsWith("battery.states."));
		expect(batterySensors.length).toBe(3);
	});

	it("temperature sensor has correct unit", () => {
		const tempSensor = sensors.find(
			(s) => (s.path as string) === "temperature.states.temperature.value",
		);
		expect(tempSensor).toBeDefined();
		expect(tempSensor?.unit).toBe("\u00B0C");
		expect(tempSensor?.format).toBe("number");
	});

	it("metering sensors have kWh unit", () => {
		const meteringSensors = sensors.filter((s) =>
			(s.path as string).startsWith("metering.states."),
		);
		for (const sensor of meteringSensors) {
			expect(sensor.unit).toBe("kWh");
		}
	});

	it("diagnostic sensors have entityCategory set to diagnostic", () => {
		const diagSensors = sensors.filter((s) => (s.path as string).startsWith("diagnostic.states."));
		for (const sensor of diagSensors) {
			expect("entityCategory" in sensor && sensor.entityCategory).toBe("diagnostic");
		}
	});

	it("fire sensor has smoke device class", () => {
		const fireSensor = sensors.find((s) => (s.path as string) === "alarm.states.fire.value");
		expect(fireSensor).toBeDefined();
		if (fireSensor && "deviceClass" in fireSensor) {
			expect(fireSensor.deviceClass).toBe("smoke");
		}
	});

	it("alarm sensor getName returns motion or contact based on model", () => {
		const alarmSensor = sensors.find((s) => (s.path as string) === "alarm.states.alarm.value");
		expect(alarmSensor).toBeDefined();
		if (alarmSensor && "getName" in alarmSensor) {
			const motionDevice = { modelName: "Motion Sensor" } as Parameters<
				typeof alarmSensor.getName
			>[0];
			const contactDevice = { modelName: "Door Sensor" } as Parameters<
				typeof alarmSensor.getName
			>[0];
			expect(alarmSensor.getName(motionDevice)).toBe("motion");
			expect(alarmSensor.getName(contactDevice)).toBe("contact");
		}
	});

	it("alarm sensor getDeviceClass returns motion or door based on model", () => {
		const alarmSensor = sensors.find((s) => (s.path as string) === "alarm.states.alarm.value");
		expect(alarmSensor).toBeDefined();
		if (alarmSensor && "getDeviceClass" in alarmSensor && alarmSensor.getDeviceClass) {
			const motionDevice = { modelName: "Motion Sensor" } as Parameters<
				typeof alarmSensor.getDeviceClass
			>[0];
			const contactDevice = { modelName: "Door Sensor" } as Parameters<
				typeof alarmSensor.getDeviceClass
			>[0];
			expect(alarmSensor.getDeviceClass(motionDevice)).toBe("motion");
			expect(alarmSensor.getDeviceClass(contactDevice)).toBe("door");
		}
	});
});
