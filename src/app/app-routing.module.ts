import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCalendarComponent } from './admin/calendar/calendar.component';
import { CalendarComponent } from './calendar/calendar.component';


const routes: Routes = [
	{ path: '', component: CalendarComponent },
	{ path: 'admin/calendar', component: AdminCalendarComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
