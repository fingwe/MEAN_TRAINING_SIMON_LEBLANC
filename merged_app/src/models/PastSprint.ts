import { SprintTemplate } from './SprintTemplate';
import { Status } from './Status';

export class PastSprint implements SprintTemplate {
    
    name: string;    
    duration: number;
    status: string;

    progress: number;
    description: string;
    notify: boolean;
    user: string;
    createdAt: Date;
    startedAt: Date;
    finishedAt: Date;

}