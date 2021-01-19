import { Component, OnInit } from '@angular/core';
import { PokedataService } from 'src/app/core/services/pokeApi/pokedata.service';
import { ErrorPokeApi } from 'src/app/shared/interfaces/pokeApi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public totalPokemons: number = 0;
  public error: ErrorPokeApi = {
    "status": false,
    "message": 'Ha ocurrido un problema con el servicio de PokeApi, inténtelo mas tarde'
  };

  constructor(
    private dataService: PokedataService
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  // Petición para saber el numero total de pokemones
  async getPokemon() {
    try {
      if (!sessionStorage.getItem('totalPokemons')) {
        await this.dataService.getPokemons(this.totalPokemons)
          .then(count => this.totalPokemons = count.count);
        sessionStorage.setItem('totalPokemons', JSON.stringify(this.totalPokemons));
      } else {
        this.totalPokemons = JSON.parse(sessionStorage.getItem('totalPokemons')!);
      }
    } catch (error) {
      console.log('Ha ocurrido un error con el servicio PokeApi:');
      console.log(error);
      this.error.status = true;
    }
  }
}
