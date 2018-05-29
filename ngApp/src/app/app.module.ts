import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    ArtsComponent,
    ArtworkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthService, ArtService, ArtworkService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
