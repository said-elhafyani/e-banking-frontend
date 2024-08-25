import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    console.log("from onInit AdminCom",this.authService.isAutheticated);
  }

}
