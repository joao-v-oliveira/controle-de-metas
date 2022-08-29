import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-expansion',
  templateUrl: './painel-expansion.component.html',
  styleUrls: ['./painel-expansion.component.scss']
})
export class PainelExpansionComponent implements OnInit {

  @Input() listametas!: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
