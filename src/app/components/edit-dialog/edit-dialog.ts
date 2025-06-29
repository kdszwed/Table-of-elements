import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatIconModule,
  ],
  template: `
    <h2 mat-dialog-title>Edytuj pierwiastek</h2>
    <mat-dialog-content>
      <mat-form-field>
        <mat-label>Nazwa</mat-label>
        <input matInput [(ngModel)]="data.name" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Symbol</mat-label>
        <input matInput [(ngModel)]="data.symbol" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Waga</mat-label>
        <input matInput type="number" [(ngModel)]="data.weight" />
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="center">
      <button mat-raised-button color="accent" mat-dialog-close>
        <mat-icon>close</mat-icon>
        Anuluj
      </button>
      <button mat-raised-button color="accent" (click)="save()">
        <mat-icon>save</mat-icon>
        Zapisz
      </button>
    </mat-dialog-actions>
  `,
})
export class EditDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save() {
    this.dialogRef.close(this.data);
  }
}
