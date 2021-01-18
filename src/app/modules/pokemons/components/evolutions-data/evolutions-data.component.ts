import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-evolutions-data',
  templateUrl: './evolutions-data.component.html',
  styleUrls: ['./evolutions-data.component.scss']
})
export class EvolutionsDataComponent implements OnInit {

  @Input() pokemon?: any;

  @Output() id = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  onPokemon(id: number) {
    this.id.emit(id);
  }
}
