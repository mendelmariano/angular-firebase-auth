import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main/people'
  },

  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
    
  },

  {
    path: 'uploads',
    loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule),
    
  },

  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuardService]
  },

  

  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
