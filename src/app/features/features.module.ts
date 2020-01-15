import { LoadingSpinnerModule } from "./../../shared/loading/loading-spinner.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { RouterModule } from "@angular/router";
import { IncorporationActComponent } from "./incorporation-act/incorporation-act.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { CategoryComponent } from "./category/category.component";
import { CategoryFormComponent } from "./category/category-form/category-form.component";
import { SubCategoryComponent } from "./category/sub-category/sub-category.component";
import { EmployeeComponent } from "./employee/employee.component";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule, MatInputModule } from "@angular/material";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    CategoryComponent,
    CategoryFormComponent,
    SubCategoryComponent,
    EmployeeComponent,
    IncorporationActComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: "danger",
      cancelButtonType: "dark"
    }),

    LoadingSpinnerModule,
    NgxDatatableModule,
    MatAutocompleteModule,
    MatInputModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left"
    })
  ],
  exports: [
    CategoryComponent,
    CategoryFormComponent,
    SubCategoryComponent,
    EmployeeComponent,
    IncorporationActComponent
  ]
})
export class FeaturesModule {}
