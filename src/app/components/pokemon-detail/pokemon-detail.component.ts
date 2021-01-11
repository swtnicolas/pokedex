import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { PokedataService } from 'src/app/services/pokedata.service';
import { ColorType } from 'src/interfaces';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, AfterViewChecked {

  public pokemonDetail: any;
  public pokemonSpecies: any;

  public pokemonDescription: string[] = [];

  public evolutionChain1: any[] = [];
  public evolutionChain2: any[] = [];
  public evolutionChain3: any[] = [];

  private color1: string = 'ffffff';
  private color2: string = '707070';
  public backgroundColor1: string = this.color1;
  public backgroundColor2: string = `linear-gradient(180deg, #${this.color1} 34%, #${this.color2} 100%)`;
  private contador: number = 0;

  public loading: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: PokedataService,
    private navigation: NavigationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getPokemonsSpecies();
    this.getPokemonDetail();
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  async getPokemonDetail() {
    try {
      await this.dataService.getPokemonsDetail(this.activatedRoute.snapshot.params.id)
        .then(pokemonDetail => this.pokemonDetail = pokemonDetail);
      this.pokemonDetail.height = this.pokemonDetail.height / 10;
      this.pokemonDetail.weight = this.pokemonDetail.weight / 10;
      console.log(this.pokemonDetail);


    } catch (error) {
      this.router.navigateByUrl('/pokemones');
    }
  }

  async getPokemonsSpecies() {
    try {
      await this.dataService.getPokemonsSpecies(this.activatedRoute.snapshot.params.id)
        .then(pokemonsSpecies => {
          this.pokemonSpecies = pokemonsSpecies

          this.pokemonDescription = pokemonsSpecies.flavor_text_entries
            .filter((flavor: any) => flavor.language.name === 'es')
            .map((item: any) => item.flavor_text)

          let idx = pokemonsSpecies.evolution_chain.url
          idx = idx.slice(41, 47);

          this.pokemonSpecies.capture_rate = ((this.pokemonSpecies.capture_rate * 100) / 255);



          this.dataService.getEvolutionChain(idx)
            .then(evolutionChain => {
              let evoData = evolutionChain.chain;

              let numberOfEvolutions = evoData.evolves_to.length;
              this.evolutionChain1.push({
                "name": evoData.species.name,
                "id": parseInt(evoData.species.url.slice(42, 47).replace('/', '')),
                "evolution": 1
              });

              if (evoData.evolves_to.length) {
                for (let i = 0; i < numberOfEvolutions; i++) {
                  this.evolutionChain2.push({
                    "name": evoData.evolves_to[i].species.name,
                    "id": parseInt(evoData.evolves_to[i].species.url.slice(42, 47).replace('/', '')),
                    "from": evoData.species.name,
                    "evolution": 2
                  });

                  if (evolutionChain.chain.evolves_to[i]) {
                    let evoData2 = evolutionChain.chain.evolves_to[i];
                    let numberOfEvolutions2 = evoData2.evolves_to.length;

                    if (numberOfEvolutions2 > 0) {
                      for (let ix = 0; ix < numberOfEvolutions2; ix++) {
                        this.evolutionChain3.push({
                          "name": evoData2.evolves_to[ix].species.name,
                          "id": parseInt(evoData2.evolves_to[ix].species.url.slice(42, 47).replace('/', '')),
                          "from": evoData.evolves_to[i].species.name,
                          "evolution": 3
                        });
                      }
                    }
                    evoData2 = evoData2.evolves_to[0];
                  }
                }
              }
              evoData = evoData.evolves_to[0];
            })
        });
      console.log(this.evolutionChain1);
      console.log(this.evolutionChain2);
      console.log(this.evolutionChain3);
      console.log(this.pokemonSpecies);
      this.loading = false;
    } catch (error) {
      // this.router.navigateByUrl('/pokemones');
    }
  }

  back(): void {
    this.navigation.back();
  }

  onPokemon(pokemon: any) {
    if (pokemon.id !== this.pokemonDetail.id) {
      this.router.navigate(['/pokemon/', pokemon.id]);
    }
    console.log(pokemon.id);

  }

  getTypeColor(type: string): any {
    if (type) {
      const Color: any = ColorType;
      this.contador += 1;
      if (this.contador === 1) {
        this.color1 = Color[type];
      }
      if (this.contador === 2) {
        this.color2 = Color[type];
        this.backgroundColor1 = this.color1;
        this.backgroundColor2 = `linear-gradient(135deg, #${this.color1} 20%, #${this.color2} 80%)`;
        this.cdr.detectChanges();
      }
      return '#' + Color[type];
    }
  }
}
