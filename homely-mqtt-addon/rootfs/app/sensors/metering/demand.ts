import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"metering", "demand">> = {
	path: "metering.states.demand.value",
	format: "number",
	type: "sensor",
	unit: "kWh",
	name: "demand",
	deviceClass: "energy",
	stateClass: "total",
};

export { sensor };
