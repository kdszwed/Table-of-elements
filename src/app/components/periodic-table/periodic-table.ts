import { Component, inject } from '@angular/core';
import { ElementStore } from '../../stores/element-store';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgFor } from '@angular/common';
import { PeriodicElement } from '../../models/element.model';
import { EditDialogComponent } from '../edit-dialog/edit-dialog';

@Component({
  selector: 'periodic-table',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './periodic-table.html',
})
export class PeriodicTableComponent {
  private store = inject(ElementStore);
  private dialog = inject(MatDialog);

  elements = this.store.filteredElements;
  displayedColumns = ['position', 'name', 'weight', 'symbol', 'edit'];

  private filterTimeout: any;

  onFilterChange(value: string) {
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.store.setFilter(value);
    }, 2000);
  }

  openEditDialog(element: PeriodicElement) {
    const ref = this.dialog.open(EditDialogComponent, {
      data: { ...element },
    });

    ref.afterClosed().subscribe(result => {
      if (result) this.store.updateElement(result);
    });
  }
}
