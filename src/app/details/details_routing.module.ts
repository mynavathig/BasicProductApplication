import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard } from "../_helpers/canDeactivate.guard";
import { DetailsComponent } from "./details.component";

const routes: Routes = [
  {
    path: '',
    component: DetailsComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }