import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginForm=new FormGroup({
    Username: new FormControl("",[Validators.required,Validators.minLength(4), Validators.maxLength(20),Validators.pattern("[a-zA-Z].*")]),
    Password: new FormControl("",[Validators.required,Validators.minLength(5)])
  });

  loginSubmitted(){
    console.log(this.loginForm);
  }


  get username(): FormControl{
    return this.loginForm.get("Username") as FormControl;
  }
  get password(): FormControl{
    return this.loginForm.get("Password") as FormControl;
  }
}
