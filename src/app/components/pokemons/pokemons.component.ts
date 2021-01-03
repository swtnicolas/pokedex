import { Component, OnInit } from '@angular/core';
import { PokedataService } from 'src/app/services/pokedata.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
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
  public pokemonsPerPage1: number = 60;
  public pokemonsPerPage2: number = 60;

  // Paginador
  public length1: number = 0;
  public pageIndex1: number = 0;
  public lowValue1: number = this.pageIndex1 * this.pokemonsPerPage1;
  public highValue1: number = this.lowValue1 + this.pokemonsPerPage1;
  public pageSize1: number = this.pokemonsPerPage1;
  public pageSizeOptions1: any[] = [this.pokemonsPerPage1, this.pokemonsPerPage1 * 2, this.pokemonsPerPage1 * 3];

  public pageIndex2: number = 0;
  public lowValue2: number = this.pageIndex2 * this.pokemonsPerPage2;
  public highValue2: number = this.lowValue2 + this.pokemonsPerPage2;
  public pageSize2: number = this.pokemonsPerPage2;
  public pageSizeOptions2: any[] = [this.pokemonsPerPage1, this.pokemonsPerPage1 * 2, this.pokemonsPerPage1 * 3];

  // Estado del paginador (true = Paginador allList / false = Paginador searchList)
  public p1: boolean = true;

  // Autocompletar
  public control = new FormControl();
  public pokemonsNames: string[] = [];
  public filteredPokemons!: Observable<string[]>;

  // Progress Spinner
  public loading: boolean = true;

  constructor(
    private dataService: PokedataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.getPokemon();
    // Si existen los datos del paginador en sessionStorage, se recuperan y se limpian 
    if (sessionStorage.getItem('pokemonsPerPage1') && sessionStorage.getItem('pokemonsPerPage2') && sessionStorage.getItem('pageIndex1') && sessionStorage.getItem('pageIndex2') && sessionStorage.getItem('inputKey')) {
      this.pokemonsPerPage1 = JSON.parse(sessionStorage.getItem('pokemonsPerPage1')!);
      this.pokemonsPerPage2 = JSON.parse(sessionStorage.getItem('pokemonsPerPage2')!);
      this.pageIndex1 = JSON.parse(sessionStorage.getItem('pageIndex1')!);
      this.pageIndex2 = JSON.parse(sessionStorage.getItem('pageIndex2')!);
      this.pageSize1 = this.pokemonsPerPage1;
      this.pageSize2 = this.pokemonsPerPage2;
      this.lowValue1 = this.pageIndex1 * this.pokemonsPerPage1;
      this.highValue1 = this.lowValue1 + this.pokemonsPerPage1;
      this.lowValue2 = this.pageIndex2 * this.pokemonsPerPage2;
      this.highValue2 = this.lowValue2 + this.pokemonsPerPage2;
      sessionStorage.removeItem('pageIndex1');
      sessionStorage.removeItem('pageIndex2');
      sessionStorage.removeItem('pokemonsPerPage1');
      sessionStorage.removeItem('pokemonsPerPage2');
      this.inputKey = JSON.parse(sessionStorage.getItem('inputKey')!);
      sessionStorage.removeItem('inputKey');
      this.searchPokemon(this.inputKey);
    }
  }

  async getPokemon() {
    try {
      if (!localStorage.getItem('PokemonList')) {
        // Si la lista no esta almacenada en el localStorage, se hacen las peticiones HTTP
        // Primera petición para saber el numero total de pokemones
        await this.dataService.getPokemons(this.limit)
          .then(count => this.limit = count.count)
        // Total de pokemones se iguala al nuevo limite para proxima solicitud 
        this.length1 = this.limit;
        await this.dataService.getPokemons(this.limit)
          .then(pokemons => this.pokemons = pokemons.results)
        this.pokemons.forEach((item: any, i: number) => {
          item.id = i + 1;
          item.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`;
        });
        localStorage.setItem('PokemonList', JSON.stringify(this.pokemons));
      } else {
        // Si la lista esta almacenada en el localStorage, se recupera
        this.pokemons = JSON.parse(localStorage.getItem('PokemonList')!);
        this.length1 = this.pokemons.length;
      }
    } catch (error) {
      console.log('Ha ocurrido un error con el servicio PokeApi:');
      console.log(error);
    }
  }

  getPaginatorData(event: PageEvent) {
    window.scroll(0, 0);
    if (this.p1 === true) {
      this.pokemonsPerPage1 = event.pageSize;
      this.pageIndex1 = event.pageIndex;
      this.lowValue1 = event.pageIndex * event.pageSize;
      this.highValue1 = this.lowValue1 + event.pageSize;
    } else {
      this.pokemonsPerPage2 = event.pageSize;
      this.pageIndex2 = event.pageIndex;
      this.lowValue2 = event.pageIndex * event.pageSize;
      this.highValue2 = this.lowValue2 + event.pageSize;
    }
  }

  // Metodo del formulario
  searchPokemon(poke: string): any {
    // Autocompletar
    this.filteredPokemons = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    // Resetea paginador al entrar/volver a la busqueda
    this.lowValue2 = this.pageIndex2 * this.pokemonsPerPage2;
    this.highValue2 = this.lowValue2 + this.pokemonsPerPage2;

    // Busqueda
    this.inputKey = poke
    let pokemonSearch: any[] = [];
    let names: string[] = []
    poke = poke.toLowerCase();
    for (let pokemon of this.pokemons) {
      let name = pokemon.name.toLowerCase();
      let id = pokemon.id.toString();
      if (name.indexOf(poke) >= 0 || id.indexOf(poke) >= 0) {
        names.push(pokemon.name);
        pokemonSearch.push(pokemon)
      }
    }
    // Validación del autocompletar, si se inserta un digito en el buscador
    // Para evitar duplicacion de sugerencia en el autocompletado cuando la busqueda encuentra al pokemon, se deshabilita el autocompletar cuando "pokemonSearch.length > 1"
    if (poke != '' && pokemonSearch.length > 1) {
      names.sort((a, b) => {
        // Ordena los resultados por nombre que coincida con la posición de la palabra clave en el nombre
        if (a.toLowerCase().indexOf(poke.toLowerCase()) > b.toLowerCase().indexOf(poke.toLowerCase())) {
          return 1;
        } else if (a.toLowerCase().indexOf(poke.toLowerCase()) < b.toLowerCase().indexOf(poke.toLowerCase())) {
          return -1;
        } else {
          if (a > b)
            return 1;
          else
            return -1;
        }
      });
      // Inserta lo que se esta buscando al principio
      names.unshift(poke);
      this.pokemonsNames = names;
    } else {
      this.pokemonsNames = [];
    }

    // Validación de la busqueda de pokemones
    if (poke != '') {
      this.pokemons2 = pokemonSearch;
      this.p1 = false;
    } else {
      this.pokemons2 = [];
      this.p1 = true;
    }
  }

  resetpage() {
    window.scroll(0, 0);
    this.pageIndex2 = 0;
  }

  imgLoading(): void {
    this.loading = false;
  }

  // Métodos del autocompletar
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.pokemonsNames.filter(pokemonsNames =>
      this._normalizeValue(pokemonsNames).includes(filterValue));
  }
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  // Se guardan los datos del paginador y se redirecciona al pokemon seleccionado. 
  onPokemon(pokemon: any) {
    sessionStorage.setItem('inputKey', JSON.stringify(this.inputKey));
    sessionStorage.setItem('pokemonsPerPage1', JSON.stringify(this.pokemonsPerPage1));
    sessionStorage.setItem('pokemonsPerPage2', JSON.stringify(this.pokemonsPerPage2));
    sessionStorage.setItem('pageIndex1', JSON.stringify(this.pageIndex1));
    sessionStorage.setItem('pageIndex2', JSON.stringify(this.pageIndex2));
    this.router.navigate(['/pokemon', pokemon.id])
  }
}