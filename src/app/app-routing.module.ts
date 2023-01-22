import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminFactureComponent } from './admin-facture/admin-facture.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { AdminVoituresComponent } from './admin-voitures/admin-voitures.component';
import { AdminComponent } from './admin/admin.component';
import { ClientHomeComponent } from './client-home/client-home.component';
// import { LoggedInGuard } from './guards/logged-in.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ClientHomeComponent },
  {
    path: 'admin', component: AdminComponent,
      // canActivate: [LoggedInGuard],
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: AdminDashboardComponent },
        { path: 'voitures', component: AdminVoituresComponent},
        { path: 'factures', component: AdminFactureComponent},
        { path: 'historiques', component: AdminHistoryComponent},
    ]
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
