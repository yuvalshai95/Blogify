import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IBackendErrors } from '../../interfaces/backend-errors.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bl-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorMessagesComponent implements OnInit {
  public errorMessages: string[] = [];
  @Input() backendErrors: IBackendErrors = {};

  constructor() { }

  public ngOnInit(): void {
    this.parseBackendErrors();
  }

  public parseBackendErrors(): void {
    this.errorMessages = Object.keys(this.backendErrors || {}).map((name: string) => {
      const messages = this.backendErrors[name].join(' ');
      return `${name} ${messages}`;
    });
  }

}
