import { AuthService } from "shared/services/auth.service";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";

import { AgmCoreModule } from "@agm/core";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoadingSpinnerModule } from "shared/loading/loading-spinner.module";

@NgModule({
  imports: [
    HttpClientModule,

    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY"
    }),
    LoadingSpinnerModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left"
    })
  ],
  declarations: [AppComponent, AdminLayoutComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
