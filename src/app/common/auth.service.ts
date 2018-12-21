import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	isLogged: boolean;

	constructor() { }

	login(email, password) {
		if (email === 'hackathon3wildtours@gmail.com' && password === 'admin') {
			this.isLogged = true;
			return true;
		} else {
			return false;
		}
	}

	logout() {
		this.isLogged = false;
	}
}
