import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ArtsComponent } from './arts/arts.component';
import { UserComponent } from './user/user.component';
import { ArtworkComponent } from './artwork/artwork.component';

const routes: Routes = [
  {
    path: 'arts',
    component: ArtsComponent
  },
  {
    path: 'artwork',
    component: ArtworkComponent
  },
  { path: 'arts/:id', 
  component: ArtworkComponent },
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
