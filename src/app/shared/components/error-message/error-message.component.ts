import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bl-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class ErrorMessageComponent implements OnInit {
  @Input() message: string = 'Something went wrong';
  constructor() {}

  ngOnInit() {}
}
