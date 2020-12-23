import { Component, OnInit } from '@angular/core';
import { PokedataService } from 'src/app/services/pokedata.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']

})
export class PokemonsComponent implements OnInit {

  limit: number = 0;
  pokemons: any[] = [];

  length: number = 0;
  lowValue: number = 0;
  highValue: number = 12;
  pageSize: number = this.highValue;
  pageSizeOptions: any[] = [this.highValue, this.highValue * 2, this.highValue * 3];

  constructor(
    private dataService: PokedataService
  ) {
  }

  ngOnInit(): void {
    this.getPokemon();
  }

  async getPokemon() {
    try {
      if (!localStorage.getItem('PokemonList')) {
        await this.dataService.getPokemons(this.limit)
          .then(count => this.limit = count.count)
        this.length = this.limit;
        await this.dataService.getPokemons(this.limit)
          .then(pokemons => this.pokemons = pokemons.results)
        this.pokemons.forEach((item: any, i: number) => {
          item.id = i + 1;
          item.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png`;
        });
        localStorage.setItem('PokemonList', JSON.stringify(this.pokemons));
        console.log('Guardado en Local Storage');
        console.log(this.pokemons);
      } else {
        this.pokemons = JSON.parse(localStorage.getItem('PokemonList')!);
        console.log('Recuperado del Local Storage');
        this.length = this.pokemons.length;
        console.log(this.pokemons);
      }
    } catch (error) {
      console.log('Ha ocurrido un error con el servicio PokeApi:');
      console.log(error);
    }
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    window.scroll(0, 0);
    return event;
  }
}