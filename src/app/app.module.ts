import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ImgPreloadDirective } from './directive/img-preload.directive';
import { CustomMatPaginatorIntl } from '../CustomPaginatorConfiguration';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { HighlightPipe } from './pipes/highlight.pipe';



import { APP_INITIALIZER } from '@angular/core';
import { UiStyleToggleService } from "./services/ui-style-toggle.service";
import { LocalStorageService } from "./services/local-storage.service";

export function themeFactory(themeService: UiStyleToggleService) {
  return () => themeService.setThemeOnStart();
}







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PokemonsComponent,
    PokemonDetailComponent,
    ImgPreloadDirective,
    FooterComponent,
    AboutComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule
  ],
  providers: [
    UiStyleToggleService,
    LocalStorageService,
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    { provide: APP_INITIALIZER, useFactory: themeFactory, deps: [UiStyleToggleService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
