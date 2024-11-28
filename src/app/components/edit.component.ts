import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-editable',
  inputs: ['value'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  outputs: ['valueChangeEvents: valueChange'],
  templateUrl: './edit.component.html',
})
export class EditableComponent {
  @Input() type: string = 'text';
  @Input() fullCliente: any;
  @Input() currency: boolean = false;
  @Input() textarea: boolean = false;

  public isEditing: boolean;
  public pendingValue: string;
  public clienteValue: any;
  public value!: string;
  public valueChangeEvents: EventEmitter<string>;

  public valueCleinteChangeEvents: EventEmitter<any>;

  constructor() {
    this.isEditing = false;
    this.pendingValue = '';
    this.clienteValue = null;

    this.valueChangeEvents = new EventEmitter();
    this.valueCleinteChangeEvents = new EventEmitter();
  }

  public cancel(): void {
    this.isEditing = false;
  }

  public edit(): void {
    this.pendingValue = this.value;
    this.isEditing = true;
  }

  public processChanges(): void {
    // If the value actually changed, emit the change but don't change the local
    // value - we don't want to break unidirectional data-flow.
    if (this.pendingValue !== this.value) {
      this.valueChangeEvents.emit(this.pendingValue);
    }

    this.isEditing = false;
  }

  processCliente() {
    if (this.pendingValue !== this.value) {
      this.valueCleinteChangeEvents.emit(this.clienteValue);
    }
  }
}
