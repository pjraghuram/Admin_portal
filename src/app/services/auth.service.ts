import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseServerUrl = "https://localhost:44359/api/";
  registerUser(user: Array<String>){
    return this.http.post(this.baseServerUrl + "User/CreateUser",{
      Name: user[0],
      Email: user[1],
      UniqueUsername: user[2],
      Password: user[3],
      Address: user[4],
      PhoneNumber: user[5],
      PAN: user[6]
    },{
      responseType:'text',
    });
  }
}
