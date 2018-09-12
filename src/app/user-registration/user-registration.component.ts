import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../models/user-registration';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiservicesService } from '../provider/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  data:any;
  registration:UserRegistration=new UserRegistration();
  public userRegistrationForm: FormGroup;
  constructor(private formbuilder:FormBuilder,public apiservice:ApiservicesService,public router:Router) { }

  ngOnInit() {
    this.userRegistrationForm = new FormGroup({
    'username':new FormControl('',Validators.required),
    'first_name':new FormControl('',Validators.required),
    'last_name':new FormControl('',Validators.required),
    'mobile_number':new FormControl('',Validators.required),
    'password':new FormControl('',Validators.required),
    'age':new FormControl('',Validators.required),
    })
  }
  createUser(){
    let kwargs={
      "username": "",
      "first_name": "",
      "last_name": "",
      "mobile_number": "",
      "age":"" ,
      "password": ""
  }
    this.apiservice.createUser(kwargs).then((res)=>{
      this.data = res
      console.log(this.data)
    })
  }
}
