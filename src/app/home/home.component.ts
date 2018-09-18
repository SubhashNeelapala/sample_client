import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../provider/apiservices.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRegistration } from '../models/user-registration';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
declare var jQuery:any;
import {Keepalive} from '@ng-idle/keepalive';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  data:any
  district:any;
  result:any;
  toggleButton=0;
  registrationForm:FormGroup
  registration:UserRegistration=new UserRegistration();
  dtTrigger: Subject<any> = new Subject();
  constructor(public apiservice:ApiservicesService,public router:Router,private toastr:ToastrService,private idle: Idle, private keepalive: Keepalive) { 
        // sets an idle timeout of 5 seconds, for testing purposes.
        idle.setIdle(5);
        // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
        idle.setTimeout(100);
        // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
        idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    
        idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
        idle.onTimeout.subscribe(() => {
          this.idleState = 'Timed out!';
          this.timedOut = true;
        });
        idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
        idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');
    
        // sets the ping interval to 15 seconds
        keepalive.interval(15);
    
        keepalive.onPing.subscribe(() => this.lastPing = new Date());
    
        this.reset();
  }

  ngOnInit() {
    // console.log(localStorage.getItem('username'))
    if(localStorage.getItem('username')== '' || localStorage.getItem('username')== null ){
    this.router.navigate([''])
    }
    this.toggleButton=1;
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
  
  logout(){
localStorage.removeItem('username')
this.toastr.info("You are logged out successfully")
this.router.navigate([''])
  }
  AddUser(){
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
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
