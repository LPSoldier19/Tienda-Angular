import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpService } from './../http.service';
import { Response } from '@angular/http';

declare var jQuery:any;
declare var $:any;
declare var myself: any;

@Component({
  selector: 't-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})


export class CatalogoComponent implements OnInit {
  private counter: any;

  constructor(private httpService: HttpService){
  }

  //----------------------------------------------------------------------------
  ngOnInit(){
  //----------------------------------------------------------------------------
     this.getData();

     $("#search").on('input', function(){
        let val = $("#search").val().toLowerCase();
        if (val != "") {
           $(".frutas").hide();
           $("[id^='cat_"+val+"']").show();
        } else {
           $(".frutas").show();
        }
     });
  }

  //----------------------------------------------------------------------------
  getData(){
  //----------------------------------------------------------------------------
     let myself = this;
     this.counter = sessionStorage.getItem("counter");
     $("#badge_cart").text(this.counter.toString());

     this.httpService.getDatos()
     .subscribe(
         (data: Response) => {
            //console.log(data);
            for (let key in data) {
               let arrayCat = data[key];
               for (let i=0; i<arrayCat.length; i++) {
                  //console.log(item);
                  let celda = $(this.cardItem(arrayCat[i]));
			         $(".rowContenido").append(celda);

                  $("#btn_"+arrayCat[i].descripcion.toLowerCase()).click(function(){
                     myself.onClickAniadir(arrayCat[i])
                  });
               }

               break;
            }
         }
      )
  }

  //----------------------------------------------------------------------------
  onClickAniadir(pvItem) {
  //----------------------------------------------------------------------------
      let wUsername = sessionStorage.getItem("username");

      this.httpService.insCarrito(wUsername,pvItem.idcatalogo,$("#cant_"+pvItem.descripcion.toLowerCase()).val())
      .subscribe(
         (data2: Response) => console.log(data2)
      )

      this.counter++;
      $("#badge_cart").text(this.counter.toString());

      //console.log(this.counter.toString())
  };

  //----------------------------------------------------------------------------
  cardItem(pvItem) {
  //----------------------------------------------------------------------------
  	return "<div class='frutas col s3 m3 l3' id='cat_"+pvItem.descripcion.toLowerCase()+"'> "+
            "<div class='card'> " +
               "<div class='card-image'> " +
                  "<img src='../../assets/img/"+pvItem.imagen+"'> " +
               "</div> " +
               "<div class='card-stacked'> " +
                  "<div class='card-content'> " +
                     "<p>"+pvItem.descripcion+"</p> " +
                     "<p>Precio: "+pvItem.precio+"</p> " +
                     "<p>Und. Disponible: "+pvItem.unidades+"</p> " +
                     "<div class = 'row'> " +
                        "<div class='input-field col m6'> " +
                            "<input id='cant_"+pvItem.descripcion.toLowerCase()+"' type='number' value='0'> " +
                        "</div> " +
                        "<div class='input-field col m6'> " +
                            "<button id='btn_"+pvItem.descripcion.toLowerCase()+"' class='btn-small waves-effect waves-light' name='action'>Añadir</button> " +
                        "</div> " +
                     "</div> " +
                  "</div> " +
                  "<div class='card-action'> " +
                     "<a href='#'>Ver Mas</a> " +
                  "</div> " +
               "</div> " +
            "</div> " +
         "</div> ";
  };
}
