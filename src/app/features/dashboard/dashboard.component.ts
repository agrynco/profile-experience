import { Component, Injector, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { IDashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: IDashboard;
  constructor(
    injector: Injector,
    private _dashboardService: DashboardService
  ) {
    this.data = this._dashboardService.data;
  }
  ngOnInit() {
  }
}
