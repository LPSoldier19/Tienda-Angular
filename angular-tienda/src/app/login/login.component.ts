import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { Router, RouterModule } from '@angular/router';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';

declare var jQuery:any;
declare var $:any;
declare var myself: any;

@Component({
  selector: 't-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router: Router,private httpService: HttpService) { }

  ngOnInit() {
     let myself = this;
     $("#btn_login").click(function(){
        myself.onLogin();
     });
  }

   //----------------------------------------------------------------------------
   onLogin() {
   //----------------------------------------------------------------------------
      this.httpService.valUser($("#email").val(),$("#password").val())
      .subscribe(
        (data: Response) => {
           console.log(data["msg"]);
            if (data["msg"] == "OK") {
               sessionStorage.setItem("username", $("#email").val());
               sessionStorage.setItem("counter",data["cuenta"]);
               this.router.navigateByUrl('/catalogo');
            } else {
               alert(data["msg"])
            }
      });
   }
}
