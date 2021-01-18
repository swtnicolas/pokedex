import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

import { APP_INITIALIZER } from '@angular/core';
import { UiStyleToggleService } from "./core/services/configStyles/ui-style-toggle.service";
import { LocalStorageService } from "./core/services/configStyles/local-storage.service";
import { PokedataService } from './core/services/pokeApi/pokedata.service';

export function themeFactory(themeService: UiStyleToggleService) {
  return () => themeService.setThemeOnStart();
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // MatProgressSpinnerModule,
    MatSlideToggleModule
  ],
  providers: [
    UiStyleToggleService,
    LocalStorageService,
    PokedataService,
    { provide: APP_INITIALIZER, useFactory: themeFactory, deps: [UiStyleToggleService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




















// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { AppRoutingModule } from './app-routing.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import { ImgPreloadDirective } from './shared/directives/img-preload.directive';
// import { CustomMatPaginatorIntl } from './modules/pokemons/pages/pokemons/CustomPaginatorConfiguration';
// import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// import { AppComponent } from './app.component';
// import { HeaderComponent } from './core/header/header.component';
// import { HomeComponent } from './modules/home/home.component';
// import { PokemonsComponent } from './modules/pokemons/pages/pokemons/pokemons.component';
// import { PokemonDetailComponent } from './modules/pokemons/pages/pokemon-detail/pokemon-detail.component';
// import { FooterComponent } from './core/footer/footer.component';
// import { AboutComponent } from './modules/about/about.component';
// import { HighlightPipe } from './shared/pipes/highlight.pipe';

// import { APP_INITIALIZER } from '@angular/core';
// import { UiStyleToggleService } from "./core/services/configStyles/ui-style-toggle.service";
// import { LocalStorageService } from "./core/services/configStyles/local-storage.service";

// export function themeFactory(themeService: UiStyleToggleService) {
//   return () => themeService.setThemeOnStart();
// }

// @NgModule({
//   declarations: [
//     AppComponent,
//     HeaderComponent,
//     HomeComponent,
//     PokemonsComponent,
//     PokemonDetailComponent,
//     ImgPreloadDirective,
//     FooterComponent,
//     AboutComponent,
//     HighlightPipe
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     BrowserAnimationsModule,
//     MatPaginatorModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatAutocompleteModule,
//     MatProgressSpinnerModule,
//     MatSlideToggleModule
//   ],
//   providers: [
//     UiStyleToggleService,
//     LocalStorageService,
//     { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
//     { provide: APP_INITIALIZER, useFactory: themeFactory, deps: [UiStyleToggleService], multi: true }
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
