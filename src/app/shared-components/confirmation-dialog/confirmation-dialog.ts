import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.css',
})
export class ConfirmationDialog {
  @Input() title: string = '';
  @Input() body: string = '';

  @Output() confirm = new EventEmitter<boolean>();

  confirmDelete(isconfirmed: boolean) {
    this.confirm.emit(isconfirmed);
  }
}
