import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'pokemones',
    loadChildren: () => import('./modules/pokemons/pokemons.module').then(m => m.PokemonsModule)
  },
  {
    path: 'sobre-pokedex',
    loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }



// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
// import { AboutComponent } from './modules/about/about.component';
// import { HomeComponent } from './modules/home/home.component';
// import { PokemonDetailComponent } from './modules/pokemons/pages/pokemon-detail/pokemon-detail.component';
// import { PokemonsComponent } from './modules/pokemons/pages/pokemons/pokemons.component';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'sobre-pokedex', component: AboutComponent },
//   { path: 'pokemones', component: PokemonsComponent },
//   { path: 'pokemon/:id', component: PokemonDetailComponent },
//   { path: '**', pathMatch: 'full', redirectTo: '' }
// ];

// @NgModule({
//   // Configuración de redirección "{ onSameUrlNavigation: 'reload' }"
//   imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
