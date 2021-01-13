import { Component, OnInit } from '@angular/core';
import { PokedataService } from 'src/app/services/pokedata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public limit: number = 0;

  constructor(
    private dataService: PokedataService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  async getPokemon() {
    try {
      // Petición para saber el numero total de pokemones
      await this.dataService.getPokemons(this.limit)
        .then(count => this.limit = count.count);
    } catch (error) {
      console.log('Ha ocurrido un error con el servicio PokeApi:');
      console.log(error);
    }
  }
}
