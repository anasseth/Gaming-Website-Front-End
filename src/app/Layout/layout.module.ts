import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSearchFilterModule } from 'ng-search-filter';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HorizontalScrollMenuModule } from 'ngx-horizontal-scroll-menu';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent
  ],
  imports: [
    TranslateModule.forChild(),
    CommonModule,
    LayoutRoutingModule,
    MatToolbarModule,
    MatIconModule,
    HorizontalScrollMenuModule,
    NgSearchFilterModule,
    HttpClientModule,
    TranslateModule,
    NgxSpinnerModule
  ],
})
export class LayoutModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}