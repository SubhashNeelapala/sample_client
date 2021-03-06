import { Injectable } from '@angular/core';
import {JhpHeadersService} from './provider.component'
import { retry } from 'rxjs/operators/retry';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ApiservicesService {
  sharedata:any;
//   private messageSource = new BehaviorSubject<string>("");
//   currentMessage = this.messageSource.asObservable();


  constructor(public _jhpheaderservice:JhpHeadersService) { }
  login(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // console.log(connect);
    // let data = {
    //     "username": connect.username,
    //     "password": connect.password,
        
    // }
    console.log(data);
    return this._jhpheaderservice.apipostData("login/",data);
  
}
// getAllData():any{
//   return this._jhpheaderservice.apigetData("getallusers")
// }
getAllUSersDataInDept(data):any{
  return this._jhpheaderservice.apipostData("userbasedlist",data)
}
createUser(data){
  return this._jhpheaderservice.apipostData("registration",data);
}
getUserDetails(data){
  return this._jhpheaderservice.apipostData("userdetails_byname",data);
}
updateDetails(data){
  return this._jhpheaderservice.apipostData("update_profile",data);
}
deleteUser(id){
  return this._jhpheaderservice.apipostData("delete_user",id);
}
}