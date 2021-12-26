import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurveAnimationComponent } from './curve-animation/curve-animation.component';
import { CouruselSelectComponent } from './courusel-select/courusel-select.component';

@NgModule({
  declarations: [AppComponent, CurveAnimationComponent, CouruselSelectComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
