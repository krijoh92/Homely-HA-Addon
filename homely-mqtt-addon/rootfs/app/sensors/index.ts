import alarm from "./alarm";
import battery from "./battery";
import diagnostics from "./diagnostics";
import metering from "./metering";
import temperature from "./temperature";

export const sensors = [...alarm, ...battery, ...diagnostics, ...temperature, ...metering];
