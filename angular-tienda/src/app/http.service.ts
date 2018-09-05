import { Injectable } from '@angular/core';
import { HttpModule, Http, Response,URLSearchParams,RequestOptions,Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class HttpService {

  constructor(private http : Http) { }

  getDatos() {
     return this.http.get('http://marfatech.esy.es/TrabajoFinal/server/getCatalogo.php')
            .map((response: Response) => response.json());
  }


  getCarrito(pUsername) {
     let params: URLSearchParams = new URLSearchParams();
     params.set('username', pUsername.toString());

     return this.http.post('http://marfatech.esy.es/TrabajoFinal/server/get_carrito.php',params)
            .map((response: Response) => response.json());
  }

  delCarrito(pUsername) {
     let params: URLSearchParams = new URLSearchParams();
     params.set('username', pUsername.toString());

     return this.http.post('http://marfatech.esy.es/TrabajoFinal/server/del_carrito.php',params)
            .map((response: Response) => response.json());
  }

  insCarrito(pUsername,pIdCatalogo,pCantidad) {
     let params: URLSearchParams = new URLSearchParams();
     params.set('username', pUsername.toString());
     params.set('idcatalogo', pIdCatalogo.toString());
     params.set('cantidad', pCantidad.toString());

     return this.http.post('http://marfatech.esy.es/TrabajoFinal/server/ins_carrito.php',params)
            .map((response: Response) => response.json());
  }

  valUser(psUsername,psPassword) {
     let params: URLSearchParams = new URLSearchParams();
     params.set('username', psUsername.toString());
     params.set('password', psPassword.toString());

     return this.http.post('http://marfatech.esy.es/TrabajoFinal/server/check_login.php',params)
            .map((response: Response) => response.json());
  }
}
