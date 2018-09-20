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
        return true
      }
      else{  
        return false
      }  //this.appcomponent.user_logout=0;
    }
    logForm() { 
      if(this.loginInfo.username == undefined){
        this.toastr.error("please enter valid username")
        return ;

      }
      if(this.loginInfo.password == undefined){
        this.toastr.error("please enter valid password")
        return ;
      } 
      // if(this.loginInfo.username !=undefined && this.loginInfo.password !=undefined){
        let kwargs={
          "username":this.loginInfo.username,
          "password":this.loginInfo.password
        }
                this.apiservice.login(kwargs).then((res => {
                    console.log(res)
                  try{
  
                    if (res['success']){
                      localStorage.setItem('username', res['data'].username);
                      localStorage.setItem('department',res['data'].department)
                      localStorage.setItem('id',res['data'].id)
                      if(localStorage.getItem('username')!=""){
                        this.router.navigate(['/home'])
                        this.toastr.success( "You are Logged in Successfully");
                      }
                      else{
                        this.router.navigate([''])
                      }
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
      // }     
  
      }
}
