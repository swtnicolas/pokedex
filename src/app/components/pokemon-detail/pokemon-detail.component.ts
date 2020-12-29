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

  public pokemonDetail: any
  private color1: string = 'ffffff'
  private color2: string = '707070'
  public backgroundColor1: string = this.color1;
  public backgroundColor2: string = `linear-gradient(180deg, #${this.color1} 34%, #${this.color2} 100%)`;
  private contador: number = 0

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataService: PokedataService,
    private navigation: NavigationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    this.getPokemonDetail();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  async getPokemonDetail() {
    try {
      await this.dataService.getPokemonsDetail(this.activatedRoute.snapshot.params.id)
        .then(pokemonDetail => this.pokemonDetail = pokemonDetail)
      this.pokemonDetail.height = this.pokemonDetail.height / 10;
      this.pokemonDetail.weight = this.pokemonDetail.weight / 10;
    } catch (error) {
      if (error) {
        this.router.navigateByUrl('/pokemons');
      }
    }
  }

  back(): void {
    this.navigation.back()
  }

  getTypeColor(type: string): any {
    if (type) {
      const Color: any = ColorType;
      this.contador += 1
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
