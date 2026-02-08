import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"alarm", "alarm">> = {
	path: "alarm.states.alarm.value",
	format: "boolean",
	deviceSuffix: "alarm",
	type: "binary_sensor",
	getName: (dev) => (dev.modelName.toLowerCase().includes("motion") ? "motion" : "contact"),
	getDeviceClass: (dev) => (dev.modelName.toLowerCase().includes("motion") ? "motion" : "door"),
};

export { sensor };
