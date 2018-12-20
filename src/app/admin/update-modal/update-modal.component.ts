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
		console.log(startDate);
		const event = {
			start: {
				dateTime: startDate,
			},
			end: {
				dateTime: endDate,
			},
			colorId: '2',
		};
		this.service.updateEvent(event, this.eventId);
		this.closeModal();
	}

}
