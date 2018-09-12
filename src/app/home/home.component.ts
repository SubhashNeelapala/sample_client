import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../provider/apiservices.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRegistration } from '../models/user-registration';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
declare var jQuery:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
data:any
district:any;
result:any;
registrationForm:FormGroup
registration:UserRegistration=new UserRegistration();
public userRegistrationForm: FormGroup;
dtTrigger: Subject<any> = new Subject();
  constructor(public apiservice:ApiservicesService,public router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      username:new FormControl('',Validators.required),
      first_name:new FormControl('',Validators.required),
      last_name:new FormControl('',Validators.required),
      mobile_number:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required),
      age:new FormControl('',Validators.required),
      })
   return this.apiservice.getAllData().then((res)=>{
    jQuery('.dataTable').DataTable().destroy();
    jQuery('.dataTable').DataTable({ searching: false });
      this.data=res
      this.dtTrigger.next()
      console.log(this.data)
    })
  }
  createUser(){
    console.log(this.registration)
    // return this.registration;
  //   let kwargs={
  //     "username": this.registration.username,
  //     "first_name": this.registration.first_name,
  //     "last_name": this.registration.last_name,
  //     "mobile_number": this.registration.mobile_number,
  //     "age":this.registration.age ,
  //     "password": this.registration.password
  // }
    this.apiservice.createUser(this.registration).then((res)=>{
      this.result = res
      this.toastr.success(this.result['msg'])
      jQuery('#myModal').modal('hide');
      console.log(this.result)
    })
  }
  logout(){
localStorage.removeItem('username')
this.toastr.info("You are logged out successfully")
this.router.navigate([''])
  }
  AddUser(){
    jQuery('#myModal').modal();
    // this.router.navigate(['home/registration'])
  }
}
