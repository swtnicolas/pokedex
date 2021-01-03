import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'sobre-pokedex', component: AboutComponent },
  { path: 'pokemones', component: PokemonsComponent },
  // TODO| Para pasarle parametros a la url "/:parametro"
  { path: 'pokemon/:id', component: PokemonDetailComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
