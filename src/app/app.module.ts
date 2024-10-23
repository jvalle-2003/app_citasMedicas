import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa esto para animaciones
import { ToastrModule, ToastrService } from 'ngx-toastr'; // Asegúrate de importar el ToastrModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module'; 
import { DialogService } from 'primeng/dynamicdialog'; // Importa DialogService aquí
// Asegúrate de que esta ruta sea correcta
@NgModule({
  declarations: [
    AppComponent // Declara AppComponent aquí
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Asegúrate de incluirlo
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
      maxOpened: 5,
      autoDismiss: true,
    }),    AppRoutingModule,
    AuthModule 
  ],
  providers: [DialogService, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
