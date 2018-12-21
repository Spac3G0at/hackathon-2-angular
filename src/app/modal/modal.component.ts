import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendrierService } from '../common/calendrier.service';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

	startTime = { hour: 0, minute: 0 };
	endTime = { hour: 0, minute: 0 };
	day: string;
	data: any;

	myForm = this.fb.group({
		start: [this.startTime, Validators.required],
		end: [this.endTime, Validators.required],
	});

	constructor(private activeModal: NgbActiveModal, private fb: FormBuilder, private service: CalendrierService) { }

	ngOnInit() {
		const date = this.data.date;
		this.startTime.hour = date.getHours();
		this.startTime.minute = date.getMinutes();
		this.endTime.hour = this.startTime.hour + 1;
		this.endTime.minute = this.startTime.minute;
		this.day = this.data.date.toString().split(' ').slice(0, 4).join(' ');
	}

	/**
	 * Close modal
	 */
	closeModal() {
		this.activeModal.close();
	}

	/**
	 * Create a new event
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
			colorId: '2',
		};
		this.service.insertEvent(event);
		this.closeModal();
	}

}
