import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  error?: string;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {
      if (this.accountService.userValue) {
        this.router.navigate(['/']);
    }
     }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  get f() { return this.form.controls; }


  onSubmit() {
    this.submitted = true;

    // reset alert on submit
    this.error = '';

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.login(this.f.username.value, this.f.password.value)
        .subscribe({
            next: (user) => {
                this.accountService.setToken(user.token);
                this.router.navigateByUrl('/dashboard');
            },
            error: error => {
                this.error = JSON.stringify(error);
                window.alert(this.error)
                this.loading = false;
            }
        });
}
}