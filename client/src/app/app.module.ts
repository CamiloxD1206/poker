import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtomicModule } from './atomicDesign/atomic.module';
import { AtomsModule } from './atomicDesign/atoms/atoms.module';
import { PagesModule } from './pages/pages.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import {OverlayModule} from '@angular/cdk/overlay';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AtomicModule,
    AtomsModule,
    PagesModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    OverlayModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
