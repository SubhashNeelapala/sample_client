import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../provider/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginData } from '../models/login.models';
import { ToastrService } from 'ngx-toastr';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  x:any;
  user:any;
  status:any;
  loginInfo: LoginData = new LoginData();
  loginstatus=0;
  public homehierarchylevelform: FormGroup;
    constructor(private formBuilder: FormBuilder, public apiservice:ApiservicesService,public router:Router,private toastr: ToastrService) {
      //this.appcomponent.user_logout=0;
     
   this.homehierarchylevelform = this.formBuilder.group({
              username:  ['', Validators.required ],
              password: ['', Validators.required ]
            
          });
     }
  
    ngOnInit() {
      if(localStorage.getItem("username")){
        this.router.navigate(['/home']);
      }
      else{  
      }  //this.appcomponent.user_logout=0;
    }
    logForm() {       
              this.apiservice.login(this.homehierarchylevelform.value).then((res => {
                  console.log(res)
                try{

                  if (res['success']){
                        this.router.navigate(['/home'])
localStorage.setItem("username",res['data'].username)
                      this.toastr.success( "You are Logged in Successfully"); 
                  }
                  else{
                    this.toastr.error( "you have no permission for login");
                  }
                }
                catch(ex){
                  this.loginstatus =1;                  
                  this.toastr.error("your username or password wrong")
                }                 
                  }));
              console.log(this.homehierarchylevelform.value);   
      }
}
