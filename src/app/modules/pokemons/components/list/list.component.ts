import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() pokemons?: any[] = [];
  @Input() lowValue?: any;
  @Input() highValue?: any;
  @Output() id = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPokemon(id: number) {
    this.id.emit(id);
  }
}
