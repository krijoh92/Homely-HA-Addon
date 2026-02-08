import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"alarm", "fire">> = {
	path: "alarm.states.fire.value",
	format: "boolean",
	type: "binary_sensor",
	deviceSuffix: "alarm",
	name: "fire",
	deviceClass: "smoke",
};

export { sensor };
