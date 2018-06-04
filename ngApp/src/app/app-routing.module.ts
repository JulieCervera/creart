import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ArtsComponent } from './arts/arts.component';
import { UserComponent } from './user/user.component';
import { ArtworkComponent } from './artwork/artwork.component';
import { ArtDetailComponent } from './art-detail/art-detail.component';
import { AccountComponent } from './account/account.component';
import { PictureComponent } from './picture/picture.component';

const routes: Routes = [
  {
    path: 'arts',
    component: ArtsComponent
  },
  {
    path: 'upload',
    component: PictureComponent
  },
  {
    path: 'upload/:id',
    component: ArtworkComponent
  },
  { 
    path: 'details/:id', 
    component: ArtDetailComponent 
  },
  { 
    path: 'account', 
    component: AccountComponent 
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path:'',
    redirectTo: '/arts',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
