import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  public URL = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getMetas(){
    return this.http.get(`${this.URL}metas`);
  }
}
