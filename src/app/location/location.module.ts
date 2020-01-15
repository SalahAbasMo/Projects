import { NgModule } from "@angular/core";
import { CityComponent } from "./city/city/city.component";
import { ShahrAqaryComponent } from "./shahr-aqary/shahr-aqary.component";
import { GovernateComponent } from "./governate/governate.component";
import { RegionComponent } from "./region/region.component";
import { CommercialRegisterComponent } from "./comercial-register/commercial-register/commercial-register.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import { LoadingSpinnerModule } from "shared/loading/loading-spinner.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
@NgModule({
  declarations: [
    CityComponent,
    CommercialRegisterComponent,
    ShahrAqaryComponent,
    GovernateComponent,
    RegionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    LoadingSpinnerModule,
    NgxDatatableModule,

    ConfirmationPopoverModule.forRoot({
      confirmButtonType: "danger",
      cancelButtonType: "dark"
    })
  ],
  exports: [
    CityComponent,
    CommercialRegisterComponent,
    ShahrAqaryComponent,
    GovernateComponent,
    RegionComponent
  ]
})
export class LocationModule {}
