import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';

import { ImgPreloadDirective } from './directive/img-preload.directive';
import { CustomPaginator } from './components/pokemons/CustomPaginatorConfiguration';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PokemonsComponent,
    PokemonDetailComponent,
    ImgPreloadDirective,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
