import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  confirmpassword: string='none';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  registerform = new FormGroup({
    Adminname: new FormControl("", 
    [Validators.required,Validators.minLength(3),Validators.pattern("[A-Za-z]+( [A-Za-z]+)*$")]),
    Email: new FormControl("", 
    [Validators.required,Validators.email]),
    Username: new FormControl("", 
    [Validators.required,Validators.minLength(4), Validators.maxLength(20),Validators.pattern("[a-zA-Z].*")]),
    Password: new FormControl("",
    [Validators.required,Validators.minLength(5)]),
    CPassword: new FormControl("",
    []),
    Address: new FormControl("",
    [Validators.required,Validators.minLength(5)]),
    Phone: new FormControl("",
    [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern("[0-9]*")]),
    PAN: new FormControl("",
    [Validators.required,Validators.minLength(12),Validators.maxLength(12),Validators.pattern("[A-Z]{5}[0-9]{4}[A-Z]{1}")]),
    dateofbirth: new FormControl("",
    [])
  });

  registersubmit(){
    if(this.password.value==this.cpassword.value){
      console.log('Submitted');
      this.confirmpassword='none';
      this.authService.registerUser().subscribe(res => {
        console.log(res);
      })
    }
    else{
      this.confirmpassword='inline';
    }
  }

  get adminname(): FormControl{
    return this.registerform.get("Adminname") as FormControl;
  }
  get email(): FormControl{
    return this.registerform.get("Email") as FormControl;
  }
  get username(): FormControl{
    return this.registerform.get("Username") as FormControl;
  }
  get password(): FormControl{
    return this.registerform.get("Password") as FormControl;
  }
  get cpassword(): FormControl{
    return this.registerform.get("CPassword") as FormControl;
  }
  get address(): FormControl{
    return this.registerform.get("Address") as FormControl;
  }
  get phone(): FormControl{
    return this.registerform.get("Phone") as FormControl;
  }
  get pan(): FormControl{
    return this.registerform.get("PAN") as FormControl;
  }
  get dob(): FormControl{
    return this.registerform.get("dateofbirth") as FormControl;
  }

}