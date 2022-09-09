import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  public URL = "http://localhost:3000/";

  public header = {
    "Content-Type": "application/json"
  }

  constructor(private http: HttpClient) { }

  postMeta(body:any){
    return this.http.post(`${this.URL}metas`,JSON.stringify(body), {headers: this.header})
  }
}
