import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enveironment';
import { SingUpUserRequest } from './../../../models/interfaces/user/signUpUserRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = environment.API_URL

  constructor(private httpclient: HttpClient) { }

  signUpUser(requestData:SingUpUserRequest):Observable<>{

  }
}
