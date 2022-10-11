import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  baseServerUrl = environment.baseServerUrl;
  jwtHelperService = new JwtHelperService();

  registerUser(user: Array<String>) {
    return this.http.post(this.baseServerUrl + "User/CreateUser", {
      Name: user[0],
      Email: user[1],
      UniqueUsername: user[2],
      Password: user[3],
      Address: user[4],
      PhoneNumber: user[5],
    }, {
      responseType: 'text',
    });
  }

  loginUser(loginInfo: Array<string>) {
    return this.http.post(this.baseServerUrl + "User/LoginUser", {
      Email: loginInfo[0],
      Password: loginInfo[1]
    }, {
      responseType: 'text',
    });
  }

  setToken(token: string){
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token): null;
    const data = userInfo ? {
      id: userInfo.id,
      aname: userInfo.name,
      email: userInfo.email,
      uniqueusername: userInfo.uniqueusername,
      address: userInfo.address,
      phonenumber: userInfo.phonenumber
    } : null;
    this.currentUser.next(data);
  }

  isLoggedin(): boolean{
    return localStorage.getItem("access_token") ? true : false;
  }

  removeToken(){
    localStorage.removeItem("access_token");
  }
}
