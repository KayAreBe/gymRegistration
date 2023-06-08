import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "http://localhost:3000/users"
  constructor(private http: HttpClient) { }

  createUser(userObj: User) {
    return this.http.post<User>(`${this.baseUrl}`, userObj)
  }

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}`)
  }

  updateUser(userObj: User, id: number) {
    return this.http.put<User>(`${this.baseUrl}/${id}`, userObj)
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.baseUrl}/${id}`)
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }


}
