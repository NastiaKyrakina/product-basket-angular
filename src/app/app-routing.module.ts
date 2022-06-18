import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'calculations', loadChildren: () => import('./modules/calculations/calculations.module').then(m => m.CalculationsModule)},
  { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) },
  { path: 'about', loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) },
  { path: 'baskets', loadChildren: () => import('./modules/products-baskets/products-baskets.module').then(m => m.ProductsBasketsModule) },
  { path: 'restrictions', loadChildren: () => import('./modules/restrictions/restrictions.module').then(m => m.RestrictionsModule) },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: 'about' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
