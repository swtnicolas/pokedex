import { Component, OnInit } from '@angular/core';
import { PokedataService } from 'src/app/services/pokedata.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']

})
export class PokemonsComponent implements OnInit {

  private limit: number = 0;
  public pokemons: any[] = [];
  public pokemons2: any[] = [];
  public inputKey: string = '';

  // Variable estatica
  public pokemonsPerPage: number = 60;

  // Paginador
  public length: number = 0;
  public lowValue: number = 0;
  public highValue: number = this.pokemonsPerPage;
  public pageSize: number = this.highValue;
  public pageSizeOptions: any[] = [this.highValue, this.highValue * 2, this.highValue * 3];

  constructor(
    private dataService: PokedataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  async getPokemon() {
    try {
      // Si la lista no esta almacenada en el LocalStorage, se hace la petición HTTP
      if (!localStorage.getItem('PokemonList')) {
        // Primera petición para saber el numero total de pokemones
        await this.dataService.getPokemons(this.limit)
          .then(count => this.limit = count.count)
        // Total de pokemones se iguala al nuevo limite para proxima solicitud 
        this.length = this.limit;
        await this.dataService.getPokemons(this.limit)
          .then(pokemons => this.pokemons = pokemons.results)
        this.pokemons.forEach((item: any, i: number) => {
          item.id = i + 1;
          item.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`;
        });
        localStorage.setItem('PokemonList', JSON.stringify(this.pokemons));
        // console.log('Guardado en Local Storage');
        // console.log(this.pokemons);
        // Si la lista esta almacenada en el LocalStorage, se recupera
      } else {
        this.pokemons = JSON.parse(localStorage.getItem('PokemonList')!);
        // console.log('Recuperado del Local Storage');
        this.length = this.pokemons.length;
        // console.log(this.pokemons);
      }
    } catch (error) {
      console.log('Ha ocurrido un error con el servicio PokeApi:');
      console.log(error);
    }
  }

  getPaginatorData(event: PageEvent) {
    window.scroll(0, 0);
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
  }

  searchPokemon(poke: string): any {
    window.scroll(0, 0);
    // Resetea el paginador al entrar en la busqueda
    this.lowValue = 0;
    this.highValue = this.pokemonsPerPage;

    this.inputKey = poke
    let pokemonSearch: any[] = [];
    poke = poke.toLowerCase();
    for (let pokemon of this.pokemons) {
      let name = pokemon.name.toLowerCase();
      let id = pokemon.id.toString();
      if (name.indexOf(poke) >= 0 || id.indexOf(poke) >= 0) {
        pokemonSearch.push(pokemon)
      }
    }
    this.pokemons2 = pokemonSearch;
  }

  onPokemon(pokemon: any) {
    this.router.navigate(['/pokemon', pokemon.id])
  }
}