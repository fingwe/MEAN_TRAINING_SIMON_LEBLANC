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

    /**
     * Find a sprint data by time
     */
    findSprintByTime(time: number) {
        for (let i = 0; i< this.sprintTypes.length; i++) {
            if (time === this.sprintTypes[i].duration) {
                if (this.sprintTypes[i].duration < 60000 ) {
                    return `${this.sprintTypes[i].name} (${Math.floor(this.sprintTypes[i].duration/1000)}s)`
                } else {
                    return `${this.sprintTypes[i].name} (${Math.floor(this.sprintTypes[i].duration/60000)}min)`
                }
                
            }
        }
    }
}