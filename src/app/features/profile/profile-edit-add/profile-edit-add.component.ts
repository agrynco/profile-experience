import { Component } from "@angular/core";
import { IProfile } from "../../../models/profile.model";
import { ProfileService } from "../../../services/profile.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-profile-edit-add",
    templateUrl: "profile-edit-add.component.html"
})
export class ProfileEditAddComponent {
    profile: IProfile = {
        organizationName: "",        
        dateFrom: new Date(),
        dateTo: new Date(),
        summary: "",
    };

    constructor(private _profileService: ProfileService, private _router: Router) {
    }

    addNewRecord(): void {
        this._profileService.addNewRecord(this.profile);
        this._router.navigate(["/profile"]);
    }

    cancel(): void {
        confirm("Are you sure you want to cancel?") && this._router.navigate(["/profile"]);
    }
}