import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'calculations', loadChildren: () => import('./calculations/calculations.module').then(m => m.CalculationsModule)},
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: 'baskets', loadChildren: () => import('./products-baskets/products-baskets.module').then(m => m.ProductsBasketsModule) },
  { path: 'restrictions', loadChildren: () => import('./restrictions/restrictions.module').then(m => m.RestrictionsModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
