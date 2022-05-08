import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JewelleryShopComponent } from './jewellery-shop.component';

const routes: Routes = [
  { path: '', component: JewelleryShopComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JewelleryShopRoutingModule { }
