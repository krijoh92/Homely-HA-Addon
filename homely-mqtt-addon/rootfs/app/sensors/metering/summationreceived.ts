import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"metering", "summationreceived">> = {
	path: "metering.states.summationreceived.value",
	format: "number",
	type: "sensor",
	unit: "kWh",
	name: "production",
	deviceClass: "energy",
	stateClass: "total",
};

export { sensor };
