import { Component, OnInit } from '@angular/core';
import { PokedataService } from 'src/app/core/services/pokeApi/pokedata.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ErrorPokeApi } from 'src/app/shared/interfaces/pokeApi';
@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})

export class PokemonsComponent implements OnInit {

  public totalPokemons: number = 0;
  public pokemons: any[] = [];
  public pokemons2: any[] = [];

  // Paginador
  private initialPokemonsPerPage: number = 60;

  public pageSize1: number = this.initialPokemonsPerPage;
  public pageIndex1: number = 0;
  public lowValue1: number = this.pageIndex1 * this.pageSize1;
  public highValue1: number = this.lowValue1 + this.pageSize1;
  public pageSizeOptions1: any[] = [this.pageSize1, this.pageSize1 * 2, this.pageSize1 * 3];

  public pageSize2: number = this.initialPokemonsPerPage;
  public pageIndex2: number = 0;
  public lowValue2: number = this.pageIndex2 * this.pageSize2;
  public highValue2: number = this.lowValue2 + this.pageSize2;
  public pageSizeOptions2: any[] = [this.pageSize1, this.pageSize1 * 2, this.pageSize1 * 3];

  // Estado del paginador (true = Paginador allList / false = Paginador searchList)
  public p1: boolean = true;

  // Buscador
  public inputKey: string = '';
  private samekey: string = '';

  // Autocompletar
  public toHighlight: string = '';
  public control = new FormControl(this.inputKey);
  public pokemonsNames: string[] = [];
  public filteredPokemons!: Observable<string[]>;

  // Progress Spinner
  public loading: boolean = true;
  public error: ErrorPokeApi = {
    "status": false,
    "message": 'Ha ocurrido un problema con el servicio de PokeApi, inténtelo mas tarde'
  };

  constructor(
    private dataService: PokedataService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPokemon();
    // Si existen los datos del paginador en sessionStorage, se recuperan y se limpian 
    if (sessionStorage.getItem('pageSize1') && sessionStorage.getItem('pageSize2') && sessionStorage.getItem('pageIndex1') && sessionStorage.getItem('pageIndex2') && sessionStorage.getItem('inputKey')) {
      this.pageSize1 = JSON.parse(sessionStorage.getItem('pageSize1')!);
      this.pageSize2 = JSON.parse(sessionStorage.getItem('pageSize2')!);
      this.pageIndex1 = JSON.parse(sessionStorage.getItem('pageIndex1')!);
      this.pageIndex2 = JSON.parse(sessionStorage.getItem('pageIndex2')!);
      this.lowValue1 = this.pageIndex1 * this.pageSize1;
      this.highValue1 = this.lowValue1 + this.pageSize1;
      this.lowValue2 = this.pageIndex2 * this.pageSize2;
      this.highValue2 = this.lowValue2 + this.pageSize2;
      this.inputKey = JSON.parse(sessionStorage.getItem('inputKey')!);
      this.control = new FormControl(this.inputKey);
      this.searchPokemon(this.inputKey);
    }
  }

