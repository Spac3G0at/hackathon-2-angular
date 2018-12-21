import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCalendarComponent } from './admin/calendar/calendar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuard } from './common/auth.guard';


const routes: Routes = [
	{ path: '', component: CalendarComponent },
	{ path: 'admin/calendar', canActivate: [AuthGuard], component: AdminCalendarComponent},
	{ path: 'admin/login', component: LoginComponent },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
