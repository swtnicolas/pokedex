import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsRoutingModule } from './pokemons-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';

import { CustomMatPaginatorIntl } from './pages/pokemons/CustomPaginatorConfiguration';
import { HighlightPipe } from 'src/app/shared/pipes/highlight.pipe';
import { ImgPreloadDirective } from '../../shared/directives/img-preload.directive';
import { ListComponent } from './components/list/list.component';
import { EvolutionsDataComponent } from './components/evolutions-data/evolutions-data.component';

@NgModule({
  declarations: [
    HighlightPipe,
    ImgPreloadDirective,
    PokemonDetailComponent,
    PokemonsComponent,
    ListComponent,
    EvolutionsDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    PokemonsRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
  ],
})
export class PokemonsModule { }
