import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './autho-components/signup/signup.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularMaterialModule } from './AngularMaterialModule';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './auth-components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { DemandeComponent } from './auth-components/demande/demande.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './auth-components/home/home.component';
import { MatSliderModule } from '@angular/material/slider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmploiComponent } from './auth-components/emploi/emploi.component';
import { StageComponent } from './auth-components/stage/stage.component';
import { ScrapeComponent } from './auth-components/scrape/scrape.component';
import { FavorisComponent } from './auth-components/favoris/favoris.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,DemandeComponent,HomeComponent,
    EmploiComponent,StageComponent,ScrapeComponent,FavorisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  FormsModule,
  ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    AngularMaterialModule,MatInputModule,MatIconModule, CommonModule,BrowserAnimationsModule,MatSliderModule,FontAwesomeModule
    
 
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()) // Ajoutez withFetch() pour activer fetch dans HttpClient

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
