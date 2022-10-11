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
  displayMsg: string='';
  isAccountCreated: boolean=false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  registerform: FormGroup = new FormGroup({
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
    PAN: new FormControl("",),
    dateofbirth: new FormControl("",
    [])
  });

  registersubmit(){
    if(this.password.value==this.cpassword.value){
      console.log('Submitted');
      this.confirmpassword='none';
      this.authService.registerUser(
        [
          this.registerform.value.Adminname,
          this.registerform.value.Email,
          this.registerform.value.Username,
          this.registerform.value.Password,
          this.registerform.value.Address,
          this.registerform.value.Phone,
          this.registerform.value.PAN,
        ]
      ).subscribe(res => {
        if(res == 'Success'){
          this.displayMsg = 'Account Created Successfully';
          this.isAccountCreated=true;
        }
        else if(res == 'Already Registered'){
          this.displayMsg='Account Already Exist. Use another Email.';
          this.isAccountCreated=false;
        }
        else{
          this.displayMsg='Something went wrong';
          this.isAccountCreated=false;
        }
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
