import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendrierService } from '../../common/calendrier.service';

@Component({
	selector: 'app-update-modal',
	templateUrl: './update-modal.component.html',
	styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {

	startTime = { hour: 0, minute: 0 };
	endTime = { hour: 0, minute: 0 };
	day: string;
	data: any;
	eventId: any;
	myForm = this.fb.group({
		start: [this.startTime, Validators.required],
		end: [this.endTime, Validators.required],
	});

	constructor(private activeModal: NgbActiveModal, private fb: FormBuilder, private service: CalendrierService) { }

	ngOnInit() {
		const event = this.data.event;
		this.startTime.hour = event.start.getHours();
		this.startTime.minute = event.start.getMinutes();
		this.endTime.hour = event.end.getHours();
		this.endTime.minute = event.end.getMinutes();
		this.eventId = event.id;
		this.day = event.start.toString().split(' ').slice(0, 4).join(' ');
	}

	/**
	 * Close modal
	 */
	closeModal() {
		this.activeModal.close();
	}

	/**
	 * Delete event
	 * @param eventId event id
	 */
	deleteEvent(eventId) {
		this.service.deleteEvent(eventId);
		this.closeModal();
	}

	/**
	 * Update event
	 */
	onSubmit() {

		const data = this.myForm.value;

		const startDate = new Date(`${this.day} ${data.start.hour}:${data.start.minute}`).toISOString();
		const endDate = new Date(`${this.day} ${data.end.hour}:${data.end.minute}`).toISOString();
		const event = {
			start: {
				dateTime: startDate,
			},
			end: {
				dateTime: endDate,
			},
			colorId: this.data.event.colorId,
			summary: this.data.event.summary,
			attendees: this.data.event.attendees,
			description: this.data.event.description
		};
		this.service.updateEvent(event, this.eventId);
		this.closeModal();
	}

	confirm(eventId, eventData) {
		const event = {
			start: {
				dateTime: eventData.start.toISOString(),
			},
			end: {
				dateTime: eventData.end.toISOString(),
			},
			colorId: '1',
			summary: eventData.summary,
			attendees: eventData.attendees,
			description: eventData.description
		};
		this.service.confirm(eventId, event);
		this.closeModal();
	}


}
