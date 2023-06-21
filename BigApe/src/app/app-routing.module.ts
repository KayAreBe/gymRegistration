import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EnquiriesComponent } from './admin/enquiries/enquiries.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

const routes: Routes = [
  {path: '', component:LandingComponent, pathMatch:'full'},
  {path:'landing', component:LandingComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'update/:id', component:RegisterComponent},
  { path: 'detail/:id', component: UserDetailComponent },
  {path: 'home', component:HomeComponent},
  {path: 'dashboard', component:DashboardComponent},
  {path: 'enquiries', component:EnquiriesComponent},
  {path: '**', component:LandingComponent, pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
