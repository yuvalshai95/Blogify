import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faFire, faGear, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'bl-top-bar-item',
  templateUrl: './top-bar-item.component.html',
  styleUrls: ['./top-bar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, CommonModule],
})
export class TopBarItemComponent implements OnInit {

  @Input() routerLink: string[] = ['/'];
  @Input() icon:IconDefinition = null as unknown as IconDefinition;
  @Input() text: string = '';
  @Input() imgPath: string | null = '';
  @Input() customClass: string = '';

  constructor() { }

  public ngOnInit(): void {
  }

}
