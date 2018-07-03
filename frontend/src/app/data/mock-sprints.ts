import { PastSprint } from '../../models/PastSprint';
import { Status } from '../../models/Status';

export const SPRINTS: PastSprint[] = [
    {   
        name: 'sprint1',    
        duration: 5000,
        status: new Status('Completed'),
        progress: 5000,
        description: 'fast',
        notify: false,
        user: 555,
        createdAt: new Date(),
        startedAt: new Date(),
        finishedAt: new Date()
    },
    {   
        name: 'sprint2',    
        duration: 5000,
        status: new Status('Completed'),
        progress: 5000,
        description: 'fast',
        notify: false,
        user: 555,
        createdAt: new Date(),
        startedAt: new Date(),
        finishedAt: new Date()
    },
    {   
        name: 'sprint3',    
        duration: 5000,
        status: new Status('Completed'),
        progress: 5000,
        description: 'fast',
        notify: false,
        user: 555,
        createdAt: new Date(),
        startedAt: new Date(),
        finishedAt: new Date()
    }
];