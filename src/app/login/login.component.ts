import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isUserValid: boolean = false;
  constructor(private loginAuth: AuthService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = new FormGroup({
    Email: new FormControl("", [Validators.required, Validators.email]),
    Password: new FormControl("", [Validators.required, Validators.minLength(5)])
  });

  loginSubmitted() {
    this.loginAuth.loginUser([this.loginForm.value.Email,
    this.loginForm.value.Password])
      .subscribe(res => {
        if (res == 'Failure') {
          this.isUserValid = false;
          this.snackbar.open('Incorrect Email or Password', undefined, {
            duration: 2000
          });
        }
        else {
          this.isUserValid = true;
          this.loginAuth.setToken(res);
          this.snackbar.open('Login Successful', undefined, {
            duration: 2000
          });
          setTimeout(() => {
            this.router.navigateByUrl('/products');
          }, 2000);
        }
      })
  }

  get email(): FormControl {
    return this.loginForm.get("Email") as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get("Password") as FormControl;
  }
}
