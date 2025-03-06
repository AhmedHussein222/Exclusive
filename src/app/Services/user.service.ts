import { Injectable } from '@angular/core';
import { Iuser } from '../Models/Iuser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

constructor(private http : HttpClient) { }


  addUser(user:Iuser):Observable<Iuser>{
    
    return this.http.post<Iuser>(`${environment.baseUrl}/users`,user)
    
  }

  check(user:Iuser):Observable<Iuser>{
    return this.http.get<Iuser>(`${environment.baseUrl}/users/?username=${user.email}&password=${user.password}`)
    
  }

}
