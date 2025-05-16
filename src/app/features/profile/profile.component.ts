import { Component, OnInit } from '@angular/core';
import { IProfile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { Router } from "@angular/router";
import { debounceTime, map, Observable, startWith, Subject } from "rxjs";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    data: IProfile[];
    filteredData$!: Observable<IProfile[]>;
    searchTerm: string = 'qwerty';
    public _searchTerm$ = new Subject<string>();

    constructor(private _profileService: ProfileService, private _router: Router) {
        this.data = this._profileService.data;
    }

    ngOnInit(): void {
        this.filteredData$ =  this._searchTerm$.pipe(
            startWith(''),
            debounceTime(300),
            map(term =>
                this._profileService.data.filter(item =>
                    item.organizationName.toLowerCase().includes(term.toLowerCase()) ||
                    item.summary.toLowerCase().includes(term.toLowerCase())
                )
            )
        );
    }


    onSearchTermChanged() {
        this.data = this._profileService.data.filter((item) => {
            return (
                item.organizationName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                item.summary.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        });
    }

    getExperience(item: IProfile): string {
        return this._profileService.getExperience(item.dateFrom, item.dateTo);
    }

    addNewRecord() {
        this._router.navigate(['/profile/edit']);
    }
}
