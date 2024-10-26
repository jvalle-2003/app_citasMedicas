// pages-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CitasComponent } from './citas/citas.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { RecetasComponent } from './recetas/recetas.component';
import { MedicosComponent } from './medicos/medicos.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { UnidadesmedidaComponent } from './unidadesmedida/unidadesmedida.component'
import { UsuariosComponent } from './usuarios/usuarios.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dating', component: CitasComponent },
  { path: 'appointment', component: ConsultasComponent },
  { path: 'medicine', component: MedicamentosComponent },
  { path: 'prescription', component: RecetasComponent },
  { path: 'doctors', component: MedicosComponent },
  { path: 'px', component: PacientesComponent },
  { path: 'unit', component: UnidadesmedidaComponent },
  { path: 'users', component: UsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
