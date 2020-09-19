import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './dashboard/doctors/doctors.component';
import { IndiaComponent } from './dashboard/india/india.component';
import { WhoComponent } from './dashboard/who/who.component';
import { WorldComponent } from './dashboard/world/world.component';
import { TempComponent } from './temp/temp.component';


const routes: Routes = [
  { path:"", component:DashboardComponent },
  { path:"world", component:WorldComponent},
  { path:"temp", component:TempComponent },
  { path:'doctors', component:DoctorsComponent },
  { path:'india', component:IndiaComponent},
  { path:'who', component:WhoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
