import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"metering", "summationdelivered">> = {
	path: "metering.states.summationdelivered.value",
	format: "number",
	type: "sensor",
	unit: "kWh",
	name: "consumption",
	deviceClass: "energy",
	stateClass: "total",
};

export { sensor };
