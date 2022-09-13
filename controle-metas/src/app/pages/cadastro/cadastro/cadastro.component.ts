import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CadastroService } from '../services/cadastro.service';
import { Objetivo, Meta } from '../../../model/meta';

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

  public metaId: any;
  public meta = new Meta();

  public objdescricao = new FormControl('');

  public formMeta: FormGroup;

  public objetivos: Objetivo[]=[];

  public tipoMeta: boolean = false;

  constructor(private router: Router,private toastr: ToastrService, private cadastroService: CadastroService,
    private activatedRoute : ActivatedRoute) {
    this.formMeta = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
      inicio: new FormControl(null, Validators.required),
      previsao: new FormControl(null, Validators.required),
      descricao: new FormControl('', Validators.required),
      tipometa: new FormControl(false),
      valorinicial: new FormControl(null),
      valorobjetivo: new FormControl(null),
      objetivos: new FormControl(null),
    })
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.metaId = params['metaId'];
    });

    if(this.metaId != 'null' && this.metaId != 'undefined'){
      this.cadastroService.getMeta(this.metaId).subscribe(
        (dados: any) => {
          this.meta = dados;
          this.tipoMeta = this.meta.tipometa;
          this.formMeta = new FormGroup({
            nome: new FormControl(this.meta.titulo, [Validators.required, Validators.minLength(8)]),
            inicio: new FormControl(null, Validators.required),
            previsao: new FormControl(null, Validators.required),
            descricao: new FormControl(this.meta.descricao, Validators.required),
            tipometa: new FormControl(this.meta.tipometa),
            valorinicial: new FormControl(this.meta.valorinicial),
            valorobjetivo: new FormControl(this.meta.valorobjetivo),
          });
          this.objetivos = this.meta.objetivos;
          this.meta.progresso = this.getValueProgess(this.meta.valorobjetivo, this.meta.valorinicial,this.objetivos);

          this.setDate(moment(this.meta.datainicio), 1);
          this.setDate(moment(this.meta.previsaotermino), 2);

          if(!this.tipoMeta){
            if(this.meta.valorinicial.toString().search(/[.]/g) === -1){
              this.formMeta.get('valorinicial')?.setValue(this.meta.valorinicial.toString() + '00');
            }
            this.formatValor(1);
            if(this.meta.valorobjetivo.toString().search(/[.]/g) === -1){
              this.formMeta.get('valorobjetivo')?.setValue(this.meta.valorobjetivo.toString() + '00');
            }
            this.formatValor(2);
          }
        }
      );
    }
  }

  ngOnDestroy() {
    this.formMeta.reset();
  }

  validaCampo(key: string){
    if(!this.formMeta.get(key)?.valid && this.formMeta.get(key)?.value != ''){
      this.toastr.warning('Corrija o campo para ficar dentro dos padrões','Atenção');
    }
  }

  salvarMeta(){
    let progress = this.getValueProgess(
      this.formMeta.get('valorobjetivo')?.value != null ? this.getFloat(this.formMeta.get('valorobjetivo')?.value) : null,
      this.formMeta.get('valorinicial')?.value != null ? this.getFloat(this.formMeta.get('valorinicial')?.value) : null,
      this.objetivos);

    let body = {
      "titulo": this.formMeta.get('nome')?.value,
      "datainicio": this.getFormatDateSave(this.formMeta.get('inicio')?.value),
      "previsaotermino": this.getFormatDateSave(this.formMeta.get('previsao')?.value),
      "descricao": this.formMeta.get('descricao')?.value,
      "tipometa": this.tipoMeta,
      "valorinicial": this.formMeta.get('valorinicial')?.value != null ? this.getFloat(this.formMeta.get('valorinicial')?.value) : null,
      "valorobjetivo": this.formMeta.get('valorobjetivo')?.value != null ? this.getFloat(this.formMeta.get('valorobjetivo')?.value) : null,
      "objetivos": this.objetivos.length > 0 ? this.objetivos : [],
      "progresso": this.meta != null ? progress : null,
      "status": this.meta != null ? (progress < 100 ? 'Em progresso' : 'Finalizado') : 'Em progresso',
    }

    console.log(progress);

    this.cadastroService.postMetaPromisse(body)
        .then(() => {
          if(this.metaId != 'null' && this.metaId != 'undefined'){
            this.cadastroService.putMeta(this.metaId, body).subscribe();
            this.toastr.success('Meta atualizada com sucesso','Sucesso');
          }else{
            this.cadastroService.postMeta(body).subscribe();
            this.toastr.success('Meta incluída com sucesso','Sucesso');
          }
        })
        .catch(() => {
          this.toastr.error('Erro ao tentar incluir uma meta, tente novamente!','Erro');
        })
        .finally(() => {
          setTimeout(()=>{
            this.router.navigate(['/inicio']);
          }, 10)
        });

  }

  getFormatDateSave(data:string): string{
    let newData = moment(data).format('YYYY-MM-DD');

    return newData;
  }

  addObjetivo(){
    console.log(this.objdescricao.value);
    if(this.objdescricao.value != '' && this.objdescricao.value != null){
      let objetivo = new Objetivo();

      objetivo.completo = false;
      objetivo.descricao = this.objdescricao.value;

      this.objetivos.push(objetivo);

      this.objdescricao.setValue('');
    }else{
      this.toastr.warning('Descreva seu objetivo antes de incluir','Atenção');
    }
  }

  formatValor(campo: number){
    if(campo == 1){
      let valorFomatado = this.formMeta.get('valorinicial')?.value;
      valorFomatado = this.limpaValor(valorFomatado);
      this.formMeta.get('valorinicial')?.setValue(valorFomatado);
    }else{
      let valorFomatado = this.formMeta.get('valorobjetivo')?.value;
      valorFomatado = this.limpaValor(valorFomatado);
      this.formMeta.get('valorobjetivo')?.setValue(valorFomatado);
    }
  }

  limpaValor(valor: string): string{
    let valorSemVirgula = valor.toString().search(/[,]/gi) !== -1 ? valor.toString().replace(/[^0-9]/gi,'') : valor.toString();
    valor = valorSemVirgula.toString().search(/[.]/g) !== -1 ? valorSemVirgula.toString().replace(/[^0-9]/gi,'') : valorSemVirgula.toString();
    if(valor.length == 3){
      valor = valor.replace(/(\d{1})(\d{2})/g, '$1.$2');
    }else if(valor.length == 4){
      valor = valor.replace(/(\d{2})(\d{2})/g, '$1.$2');
    }else if(valor.length == 5){
      valor = valor.replace(/(\d{3})(\d{2})/g, '$1.$2');
    }else if(valor.length == 6){
      valor = valor.replace(/(\d{1})(\d{3})(\d{2})/g, '$1,$2.$3');
    }else if(valor.length == 7){
      valor = valor.replace(/(\d{2})(\d{3})(\d{2})/g, '$1,$2.$3');
    }else if(valor.length == 8){
      valor = valor.replace(/(\d{3})(\d{3})(\d{2})/g, '$1,$2.$3');
    }else if(valor.length == 9){
      valor = valor.replace(/(\d{1})(\d{3})(\d{3})(\d{2})/g, '$1,$2,$3.$4');
    }else if(valor.length == 10){
      valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{2})/g, '$1,$2,$3.$4');
    }

    return valor;
  }

  setDate(dateMoment: any, campo: number){
    if(campo == 1){
      this.formMeta.get('inicio')?.setValue(dateMoment);
    }else{
      this.formMeta.get('previsao')?.setValue(dateMoment);
    }
  }

  getFloat(valorString: string){
    let regra = /,/;
    var value = valorString.search(regra);
    if(value != -1){
      valorString = valorString.toString().replace(/,/gi, '');
      let valorFloat = parseFloat(valorString);
      return valorFloat;
    }else{
      return parseFloat(valorString).toFixed(2);
    }
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
