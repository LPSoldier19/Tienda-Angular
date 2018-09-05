import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { LoginComponent } from './login/login.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
   { path: '', component: LoginComponent},
   { path: 'carrito', component: CarritoComponent},
   { path: 'catalogo', component: CatalogoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class L3RoutingModule { }
