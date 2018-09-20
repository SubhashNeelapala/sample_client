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
  // item:any;
  username:any;
  
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
    this.username=localStorage.getItem('username')
   
    // console.log(localStorage.getItem('username'))
    if(localStorage.getItem('username')== '' || localStorage.getItem('username')== null ){
    this.router.navigate([''])
    }


  }

  
  logout(){
localStorage.removeItem('username')
this.toastr.info("You are logged out successfully")
this.router.navigate([''])
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

}
