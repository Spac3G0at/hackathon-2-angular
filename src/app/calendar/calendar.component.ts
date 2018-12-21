import { Component, OnInit } from '@angular/core';
import {
	CalendarEvent,
	CalendarView,
	DAYS_OF_WEEK
} from 'angular-calendar';
import { CalendrierService } from '../common/calendrier.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';
import { map, filter, mergeMap } from 'rxjs/operators';
import { colors } from '../common/colors';

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

	events: any;

	view: CalendarView = CalendarView.Month;
	activeDayIsOpen = true;
	CalendarView = CalendarView;

	viewDate: Date = new Date();

	locale = 'fr';

	weekStartsOn: number = DAYS_OF_WEEK.MONDAY;

	weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

	constructor(private service: CalendrierService, private modalService: NgbModal) {

	}

	ngOnInit() {

		this.events = this.service.events.pipe(
			map((x: any) => {
				return x.filter(evt => {
					return evt.colorId === '2';
				}
				);
			}),
			map((x: any) => {
				return x.map(evt => {
					evt.start = new Date(evt.start.dateTime);
					evt.end = new Date(evt.end.dateTime);
					evt.title = evt.summary;
					evt.color = colors.green;
					return evt;
				});
			}
			),
		);

		this.service.getDates();


	}


	/**
	 * Open the appointment modal
	 * @param data event data
	 */
	openModal(data) {
		const modalRef = this.modalService.open(AppointmentModalComponent);
		modalRef.componentInstance.data = data;
		modalRef.result.then((result) => {
			// console.log(result);
		}).catch((error) => {
			// console.log(error);
		});
	}

	/**
	 * Change view to day
	 * @param event date
	 */
	changeView(event) {
		this.view = CalendarView.Day;
		this.viewDate = event;
	}

	/**
	 * Open the appointment modal
	 * @param event data
	 */
	takeAppointment(event) {
		this.openModal(event);
	}


	eventClicked({ event }: { event: CalendarEvent }): void {
		console.log('Event clicked', event);
	}

}
