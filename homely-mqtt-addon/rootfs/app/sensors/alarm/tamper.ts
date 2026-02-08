import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"alarm", "tamper">> = {
	path: "alarm.states.tamper.value",
	format: "boolean",
	type: "binary_sensor",
	name: "tamper",
	deviceClass: "tamper",
	deviceSuffix: "tamper",
};

export { sensor };
