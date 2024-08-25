import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin! : FormGroup;


  constructor(private formBuilder: FormBuilder,private authService: AuthService,private router: Router) {

  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    });
  }

  handleLogin() {
    this.authService.login(this.formLogin.value.username, this.formLogin.value.password).subscribe({
      next: (data) => {
        this.authService.loadProfile(data);
        console.log(this.authService.isAutheticated +" before");
        this.router.navigateByUrl('/admin');
        console.log(this.authService.isAutheticated +" after");
      },
      error: (error) => {
        console.log(error);
      }

    });
  }
}
