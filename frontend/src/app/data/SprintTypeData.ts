import { SprintType } from '../../models/SprintType';

export class SprintTypeData{
    
    private sprintTypes: SprintType[];

    constructor() {
        this.sprintTypes = [
            new SprintType("Instant", 5000),
            new SprintType("Very short", 300000),
            new SprintType("Short", 900000),
            new SprintType("Pomodoro" , 1500000),
            new SprintType("Long" , 2700000),
            new SprintType("Very long", 3600000)
        ];
    }

    getData(): SprintType[] {
        return this.sprintTypes;
    }


}