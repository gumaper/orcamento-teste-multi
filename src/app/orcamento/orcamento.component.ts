import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { jsPDF } from 'jspdf';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import html2canvas from 'html2canvas';
import { EditableComponent } from '../components/edit.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'orcamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    EditableComponent,
  ],
  templateUrl: './orcamento.component.html',
  styleUrls: ['./orcamento.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrcamentoComponent implements OnInit {
  title = 'pedido';

  form: FormGroup = new FormGroup({});

  clienteForm: FormGroup = new FormGroup({});

  pedido: string = '000' + Math.floor(Math.random() * 65536).toString();

  dataHoje: Date = new Date();

  vendedor: string = 'vendedor';

  clienteNome: FormControl = new FormControl();

  public isEditing: boolean = false;
  public pendingValue: string = '';
  public value!: string;
  public valueChangeEvents: EventEmitter<string> = new EventEmitter<string>();

  gerandoPdf: boolean = false;

  cliente: any = {
    nome: 'Cliente nome/empresa',
    numero: '312312321',
    endereco: 'Rua tal',
    cidade: 'Campo Grande - MS',
    cep: '79560-000',
    cnpj: '123123123000178',
    cpf: '12332112333',
    fazenda: 'nome fazenda',
    email: 'email',
    inscricao: 'inscricao',
    estado: 'MS',
    bairro: 'bairro',
    prazo: 'prazo',
    vendedor: 'vendedor',
    tipoPagamento: 'Boleto',
  };

  mercadoriasSolupan: any[] = [
    {
      codigo: '00511',
      descricao: 'MARANDU 50 V.C CONVENCIONAL',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '00512',
      descricao: 'MARANDU 80 V.C GRAFITADA',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '00513',
      descricao: 'MARANDU 80 V.C PURA',
      unid: 'KG',
      quantidade: 1,
      valor: 50,
    },
    {
      codigo: '00514',
      descricao: 'MARANDU 80 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 12,
    },

    {
      codigo: '00611',
      descricao: 'PIATÃ 50 V.C CONVENCIONAL',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '00612',
      descricao: 'PIATÃ 80 V.C GRAFITADA',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '00613',
      descricao: 'PIATÃ 80 V.C PURA',
      unid: 'KG',
      quantidade: 1,
      valor: 50,
    },
    {
      codigo: '00614',
      descricao: 'PIATÃ 80 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 12,
    },

    {
      codigo: '00711',
      descricao: 'DECUMBENS 50 V.C CONVENCIONAL',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '00712',
      descricao: 'DECUMBENS 80 V.C GRAFITADA',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '00713',
      descricao: 'DECUMBENS 80 V.C PURA',
      unid: 'KG',
      quantidade: 1,
      valor: 50,
    },
    {
      codigo: '00714',
      descricao: 'DECUMBENS 80 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 12,
    },

    {
      codigo: '00811',
      descricao: 'MG - 4   50 V.C CONVENCIONAL',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '00812',
      descricao: 'MG - 4   80 V.C GRAFITADA',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '00813',
      descricao: 'MG - 4   80 V.C PURA',
      unid: 'KG',
      quantidade: 1,
      valor: 50,
    },
    {
      codigo: '00814',
      descricao: 'MG - 4   80 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 12,
    },

    {
      codigo: '00911',
      descricao: 'MG - 5    50 V.C CONVENCIONAL',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '00912',
      descricao: 'MG - 5    80 V.C GRAFITADA',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '00913',
      descricao: 'MG - 5    80 V.C PURA',
      unid: 'KG',
      quantidade: 1,
      valor: 50,
    },
    {
      codigo: '00914',
      descricao: 'MG - 5    80 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 12,
    },

    {
      codigo: '01011',
      descricao: 'RUZIZIENSIS 50 V.C CONVENCIONAL',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '01012',
      descricao: 'RUZIZIENSIS 80 V.C GRAFITADA',
      unid: 'KG',
      quantidade: 100,
      valor: 0,
    },
    {
      codigo: '01013',
      descricao: 'RUZIZIENSIS 80 V.C PURA',
      unid: 'KG',
      quantidade: 1,
      valor: 50,
    },
    {
      codigo: '01014',
      descricao: 'RUZIZIENSIS 80 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 12,
    },

    {
      codigo: '01288',
      descricao: 'LLANERO 80 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '02555',
      descricao: 'HUMIDICOLA 60 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '02654',
      descricao: 'MOMBAÇA 80 V.C GRAFITADA',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },
    {
      codigo: '02655',
      descricao: 'MOMBAÇA 80 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '02701',
      descricao: 'TANZANIA 80 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '02809',
      descricao: 'ARUANA 80 V.C REVESTIDA',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '02900',
      descricao: 'MASSAI 80 V.C PREMIUM REVEST',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '03151',
      descricao: 'NABO FORRAGEIRO',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '03152',
      descricao: 'AVEIA',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '03153',
      descricao: 'AVEIA PRETA',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '03154',
      descricao: 'TRIGO MOURISCO',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '03155',
      descricao: 'FEIJÃO GUANDY',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },

    {
      codigo: '03156',
      descricao: 'CAPIM SUDÃO',
      unid: 'KG',
      quantidade: 1,
      valor: 0,
    },
  ];

  items: any[] = [];

  total: any = {
    sub: 0,
    desconto: 0,
    acrecimo: 0,
    servico: 0,
    total: 0,
  };

  observacao: string = '';

  valorTotalItems: number = 0;

  adicionarItem() {
    this.items.push({
      codigo: '1',
      descricao: 'descricao',
      unid: 'KG',
      quantidade: 1,
      valor: 50,
    });
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder
  ) {}

  // ---
  // PUBLIC METHODS.
  // ---

  // I cancel the editing of the value.
  public cancel(): void {
    this.isEditing = false;
  }

  // I enable the editing of the value.
  public edit(): void {
    this.pendingValue = this.value;
    this.isEditing = true;
  }

  // I process changes to the pending value.
  public processChanges(): void {
    // If the value actually changed, emit the change but don't change the local
    // value - we don't want to break unidirectional data-flow.
    if (this.pendingValue !== this.value) {
      this.valueChangeEvents.emit(this.pendingValue);
    }

    this.isEditing = false;
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({});

    this.clienteForm = this._formBuilder.group({
      nome: ['Nome empresa/cliente'],
      endereco: [''],
      email: [''],
      contato: [''],
    });

    this.calcSubTotal();
  }

  gerarPDF() {
    if (this.gerandoPdf) return;

    this.gerandoPdf = true;

    setTimeout(() => {
      const doc = new jsPDF('p', 'pt', 'a4', true);
      const divToPrint = document.getElementById('pdf') as any;

      // Aumentando a resolução do html2canvas
      html2canvas(divToPrint, { scale: 3 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'pt', 'a4', true);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Adicionando a imagem no PDF com a resolução melhorada
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 600, '', 'FAST');

        // Salvando o PDF
        pdf.save(this.pedido + '.pdf');

        setTimeout(() => {
          this.gerandoPdf = false;
          this._changeDetectorRef.markForCheck();
        }, 2000);
      });
    }, 1000);
  }

  onSelectMercadoria(mercadoria: any, tipo: number) {
    console.log(mercadoria);
    console.log(this.items);
    this.items.push(this.mercadoriasSolupan[mercadoria.target.value]);

    this.calcSubTotal();
  }

  public saveProjectName(
    objeto: string,
    tipo: string,
    novoValor: string,
    indice: number
  ): void {
    this.calcSubTotal();
    if (novoValor && objeto === 'cliente') this.cliente[tipo] = novoValor;

    if (novoValor && objeto === 'item') {
      this.items[indice][tipo] = novoValor;

      this.calcSubTotal();
    }

    if (novoValor && objeto === 'total') {
      this.total.total = 0;
      this.total[tipo] = parseFloat(novoValor);

      this.calcSubTotal();
    }
    if (novoValor && objeto === 'pedido') this.pedido = novoValor;

    if (novoValor && objeto === 'observacao') this.observacao = novoValor;
  }

  removeItem(indice: number) {
    this.items.splice(indice, 1);

    this.calcSubTotal();
  }

  calcSubTotal() {
    this.valorTotalItems = 0;

    this.items.forEach(
      (el) => (this.valorTotalItems += el.quantidade * el.valor)
    );

    let total: number =
      this.total.acrecimo + this.total.servico + this.valorTotalItems;

    this.total.total = total - (total * this.total.desconto) / 100;
  }
}
