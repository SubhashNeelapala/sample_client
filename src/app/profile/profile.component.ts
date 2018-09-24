import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../provider/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
data:any;
  constructor(private apiservice:ApiservicesService) { }

  ngOnInit() {
    let kwargs={
      "username":localStorage.getItem('username')
    }
    this.apiservice.getUserDetails(kwargs).then((res)=>{
      console.log(res)
      this.data=res[0]
    })
  }
// updateDetails(data){
//   this.apiservice.updateDetails(kwargs).then()
// }
}
