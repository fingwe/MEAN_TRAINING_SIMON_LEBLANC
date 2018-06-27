import { SprintTemplate } from './SprintTemplate';
import { Status } from './Status';

export class PastSprint implements SprintTemplate {
    
    name: string;    
    duration: number;
    status: Status;

    progress: number;
    description: string;
    notify: boolean;
    user: number;
    createdAt: Date;
    startedAt: Date;
    finishedAt: Date;

}