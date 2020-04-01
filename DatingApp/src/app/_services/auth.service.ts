import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, observable } from 'rxjs';
// import { User } from '../DatingApp.API/Models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  decodedToken: any;
  userToken: any;
  jwtHelper = new JwtHelperService();
  // currentUser = User;

constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        console.log(user);
        if (user) {
          localStorage.setItem('token', user.tokenString);
          // localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          this.userToken = user.tokenString;
          // this.currentUser = user.user;
          // this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }
}
