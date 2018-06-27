export class SprintType {
    
    name: string;
    duration: number;
    durationReadable: string;

    constructor(name: string, duration: number) {
        this.name = name;
        this.initializeDuration(duration);
        this.initializeDurationReadable();
    }

    private initializeDuration(duration: number) {
        if (duration < 1000) {
            this.duration = 1;
        } else if (duration === 0) {
            this.duration = 1;
        } else {
            this.duration = duration;
        }
    }

    private initializeDurationReadable() {
        if (this.duration/1000 >= 60) {
            this.durationReadable = `${this.duration/1000/60}min`;
        } else {
            this.durationReadable = `${this.duration/1000}s`;
        }
    }
}