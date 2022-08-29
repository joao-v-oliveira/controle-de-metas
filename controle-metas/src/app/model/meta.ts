export class Meta{
  nome: string='';
  datainicio: string='';
  previsaotermino: string='';
  descricao: string='';
  tipometa: number=1;
  valorinicial: number=0;
  valorobjetivo: number=0;
  objetivos: Objetivo[]=[];
  status: boolean=false;
}

export class Objetivo{
  descricao: string='';
  completo: boolean=false;
}
