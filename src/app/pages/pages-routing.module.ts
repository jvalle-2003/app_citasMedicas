// pages-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CitasComponent } from './citas/citas.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'dating', component: CitasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
