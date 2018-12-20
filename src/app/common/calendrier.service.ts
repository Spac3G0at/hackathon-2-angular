import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CalendrierService {

	constructor(private _http: HttpClient) {
	}

	/**
	 * Get all events
	 */
	getDates() {
		return this._http.get('/api/events');
	}

	/**
	 * Create a new event
	 * @param event event to insert
	 */
	insertEvent(event) {
		this._http.post('/api/events', event, {responseType: 'text'}).subscribe(x => {
			console.log(x);
		});
	}

	/**
	 * Update an event
	 * @param event updated event
	 * @param eventId event id
	 */
	updateEvent(event, eventId) {
		this._http.put('/api/events/' + eventId, event, {responseType: 'text'}).subscribe(x => {
			console.log(x);
		});
	}

	/**
	 * Delete an event
	 * @param eventId event id
	 */
	deleteEvent(eventId) {
		this._http.delete('/api/events/' + eventId, {responseType: 'text'}).subscribe(x => {
			console.log(x);
		});
	}

}
