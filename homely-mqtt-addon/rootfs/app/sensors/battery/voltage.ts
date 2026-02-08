import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"battery", "voltage">> = {
	path: "battery.states.voltage.value",
	format: "number",
	type: "sensor",
	name: "battery_voltage",
	unit: "V",
	deviceClass: "voltage",
	entityCategory: "diagnostic",
};

export { sensor };
