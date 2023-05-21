import { StartingSystemEnum } from "./enums";

export class CheckEngineStatusDto {
    engine_name: string | undefined;
    starting_system: string | undefined;
}

export interface ValidationMotor {
    starting_system: StartingSystemEnum;
}