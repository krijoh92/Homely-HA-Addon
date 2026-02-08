import { describe, expect, it } from "bun:test";
import {
	type AlarmState,
	type HomeAssistantAlarmState,
	HomelyAlarmStateToHomeAssistant,
} from "./alarm-state";

describe("HomelyAlarmStateToHomeAssistant", () => {
	it("maps DISARMED to disarmed", () => {
		expect(HomelyAlarmStateToHomeAssistant.DISARMED).toBe("disarmed");
	});

	it("maps ARMED_AWAY to armed_away", () => {
		expect(HomelyAlarmStateToHomeAssistant.ARMED_AWAY).toBe("armed_away");
	});

	it("maps ARMED_NIGHT to armed_night", () => {
		expect(HomelyAlarmStateToHomeAssistant.ARMED_NIGHT).toBe("armed_night");
	});

	it("maps ARMED_PARTLY to armed_home", () => {
		expect(HomelyAlarmStateToHomeAssistant.ARMED_PARTLY).toBe("armed_home");
	});

	it("maps BREACHED to triggered", () => {
		expect(HomelyAlarmStateToHomeAssistant.BREACHED).toBe("triggered");
	});

	it("maps all pending states to pending", () => {
		const pendingStates: AlarmState[] = [
			"ALARM_PENDING",
			"ALARM_STAY_PENDING",
			"ARMED_NIGHT_PENDING",
			"ARMED_AWAY_PENDING",
		];
		for (const state of pendingStates) {
			expect(HomelyAlarmStateToHomeAssistant[state]).toBe("pending");
		}
	});

	it("covers all Homely alarm states", () => {
		const allStates: AlarmState[] = [
			"DISARMED",
			"ARMED_AWAY",
			"ARMED_NIGHT",
			"ARMED_PARTLY",
			"BREACHED",
			"ALARM_PENDING",
			"ALARM_STAY_PENDING",
			"ARMED_NIGHT_PENDING",
			"ARMED_AWAY_PENDING",
		];
		for (const state of allStates) {
			expect(HomelyAlarmStateToHomeAssistant[state]).toBeDefined();
		}
		expect(Object.keys(HomelyAlarmStateToHomeAssistant)).toHaveLength(allStates.length);
	});

	it("only maps to valid Home Assistant alarm states", () => {
		const validHAStates: HomeAssistantAlarmState[] = [
			"disarmed",
			"armed_home",
			"armed_away",
			"armed_night",
			"armed_vacation",
			"armed_custom_bypass",
			"pending",
			"triggered",
			"arming",
			"disarming",
		];
		for (const haState of Object.values(HomelyAlarmStateToHomeAssistant)) {
			expect(validHAStates).toContain(haState);
		}
	});
});
