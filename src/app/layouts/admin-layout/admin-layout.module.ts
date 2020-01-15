import { LoadingSpinnerModule } from "./../../../shared/loading/loading-spinner.module";
import { LoginComponent } from "./../../auth/login/login.component";
import { LocationModule } from "./../../location/location.module";
import { FeaturesModule } from "./../../features/features.module";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";

import { MatAutocompleteModule } from "@angular/material";
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from "@angular/material";
import { ToastrModule } from "ngx-toastr";
import { AuthService } from "shared/services/auth.service";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,

    NgxDatatableModule,
    MatAutocompleteModule,

    ConfirmationPopoverModule.forRoot({
      confirmButtonType: "danger",
      cancelButtonType: "dark"
    }),
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left"
    }),
    FeaturesModule,
    LocationModule,
    LoadingSpinnerModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class AdminLayoutModule {}
