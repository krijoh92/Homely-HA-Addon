import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"battery", "low">> = {
	path: "battery.states.low.value",
	format: "boolean",
	type: "binary_sensor",
	name: "battery_low",
	deviceClass: "battery",
	entityCategory: "diagnostic",
};

export { sensor };
