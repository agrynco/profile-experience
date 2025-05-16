import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TestListComponent } from './features/tests/test-list/test-list.component';
import { TestDetailComponent } from './features/tests/test-detail/test-detail.component';
import { TestTakerComponent } from './features/test-taker/test-taker.component';
import {
    MultipleChoiceQuestionComponent
} from './features/test-taker/question-types/multiple-choice/multiple-choice.component';
import { CodingQuestionComponent } from './features/test-taker/question-types/coding/coding.component';
import { TimerComponent } from './shared/components/timer/timer.component';
import { ProfileComponent } from './features/profile/profile.component';
import { ResultsComponent } from './features/results/results.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { TestCreatorComponent } from './features/admin/test-creator/test-creator.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { ProfileEditAddComponent } from "./features/profile/profile-edit-add/profile-edit-add.component";

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {path: 'tests', component: TestListComponent, canActivate: [AuthGuard]},
    {
        path: 'tests/:id',
        component: TestDetailComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'take-test/:id',
        component: TestTakerComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'profile',
        canActivate: [AuthGuard],
        children: [
            {path: '', component: ProfileComponent},                    // /profile → список
            {path: 'edit', component: ProfileEditAddComponent},        // /profile/edit → повністю окрема сторінка
        ]
    },

    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {
        path: 'admin/create-test',
        component: TestCreatorComponent,
        canActivate: [AuthGuard, AdminGuard],
    },
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        TestListComponent,
        TestDetailComponent,
        TestTakerComponent,
        MultipleChoiceQuestionComponent,
        CodingQuestionComponent,
        TimerComponent,
        ProfileComponent,
        ProfileEditAddComponent,
        ResultsComponent,
        AdminDashboardComponent,
        TestCreatorComponent,
        LoadingComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
    ],
    providers: [AuthGuard, AdminGuard],
    bootstrap: [AppComponent],
})
export class AppModule {
}