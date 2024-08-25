import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public  isAutheticated : boolean = false;
  public roles : string | undefined;
  public username : string | undefined;
  public accessToken :string | undefined;

  backendHost = 'http://localhost:8085';


  constructor(private httpClient:HttpClient,private router:Router) { }

  public login(username: string, password: string) {

    let options = {
      headers:
        new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    let params = new HttpParams().set('username', username).set('password', password);
    return this.httpClient.post(this.backendHost + '/auth/login', params,options);
  }

  loadProfile(data: any) {
    this.isAutheticated = true;
    this.accessToken = data['access_token'];  // Updated key
    if (this.accessToken) {
      let decodedJwt: any = jwtDecode(this.accessToken);
      this.username = decodedJwt.sub;
      this.roles = decodedJwt.scope;
      window.localStorage.setItem('access_token', this.accessToken); // store the token in local storage
    } else {
      console.error('No access token found in the response.');
    }
  }


  logout() {
    this.isAutheticated = false;
    this.accessToken = undefined;
    this.username = undefined;
    this.roles = undefined;
    this.router.navigateByUrl('/login');
    window.localStorage.removeItem('access_token');
  }

  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem('access_token');
    if (token) {
      this.loadProfile({access_token: token});
      this.router.navigateByUrl('/admin/customers');
    }
  }
}
