import { LoginComponent } from "./../../auth/login/login.component";
import { CategoryFormComponent } from "./../../features/category/category-form/category-form.component";
import { GovernateComponent } from "./../../location/governate/governate.component";
import { Routes } from "@angular/router";

import { SubCategoryComponent } from "app/features/category/sub-category/sub-category.component";
import { EmployeeComponent } from "app/features/employee/employee.component";
import { IncorporationActComponent } from "app/features/incorporation-act/incorporation-act.component";
import { CityComponent } from "app/location/city/city/city.component";
import { CommercialRegisterComponent } from "app/location/comercial-register/commercial-register/commercial-register.component";
import { ShahrAqaryComponent } from "app/location/shahr-aqary/shahr-aqary.component";
import { RegionComponent } from "app/location/region/region.component";

export const AdminLayoutRoutes: Routes = [
  // {
  //   path: '',
  //   children: [ {
  //     path: 'dashboard',
  //     component: DashboardComponent
  // }]}, {
  // path: '',
  // children: [ {
  //   path: 'userprofile',
  //   component: UserProfileComponent
  // }]
  // }, {
  //   path: '',
  //   children: [ {
  //     path: 'icons',
  //     component: IconsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'notifications',
  //         component: NotificationsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'maps',
  //         component: MapsComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'typography',
  //         component: TypographyComponent
  //     }]
  // }, {
  //     path: '',
  //     children: [ {
  //         path: 'upgrade',
  //         component: UpgradeComponent
  //     }]
  // }
  { path: "login", component: LoginComponent },
  { path: "category", component: CategoryFormComponent },
  { path: "sub-category", component: SubCategoryComponent },
  { path: "employee", component: EmployeeComponent },
  { path: "incorporation-act", component: IncorporationActComponent },
  { path: "city", component: CityComponent },
  { path: "commercial-register", component: CommercialRegisterComponent },
  { path: "governate", component: GovernateComponent },
  { path: "shahr-aqary", component: ShahrAqaryComponent },
  { path: "region", component: RegionComponent }
];
