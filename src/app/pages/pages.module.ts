// src/app/pages/pages.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { CitasComponent } from './citas/citas.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { MegaMenuModule } from 'primeng/megamenu';
import { ConsultasComponent } from './consultas/consultas.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { RecetasComponent } from './recetas/recetas.component';
import { MedicosComponent } from './medicos/medicos.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { UnidadesmedidaComponent } from './unidadesmedida/unidadesmedida.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
@NgModule({
  declarations: [HomeComponent, CitasComponent, ConsultasComponent, MedicamentosComponent, RecetasComponent, MedicosComponent, PacientesComponent, UnidadesmedidaComponent, UsuariosComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TagModule,
    FormsModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule,
    ToastModule,
    MegaMenuModule
  ],
    
})
export class PagesModule {}
