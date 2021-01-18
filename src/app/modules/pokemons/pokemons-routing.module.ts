import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PokemonsComponent
  },
  {
    path: ':id',
    component: PokemonDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PokemonsRoutingModule { }
