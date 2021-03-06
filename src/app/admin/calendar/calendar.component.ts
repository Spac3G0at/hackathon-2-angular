import { Component, OnInit } from '@angular/core';
import { CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { CalendrierService } from '../../common/calendrier.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
import { colors } from '../../common/colors';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-admin-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss']
})
export class AdminCalendarComponent implements OnInit {

	events: any;

	// exclude weekends
	excludeDays: number[] = [0, 6];

	weekStartsOn = DAYS_OF_WEEK.SUNDAY;

	view: CalendarView = CalendarView.Month;
	activeDayIsOpen = true;
	CalendarView = CalendarView;

	viewDate: Date = new Date();

	locale = 'fr';

	constructor(private service: CalendrierService, private modalService: NgbModal) {

	}

	ngOnInit() {

		this.events = this.service.events.pipe(
			map((x: any) => {

				return x.map(evt => {
					evt.start = new Date(evt.start.dateTime);
					evt.end = new Date(evt.end.dateTime);
					evt.title = evt.summary;
					if (evt.colorId === '2') {
						evt.color = colors.green;
					} else if (evt.colorId === '5') {
						evt.color = colors.yellow;
					}

					return evt;
				});
			}
			)
		);

		this.service.getDates();

	}

	/**
	 * Open modal for creating new events
	 * @param data date data
	 */
	openCreateModal(data) {
		const modalRef = this.modalService.open(ModalComponent);
		modalRef.componentInstance.data = data;
		modalRef.result.then((result) => {

		}).catch((error) => {
			console.log(error);
		});
	}

	/**
	 * Edit event
	 * @param data event data
	 */
	openEditModal(data) {
		const modalRef = this.modalService.open(UpdateModalComponent);
		modalRef.componentInstance.data = data;
		modalRef.result.then((result) => {

		}).catch((error) => {
			console.log(error);
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
	 * Open the create event modal
	 * @param event data
	 */
	createEvent(event) {
		this.openCreateModal(event);
	}

	/**
	 * Open the update modal
	 * @param event data
	 */
	edit(event) {
		this.openEditModal(event);
	}

}
