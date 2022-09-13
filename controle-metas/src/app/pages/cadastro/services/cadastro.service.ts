import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meta } from 'src/app/model/meta';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  public URL = "http://localhost:3000/";

  public header = {
    "Content-Type": "application/json"
  }

  constructor(private http: HttpClient) { }

  postMeta(body: any){
    return this.http.post(`${this.URL}metas`,JSON.stringify(body), {headers: this.header});
  }

  putMeta(id: number,body: any){
    return this.http.put(`${this.URL}metas/${id}`,JSON.stringify(body), {headers: this.header});
  }

  postMetaPromisse(body: any){
    const promisse = new Promise<Meta>((resolve, reject) => {
      if(body.valorinicial < 0){
        reject('O valor inicial precisa ser um valor positivo ou zero(0)!');
      }else{
        localStorage.setItem('metaLocalStorage', JSON.stringify(body));
        resolve(body);
      }
    });
    return promisse;
  }

  getMeta(id: number){
    return this.http.get(`${this.URL}metas/${id}`, {headers: this.header});
  }
}
