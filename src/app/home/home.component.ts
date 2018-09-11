import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from '../provider/apiservices.service';
import { DataTablesModule } from 'angular-datatables';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
data:any
district:any
  constructor(public apiservice:ApiservicesService) { }

  ngOnInit() {
   return this.apiservice.getAllData().then((res)=>{
      this.data=res
      console.log(this.data)
    })
  }
}
