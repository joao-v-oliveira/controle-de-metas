import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-painel-expansion',
  templateUrl: './painel-expansion.component.html',
  styleUrls: ['./painel-expansion.component.scss']
})
export class PainelExpansionComponent implements OnInit {

  @Input() listametas!: any[];

  constructor() { }

  ngOnInit(): void {
    this.listametas = []=[];
  }

  getFormatDate(data:string): string{
    let newData = moment(data).format('DD/MM/YYYY');
    return newData;
  }
}
