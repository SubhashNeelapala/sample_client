import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../provider/apiservices.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
data:any
district:any
dtTrigger: Subject<any> = new Subject();
  constructor(public apiservice:ApiservicesService,public router:Router,private toastr:ToastrService) { }

  ngOnInit() {
   return this.apiservice.getAllData().then((res)=>{
    jQuery('.dataTable').DataTable().destroy();
    jQuery('.dataTable').DataTable({ searching: false });
      this.data=res
      this.dtTrigger.next()
      console.log(this.data)
    })
  }
  // createUser(){
  //   let kwargs={
  //     "username": "",
  //     "first_name": "",
  //     "last_name": "",
  //     "mobile_number": "",
  //     "age":"" ,
  //     "password": ""
  // }
  //   this.apiservice.createUser(kwargs).then((res)=>{
  //     this.data = res
  //     console.log(this.data)
  //   })
  // }
  logout(){
localStorage.removeItem('username')
this.toastr.info("You are logged out successfully")
this.router.navigate([''])
  }
}
