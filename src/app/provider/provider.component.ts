import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { catch } from 'rxjs/operators'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class JhpHeadersService {
      url:string="http://10.10.11.227:8001/"
  constructor(public http: Http) {
   }
  apipostData = function(serviceURl,data){
    return new Promise((resolve, reject) => {
      this.http.post(this.url+serviceURl, data).map(res => res.json()).subscribe(data => {
          
          console.log(data);
          resolve(data);
      }, err => {
          console.log(err);
          resolve(err);
      }
      );
  });
  }
  apigetData = function(serviceURl){
    return new Promise((resolve, reject) => {
      this.http.get(this.url+serviceURl).map(res => res.json()).subscribe(data => {
          console.log(data);
          resolve(data);
      }, err => {
          console.log(err);
          resolve(err);
      }
      );
  });
  }
}
