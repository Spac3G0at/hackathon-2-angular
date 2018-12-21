import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendrierService } from '../common/calendrier.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-appointment-modal',
	templateUrl: './appointment-modal.component.html',
	styleUrls: ['./appointment-modal.component.scss']
})
export class AppointmentModalComponent implements OnInit {

	day: string;
	data: any;
	eventId: any;
	startTime = { hour: 0, minute: 0 };
	endTime = { hour: 0, minute: 0 };

	myForm = this.fb.group({
		lastName: ['', Validators.required],
		firstName: ['', Validators.required],
		company: [''],
		mail: ['', [Validators.email, Validators.required]],
		subject: ['', Validators.required],
	});

	constructor(private activeModal: NgbActiveModal, private fb: FormBuilder, private service: CalendrierService) { }

	ngOnInit() {
		this.startTime.hour = this.data.event.start.getHours();
		this.startTime.minute = this.data.event.start.getMinutes();
		this.endTime.hour = this.data.event.end.getHours();
		this.endTime.minute = this.data.event.end.getMinutes();
		this.eventId = this.data.event.id;
		this.day = this.data.event.start.toString().split(' ').slice(0, 4).join(' ');
	}

	/**
	 * Close modal
	 */
	closeModal() {
		this.activeModal.close();
	}

	/**
	 * Take appointment
	 */
	onSubmit() {
		const data = this.myForm.value;
		let desc = '';
		if (data.company) {
			desc = data.company + ' - ' + data.subject;
		} else {
			desc = data.subject;
		}
		const event = {
			start: {
				dateTime: this.data.event.start.toISOString(),
			},
			end: {
				dateTime: this.data.event.end.toISOString(),
			},
			summary: `RDV avec ${data.firstName} ${data.lastName}`,
			colorId: '5',
			attendees: [{
				email: data.mail
			}],
			description: desc
		};
		this.service.updateEvent(event, this.eventId);

		this.closeModal();
		Swal({
			type: 'success',
			title: 'Votre demande a bien été enregistrée !'
		});
	}

}
