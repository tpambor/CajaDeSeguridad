import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './app/login/login.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(RouterModule.forRoot([
      { path: '', component: AppComponent },
      { path: 'login', component: LoginComponent }
    ]))
  ]
})
  .catch(err => console.error(err));