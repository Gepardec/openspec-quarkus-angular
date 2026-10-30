import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

import { EnclosureStore } from '@gpdc-zoo/enclosures/data/enclosure.store';

@Component({
  selector: 'app-enclosure-overview',
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterLink,
    TranslocoPipe,
  ],
  templateUrl: './enclosure-overview.html',
  styleUrl: './enclosure-overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnclosureOverviewComponent implements OnInit {
  protected readonly enclosureStore = inject(EnclosureStore);

  ngOnInit(): void {
    this.enclosureStore.loadEnclosures();
  }
}
