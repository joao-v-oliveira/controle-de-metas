import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  public tituloinicio: string = '';
  public verDados: boolean = false;

  constructor() {
    this.tituloinicio = 'Minhas Metas'
  }

  ngOnInit(): void {
  }

}
