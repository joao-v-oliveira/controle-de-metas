import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from 'src/app/model/meta';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public tituloinicio: string = '';
  public verDados: boolean = false;

  public metaexemplo1 = {
    nome: "Comprar Casa",
    datainicio: '2022-08-20',
    previsaotermino: '2023-12-31',
    descricao: 'Comprar uma casa',
    tipometa: 1,
    valorinicial: 5000,
    valorobjetivo: 190000,
    objetivos: [],
    status: true,
  }
  public metaexemplo2 = {
    nome: "Comprar Carro",
    datainicio: '2022-08-08',
    previsaotermino: '2022-12-31',
    descricao: 'Comprar uma carro',
    tipometa: 1,
    valorinicial: 5000,
    valorobjetivo: 45000,
    objetivos: [],
    status: true,
  }

  public listametas: Meta[]=[];

  constructor(private router: Router) {
    this.tituloinicio = 'Minhas Metas'

    this.listametas.push(this.metaexemplo1);
    this.listametas.push(this.metaexemplo2);
  }

  ngOnInit(): void {
  }

  criarMeta(){

  }

}
