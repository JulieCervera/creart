import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Http, Headers, RequestOptions, HttpModule } from '@angular/http';
import { ActivatedRoute, RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { ArtService } from './services/art.service';
import { UserComponent } from './user/user.component';
import { ArtsComponent } from './arts/arts.component';
import { ArtworkComponent } from './artwork/artwork.component';
import { ArtworkService } from './services/artwork.service';
import { ArtDetailComponent } from './art-detail/art-detail.component';
import { AccountComponent } from './account/account.component';
import { PictureComponent } from './picture/picture.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    ArtsComponent,
    ArtworkComponent,
    ArtDetailComponent,
    AccountComponent,
    PictureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule, 
    HttpModule
    ],
  providers: [AuthService, ArtService, ArtworkService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
