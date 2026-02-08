import type { InferCreationAttributes } from "sequelize";
import type { HomelyFeature } from "../db";
import type { Device } from "../models/home";
import { getValueByPath } from "../utils/get-value-by-path";
import { logger } from "../utils/logger";
import { mqttClient } from "../utils/mqtt";

/**
 * Publishes the state of all discovered devices to MQTT
 * @param discoveredDevices
 * @param devices
 */
export const publishEntityChanges = async (
	discoveredDevices: Array<InferCreationAttributes<HomelyFeature>>,
	devices: Array<Device>,
) => {
	for (const feature of discoveredDevices) {
		const device = devices.find((d) => d.id === feature.device_id);
		if (!device) {
			logger.fatal(`Missing device ${feature.device_id}`);
			process.exit();
		}
		const value = getValueByPath(device?.features, feature.path) as unknown as
			| string
			| number
			| boolean;
		logger.info(`Publishing state for ${feature.name}`);
		publish(feature.state_topic, value);
	}
};

/**
 * Publishes a value to MQTT. Converts boolean values to ON/OFF to work out of the box with Home Assistant
 * @param stateTopic
 * @param value
 */
export const publish = (stateTopic: string, value: string | boolean | number) => {
	if (value !== undefined && value !== null) {
		const payload = typeof value === "boolean" ? (value ? "ON" : "OFF") : String(value);
		mqttClient.publish(stateTopic, payload, {
			qos: 1,
			retain: true,
		});
	}
};
