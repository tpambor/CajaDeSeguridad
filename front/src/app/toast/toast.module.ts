import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';
import { ToasterComponent } from './toaster/toaster.component';
import { ToastComponent } from './toast/toast.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ToasterComponent
  ],
  providers: [
    ToastService
  ],
  declarations: [
    ToasterComponent,
    ToastComponent
  ],
})
export class ToastModule { }
