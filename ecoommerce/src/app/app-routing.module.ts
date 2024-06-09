import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path:"",
    loadChildren:()=> import("./modules/home/home.module").then(m => m.HomeModule),

  },
  {
    path:"",
    loadChildren:()=> import("./modules/ecommerce-guest/ecommerce-guest.module").then(m => m.EcommerceGuestModule),

  },
  {
    path:"auth",
    loadChildren:()=> import("./modules/auth-profile/auth-profile.module").then(m => m.AuthProfileModule),

  },
  {
    path: '',
    redirectTo:'/',
    pathMatch:'full',

  },
  {
    path:'**',
    redirectTo:'error/404',
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),//ex
  ],
  exports:[
    RouterModule,
  ]
})
export class AppRoutingModule { }