  async getPokemon() {
    try {
      // Si el total no esta almacenado en el sessionStorage
      if (!sessionStorage.getItem('totalPokemons')) {
        // Primera petición para total de pokemones
        await this.dataService.getPokemons(this.totalPokemons)
          .then(count => this.totalPokemons = count.count);
        sessionStorage.setItem('totalPokemons', JSON.stringify(this.totalPokemons));
      } else {
        // Si esta almacenado en el sessionStorage, se recupera
        this.totalPokemons = JSON.parse(sessionStorage.getItem('totalPokemons')!);
      }
      // Si la lista no esta almacenada en el sessionStorage
      if (!sessionStorage.getItem('PokemonList')) {
        // Petición para lista de pokemones
        await this.dataService.getPokemons(this.totalPokemons)
          .then(pokemons => this.pokemons = pokemons.results);
        this.pokemons.forEach((item: any, i: number) => {
          item.id = i + 1;
          item.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`;
        });
        sessionStorage.setItem('PokemonList', JSON.stringify(this.pokemons));
      } else {
        this.pokemons = JSON.parse(sessionStorage.getItem('PokemonList')!);
        this.totalPokemons = this.pokemons.length;
      }
      this.loading = false;
    } catch (error) {
      console.log('Ha ocurrido un error con el servicio PokeApi:');
      console.log(error);
      this.error.status = true;
    }
  }

  getPaginatorData(event: PageEvent) {
    window.scroll(0, 0);
    if (this.p1 === true) {
      this.pageSize1 = event.pageSize;
      this.pageIndex1 = event.pageIndex;
      this.lowValue1 = this.pageIndex1 * this.pageSize1;
      this.highValue1 = this.lowValue1 + this.pageSize1;
      sessionStorage.setItem('inputKey', JSON.stringify(this.inputKey));
      sessionStorage.setItem('pageSize1', JSON.stringify(this.pageSize1));
      sessionStorage.setItem('pageSize2', JSON.stringify(this.pageSize2));
      sessionStorage.setItem('pageIndex1', JSON.stringify(this.pageIndex1));
      sessionStorage.setItem('pageIndex2', JSON.stringify(this.pageIndex2));
    } else {
      this.pageSize2 = event.pageSize;
      this.pageIndex2 = event.pageIndex;
      this.lowValue2 = this.pageIndex2 * this.pageSize2;
      this.highValue2 = this.lowValue2 + this.pageSize2;
      sessionStorage.setItem('inputKey', JSON.stringify(this.inputKey));
      sessionStorage.setItem('pageSize1', JSON.stringify(this.pageSize1));
      sessionStorage.setItem('pageSize2', JSON.stringify(this.pageSize2));
      sessionStorage.setItem('pageIndex1', JSON.stringify(this.pageIndex1));
      sessionStorage.setItem('pageIndex2', JSON.stringify(this.pageIndex2));
    }
  }

  // Metodo del formulario
  searchPokemon(poke: string): any {
    this.inputKey = poke;
    poke = poke.toLowerCase();
    // Validacion para evitar busqueda en blanco
    if (poke != '' && poke) {
      // Validacion para evitar multiples busquedas
      if (poke !== this.samekey) {
        this.samekey = poke;
        this.p1 = false;
        let pokemonSearch: any[] = [];
        for (let pokemon of this.pokemons) {
          let name = pokemon.name.toLowerCase();
          let id = pokemon.id.toString();
          if (name.indexOf(poke) >= 0 || id.indexOf(poke) >= 0) {
            pokemonSearch.push(pokemon);
          }
        }
        this.pokemons2 = pokemonSearch;
      }
    } else {
      this.p1 = true;
    }
  }

  autocomplete(poke: string): any {
    // Llama al resto de metodos del autocompletar
    this.filteredPokemons = this.control.valueChanges.pipe(
      startWith(''),
      // Validación del autocompletar, si se inserta un digito en el buscador
      map(value => poke.length >= 1 ? this._filter(value) : [])
    );
    // Validacion para evitar busqueda en blanco
    if (poke != '') {
      // Validacion para evitar multiples busquedas
      if (poke !== this.toHighlight) {
        this.toHighlight = poke;
        let names: string[] = [];
        poke = poke.toLowerCase();

        for (let pokemon of this.pokemons) {
          let name = pokemon.name.toLowerCase();
          let id = pokemon.id.toString();
          if (name.indexOf(poke) >= 0 || id.indexOf(poke) >= 0) {
            names.push(pokemon.name);
          }
        }
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
        this.pokemonsNames = names;
      }
    }
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

  resetpage() {
    window.scroll(0, 0);
    this.pageIndex2 = 0;
    this.lowValue2 = this.pageIndex2 * this.pageSize2;
    this.highValue2 = this.lowValue2 + this.pageSize2;
    sessionStorage.setItem('inputKey', JSON.stringify(this.inputKey));
    sessionStorage.setItem('pageSize1', JSON.stringify(this.pageSize1));
    sessionStorage.setItem('pageSize2', JSON.stringify(this.pageSize2));
    sessionStorage.setItem('pageIndex1', JSON.stringify(this.pageIndex1));
    sessionStorage.setItem('pageIndex2', JSON.stringify(this.pageIndex2));
  }

  // Se guardan los datos del paginador y se redirecciona al pokemon seleccionado. 
  onPokemon(id: number) {
    sessionStorage.setItem('inputKey', JSON.stringify(this.inputKey));
    sessionStorage.setItem('pageSize1', JSON.stringify(this.pageSize1));
    sessionStorage.setItem('pageSize2', JSON.stringify(this.pageSize2));
    sessionStorage.setItem('pageIndex1', JSON.stringify(this.pageIndex1));
    sessionStorage.setItem('pageIndex2', JSON.stringify(this.pageIndex2));
    this.router.navigate(['/pokemones/', id]);
  }
}