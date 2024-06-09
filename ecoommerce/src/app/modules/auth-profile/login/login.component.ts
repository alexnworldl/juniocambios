import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email:string="";
  password:string="";
  constructor(
    public authService: AuthService,
    public router: Router,
  ){}
  ngOnInit(): void {
    console.log(this.authService.user);
    if(this.authService.user){
      this.router.navigate(['/']);
    }
  }

  login(){
    if(!this.email){
      alert("Es necesario ingresar el EMAIL");
    }
    if(!this.password){
      alert("Es necesario ingresar una contraseña");
    }
    this.authService.login(this.email,this.password).subscribe((resp:any)=>{
      console.log(resp);
      if(!resp.error && resp){
        //significa que el usuario ingresó con éxito
        this.router.navigate(["/"]);

      }else{
        alert(resp.error.message);
      }

    })
  }

  registrarejemplo(){
    this.router.navigateByUrl("/auth/register");
  }

}
