import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"temperature", "temperature">> = {
	path: "temperature.states.temperature.value",
	format: "number",
	type: "sensor",
	unit: "°C",
	name: "temperature",
	deviceClass: "temperature",
	stateClass: "measurement",
};

export { sensor };
