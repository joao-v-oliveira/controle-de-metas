export class Meta{
  idmeta: number=0;
  titulo: string='';
  datainicio: string='';
  previsaotermino: string='';
  descricao: string='';
  tipometa: boolean = false;
  valorinicial: number=0;
  valorobjetivo: number=0;
  objetivos: Objetivo[]=[];
  progresso: number=0;
}

export class Objetivo{
  descricao: string='';
  completo: boolean=false;
}
