import { Status } from "../../models/Status";

export class StatusData {
    
    statuses: Status[];

    constructor() {
        this.statuses = [
            new Status("Completed"),
            new Status("OnGoing"),
            new Status("Aborted"),
            new Status("Finished"),
        ];
    }
}