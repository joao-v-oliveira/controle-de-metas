import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';

export const DATE_FORMAT = {
  parse: {
      dateInput: ['l', 'LL']
  },
  display: {
      dateInput: 'L',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT }
  ]
})
export class CadastroComponent implements OnInit {

  @Input() meta!: Meta;

  public formMeta: FormGroup;

  constructor(private router: Router,private toastr: ToastrService) {
    this.formMeta = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
      inicio: new FormControl(null, Validators.required),
      previsao: new FormControl(null, Validators.required),
      descricao: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.formMeta.reset();
  }

  validaCampo(key: string){
    if(!this.formMeta.get(key)?.valid && this.formMeta.get(key)?.value != ''){
      this.toastr.warning('Corrija o campo para ficar dentro dos padrões','Atenção');
    }
  }

  validaData(key: string){
    console.log(this.formMeta.get(key)?.value);
    if(this.formMeta.get(key)?.value != null){
      let data = this.formMeta.get(key)?.value;
      data = data.replace(/[^0-9]/g,'');

      console.log(data);
    }
  }

  salvarMeta(){
    let body = {
      "nome": this.formMeta.get('nome')?.value,
      "inicio": this.getFormatDateSave(this.formMeta.get('inicio')?.value),
      "previsao": this.getFormatDateSave(this.formMeta.get('previsao')?.value),
      "descricao": this.formMeta.get('descricao')?.value,
    }

    localStorage.setItem('metaLocalStorage', JSON.stringify(body));

    this.router.navigate(['/inicio']);
  }

  getFormatDateSave(data:string): string{
    let newData = moment(data).format('YYYY-MM-DD');

    return newData;
  }

}
