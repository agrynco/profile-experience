import { Injectable } from '@angular/core';
import { IProfile } from '../models/profile.model';
import { DateTime } from 'luxon';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor() {
    }

    data: IProfile[] = [
        {
            organizationName: 'Org 1',
            dateFrom: new Date(2007, 7, 1),
            dateTo: new Date(2009, 8, 31),
            summary:
                'This is my first job, and I worked on hospital management system. This was a windows desktop application in VB6 and MS SQL',
        },
        {
            organizationName: 'Org 2',
            dateFrom: new Date(2009, 9, 1),
            dateTo: new Date(2010, 10, 31),
            summary:
                'This is my second job, and I worked on hospital management system. This was a windows desktop application in VB6 and MS SQL'
        },
        {
            organizationName: 'Org 3',
            dateFrom: new Date(2010, 11, 1),
            dateTo: new Date(2012, 12, 31),
            summary:
                'This is my third job, and I worked on hospital management system. This was a windows desktop application in VB6 and MS SQL'
        }
    ];

    getExperience(date1: Date | string, date2: Date | string): string {
        const start = typeof date1 === 'string' ? DateTime.fromISO(date1) : DateTime.fromJSDate(date1);
        const end   = typeof date2 === 'string' ? DateTime.fromISO(date2) : DateTime.fromJSDate(date2);

        const diff = end.diff(start, ['years', 'months']).toObject();

        const totalYears = (diff.years ?? 0) + (diff.months ?? 0) / 12;

        return `${totalYears.toFixed(1)} Yrs`;
    }


    addNewRecord(newRecord: IProfile) {
        this.data.push(newRecord);
    }
}
