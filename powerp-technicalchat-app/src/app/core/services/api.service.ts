import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://chatapipowerp-bba2f0daewfqdxfd.westus2-01.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  register(userDto: { nickname: string; name: string; imageUrl: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, userDto);
  }

  login(loginDto: {nickname:string}): Observable<User> {
    const params = new HttpParams().set('nickname', loginDto.nickname)
    return this.http.get<User>(`${this.baseUrl}/auth`, { params });
  }
}