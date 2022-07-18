import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { QueryResults } from '../Models/QueryResults';
import { User } from '../Models/User';
import { ConnectionPositionPair } from '@angular/cdk/overlay';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient,
    private baseService: BaseService) { }

    setUrl(urlPath: string) {
      return this.baseService.getBaseUrl() + urlPath;
    }
  
    getPath() {
      return this.baseService.getBaseUrl();
    }

    ListUser():Observable<QueryResults>
    {
       return this.http.get<QueryResults>(`${this.setUrl('api/users?page=2')}`)     
    }
    
    CreateUser(userdetails: User): Observable<any> {
      return this.http.post(`${this.setUrl('api/users/')}`+ userdetails.id, userdetails);
    }

    UpdateUser(userdetails: User): Observable<any> {
      return this.http.put(`${this.setUrl('api/users/')}` + userdetails.id, userdetails);
    }

    DeleteUser(userdetails: User): Observable<any> {
      return this.http.delete(`${this.setUrl('api/users/')}` + userdetails.id);
    }
}
