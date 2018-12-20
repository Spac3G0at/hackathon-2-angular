import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DemoUtilsModule } from './demo-utils/module';
import { ModalComponent } from './modal/modal.component';
import { LOCALE_ID } from '@angular/core';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminCalendarComponent } from './admin/calendar/calendar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UpdateModalComponent } from './admin/update-modal/update-modal.component';

registerLocaleData(localeFr);

@NgModule({
	declarations: [
		AppComponent,
		ModalComponent,
		AppointmentModalComponent,
		LoginComponent,
		AdminCalendarComponent,
		CalendarComponent,
		UpdateModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
		NgbModule,
		BrowserAnimationsModule,
		DemoUtilsModule

	],
	providers: [{provide: LOCALE_ID, useValue: 'fr' }],
	bootstrap: [AppComponent],
	entryComponents: [
		ModalComponent,
		AppointmentModalComponent,
		UpdateModalComponent
	]
})
export class AppModule { }
