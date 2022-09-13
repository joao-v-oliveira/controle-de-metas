import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Objetivo, Meta } from 'src/app/model/meta';
import { InicioService } from '../services/inicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public tituloinicio: string = 'Minhas Metas';
  public verDados: boolean = false;

  public listametas: Meta[]=[];

  constructor(private router: Router, private inicioService: InicioService) {
  }

  ngOnInit(): void {
    this.listametas = []=[];

    this.inicioService.getMetas().subscribe(
      (dados: any) => {
        this.listametas = dados;
        this.listametas.forEach((value) => {
          value.progresso = this.getValueProgess(value.valorobjetivo,value.valorinicial, value.objetivos);
        });
      }
    );
  }

  getValueProgess(vf: any, vi: any, objetivos: Objetivo[]=[]): number{
    if(objetivos.length > 0){
      let valorCompletado = 0;
      objetivos.forEach((value) => {
        if(value.completo){
          valorCompletado++;
        }
      });
      return Math.round(((valorCompletado/objetivos.length) * 100));
    }else{
      return (100 - Math.round(((vf-vi) / vf) * 100));
    }
  }
}
