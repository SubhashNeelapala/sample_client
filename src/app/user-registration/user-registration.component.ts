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
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  data:any;
  toggleButton=0;
  result:any;
  item:any;
  registrationForm:FormGroup
  registration:UserRegistration=new UserRegistration();
  dtTrigger: Subject<any> = new Subject();
  public userRegistrationForm: FormGroup;
  constructor(private formbuilder:FormBuilder,public apiservice:ApiservicesService,public router:Router,private toastr:ToastrService) { }

  ngOnInit() {
    this.item=localStorage.getItem('id')
    this.userRegistrationForm = new FormGroup({
      'username':new FormControl('',Validators.required),
      'first_name':new FormControl('',Validators.required),
      'last_name':new FormControl('',Validators.required),
      'mobile_number':new FormControl('',Validators.required),
      'password':new FormControl('',Validators.required),
      'age':new FormControl('',Validators.required),
      })
    let kwargs={
      "department":localStorage.getItem('department')
    }
 return this.apiservice.getAllUSersDataInDept(kwargs).then((res)=>{
  jQuery('.dataTable').DataTable().destroy();
  jQuery('.dataTable').DataTable({ searching: false });
    this.data=res
    this.dtTrigger.next()
    console.log(this.data)
  })

  }
  createUser(){
    if(this.registration.username == ""){
      this.toastr.error("Please enter Username")
      return ;
    }
    if(this.registration.first_name == ""){
      this.toastr.error("Please enter First name")
      return ;
    }
    if(this.registration.last_name == ""){
      this.toastr.error("Please enter last name")
      return ;
    }
    if(this.registration.age == ""){
      this.toastr.error("please enter  age")
      return ;
    }
    if(this.registration.password == ""){
      this.toastr.error("please enter password")
      return ;
    }
    if(this.registration.mobile_number == ""){
      this.toastr.error("please enter password")
      return ;
    }
    console.log(this.registration)
   
    this.apiservice.createUser(this.registration).then((res)=>{
      this.result = res
      this.ngOnInit()
      this.toastr.success(this.result['msg'])
      jQuery('#myModal').modal('hide');
      this.registrationForm.clearValidators()
      this.registrationForm.reset()
      this.registration.username=''
      this.registration.first_name=''
      this.registration.last_name=''
      this.registration.age=''
      this.registration.password=''
      console.log(this.result)
    })
  }
  AddUser(){
    this.toggleButton=1
    jQuery('#myModal').modal();
    // this.router.navigate(['home/registration'])
  }
  onEdit(items){
    this.toggleButton = 0;
    this.registration.username=items.username
    this.registration.first_name=items.first_name
    this.registration.last_name=items.last_name
    this.registration.age=items.age
    this.registration.password=items.password
    this.registration.mobile_number = items.mobile_number
    jQuery('#myModal').modal('show')
  }
  updateData(){
    // return this.registration;
    console.log(this.registration)
    this.apiservice.createUser(this.registration).then((res)=>{
      console.log(res)
      jQuery('#myModal').modal('hide')
      this.registrationForm.clearValidators()
      this.registrationForm.reset()
      this.registration.username=''
      this.registration.first_name=''
      this.registration.last_name=''
      this.registration.age=''
      this.registration.password=''
    })
  }
  getUserdetails(){
    let kwargs={
      "username":localStorage.getItem('username')
    }
    jQuery('#myModal1').modal('show')
    this.apiservice.getUserDetails(kwargs).then((res)=>{

        this.data=res["data"]
        this.data=this.data[0]
        console.log(this.data)

    
    })
  }
}
