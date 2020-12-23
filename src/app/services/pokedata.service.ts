import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedataService {

  private url: string = 'https://pokeapi.co/api/v2';
  constructor(
    private http: HttpClient
  ) { }

  async getPokemons(limit: number): Promise<any> {
    return await this.http.get(`${this.url}/pokemon-species?limit=${limit}`)
      .toPromise();
  }

  getMoreData(name: string): Observable<object> {
    return this.http.get(`${this.url}/pokemon/${name}`);
  }
}
