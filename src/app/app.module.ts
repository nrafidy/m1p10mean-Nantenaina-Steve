import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule, NgbDatepickerModule, NgbCollapseModule, NgbAccordionModule, NgbProgressbarModule  } from '@ng-bootstrap/ng-bootstrap';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';

import { NavbarComponent } from './navbar/navbar.component';
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ServicesCarouselComponent } from './services-carousel/services-carousel.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './appconfig/appconfig.service';
import { AdminComponent } from './admin/admin.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminVoituresComponent } from './admin-voitures/admin-voitures.component';
import { AdminTopnavComponent } from './admin-topnav/admin-topnav.component';
import { ImagekitioAngularModule } from 'imagekitio-angular';
import { environment } from 'src/environments/environment.development';
import { AdminRepairComponent } from './admin-repair/admin-repair.component';
import { SortableTableComponent } from './sortable-table/sortable-table.component';
import { PaymentStatePipe } from './custom-pipes/payment-state.pipe';
import { AriaryPipe } from './custom-pipes/ariary.pipe';
import { RepairStatePipe } from './custom-pipes/repair-state.pipe copy';
import { AdminFactureComponent } from './admin-facture/admin-facture.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { ResAtelierGuard } from './guards/res-atelier.guard';
import { ResFinanceGuard } from './guards/res-finance.guard';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FinanceOnlyGuard } from './guards/finance-only.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroBannerComponent,
    ClientHomeComponent,
    ServicesCarouselComponent,
    TestimonialsComponent,
    ContactUsComponent,
    FooterComponent,
    LoginComponent,
    AdminComponent,
    AdminNavComponent,
    NotFoundComponent,
    AdminVoituresComponent,
    AdminTopnavComponent,
    AdminRepairComponent,
    SortableTableComponent,
    PaymentStatePipe,
    AriaryPipe,
    RepairStatePipe,
    AdminFactureComponent,
    AdminDashboardComponent,
    AdminHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    NgbDatepickerModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbProgressbarModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    NgxDropzoneModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    ImagekitioAngularModule.forRoot({
      publicKey: environment.imageKitIoKey,
      urlEndpoint: environment.imageKitIoUrl,
      authenticationEndpoint: environment.authenticationEndpoint
    })
  ],
  providers: [
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    },
    LoggedInGuard,
    ResAtelierGuard,
    ResFinanceGuard,
    FinanceOnlyGuard,
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
