import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"battery", "defect">> = {
	path: "battery.states.defect.value",
	format: "boolean",
	type: "binary_sensor",
	name: "battery_defect",
	entityCategory: "diagnostic",
	icon: "mdi:battery-alert",
};

export { sensor };
