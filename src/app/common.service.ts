import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


  constructor(private _http: HttpClient) { }
  userAdded = new Subject();
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  createUser(obj: any) {
    console.log(obj);
    return this._http.post("http://localhost:9191/addPatient", JSON.stringify(obj) , this.httpOptions)

  }

  getLatestUsers() {
    return this._http.get("http://localhost:9191/patients")

  }
  updateUser(user: any) {
    return this._http.put("http://localhost:9191/update", user)

  }
  deleteUser(user: { id: Int16Array; }) {
    return this._http.delete<any>("http://localhost:9191/delete/" + user.id)

  }
  
  checkEmail(email: string){
    return this._http.post<any>("http://localhost:9191/checkPatient", email)
  }

  findPatient(name: string){
    return this._http.get("http://localhost:9191/patient/"+name);
  }

  informChild() {
    this.userAdded.next();
  }
}
