import { Injectable, Injector } from '@angular/core';
import { IDashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(injector: Injector) {}

  data: IDashboard = {
    name: 'Anatolii Hrynchuk',
    totalExperience: 20,
    summary:
        'I have over 17 years of experience in software development. I started with .NET and SQL Server, and over time became a full-stack developer, working extensively with .NET Core, Angular, relational databases, and Docker. I also have experience with Azure, DevOps pipelines, and various home automation and embedded projects.',
  };
}
