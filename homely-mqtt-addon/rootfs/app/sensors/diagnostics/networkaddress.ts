import type { Feature } from "../../models/feature";
import type { Sensor } from "../model";

const sensor: Sensor<Feature<"diagnostic", "networklinkaddress">> = {
	path: "diagnostic.states.networklinkaddress.value",
	format: "string",
	type: "sensor",
	name: "networklink_address",
	entityCategory: "diagnostic",
};

export { sensor };
