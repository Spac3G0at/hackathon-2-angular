import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm = this.fb.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required]
	});

	constructor(private fb: FormBuilder, private service: AuthService, private router: Router) { }

	ngOnInit() {
	}

	connect() {
		const data = this.loginForm.value;
		if (this.service.login(data.email, data.password)) {
			this.router.navigate(['/admin/calendar']);
		} else {
			Swal({
				type: 'error',
				title: 'Adresse mail ou mot de passe incorrect'
			});
			this.loginForm.reset();
		}
	}

}
