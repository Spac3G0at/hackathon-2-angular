import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CalendrierService {

	private _events: BehaviorSubject<any[]>;
	private dataStore: { events: any};

	constructor(private _http: HttpClient) {
		this.dataStore = {
			events: []
		};
		this._events = new BehaviorSubject<any>([]);
	}

	get events() {
		return this._events.asObservable();
	}

	/**
	 * Get all events
	 */
	getDates() {
		this._http.get('/api/events', { responseType: 'json' }).subscribe(data => {
			this.dataStore.events = data;
			this._events.next(Object.assign({}, this.dataStore).events);
		}, (err) => console.log('Cound not load events' + err));
	}

	/**
	 * Create a new event
	 * @param event event to insert
	 */
	insertEvent(event) {
		this._http.post('/api/events', event, { responseType: 'text' }).subscribe(x => {
			this.getDates();
		});
	}

	/**
	 * Update an event
	 * @param event updated event
	 * @param eventId event id
	 */
	updateEvent(event, eventId) {
		this._http.put('/api/events/' + eventId, event, { responseType: 'text' }).subscribe(x => {
			this.getDates();
		});
	}

	/**
	 * Delete an event
	 * @param eventId event id
	 */
	deleteEvent(eventId) {
		this._http.delete('/api/events/' + eventId, { responseType: 'text' }).subscribe(x => {
			this.getDates();
		});
	}

	/**
	 * Confirm an event
	 * @param eventId event id
	 * @param event event data
	 */
	confirm(eventId, event) {
		this._http.put('/api/events/confirm/' + eventId, event, { responseType: 'text' }).subscribe(x => {
			this.getDates();
		});
	}

}
