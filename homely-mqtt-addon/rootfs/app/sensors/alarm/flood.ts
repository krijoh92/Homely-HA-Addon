import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"alarm", "flood">> = {
	path: "alarm.states.flood.value",
	format: "boolean",
	deviceSuffix: "alarm",
	type: "binary_sensor",
	name: "Flood",
	deviceClass: "moisture",
};

export { sensor };
