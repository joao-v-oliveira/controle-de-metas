import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from 'src/app/model/meta';
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
    this.inicioService.getMetas().subscribe(
      (dados: any) => {
        this.listametas = dados;
      }
    );
  }

  ngOnInit(): void {

  }
}
