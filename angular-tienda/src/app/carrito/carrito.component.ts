import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpService } from './../http.service';
import { Response } from '@angular/http';
import { Router, RouterModule } from '@angular/router';

declare var jQuery:any;
declare var $:any;
declare var myself: any;

@Component({
  selector: 't-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  constructor(private router: Router,private httpService: HttpService) { }

  ngOnInit() {
     this.getData();

     let myself = this;
     $("#btn_pagar").click(function(){
        myself.onPay();
     });
  }


  //----------------------------------------------------------------------------
  onPay() {
  //----------------------------------------------------------------------------
     let wUsername = sessionStorage.getItem("username");

     this.httpService.delCarrito(wUsername)
     .subscribe(
      (data: Response) => {
          //console.log(data["msg"]);
           if (data["msg"] == "OK") {
              alert("Se realizó el pago");
              sessionStorage.setItem("counter","0");
              this.router.navigateByUrl('/catalogo');
           } else {
              alert(data["msg"])
           }
     });
  }


  //----------------------------------------------------------------------------
  getData(){
  //----------------------------------------------------------------------------
      let wUsername = sessionStorage.getItem("username");
      let myself = this;

      this.httpService.getCarrito(wUsername)
      .subscribe(
         (data: Response) => {
            //console.log(data);
            for (let key in data) {
               let arrayCat = data[key];
               let total = 0;
               for (let i=0; i<arrayCat.length; i++) {
                  //console.log(item);
                  let celda = $(this.cardItem(arrayCat[i]));
      	         $(".rowCarrito").append(celda);
                  total = total + (arrayCat[i].cantidad*arrayCat[i].precio);
               }
               $("#titulo").text("Total : " + (Math.round(total * 100) / 100));
               break;
            }
         }
      )
  }



  //----------------------------------------------------------------------------
  cardItem(pvItem) {
  //----------------------------------------------------------------------------
     return "<div class='col s2 m2 l2'> "+
              "<div class='card'> " +
                 "<div class='card-image'> " +
                    "<img src='../../assets/img/"+pvItem.imagen+"'> " +
                 "</div> " +
                 "<div class='card-stacked'> " +
                    "<div class='card-content'> " +
                       "<p style='font-size:12px'>"+pvItem.descripcion+"</p> " +
                       "<p style='font-size:12px'>Unidades: "+pvItem.cantidad+"</p> " +
                       "<p style='font-size:12px'>SubTotal: "+(pvItem.cantidad*pvItem.precio)+"</p> " +
                    "</div> "+
                 "</div> "+
             "</div> " +
           "</div> ";
  };
}
