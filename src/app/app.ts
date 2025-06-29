import { Component } from '@angular/core';
import { PeriodicTableComponent } from './components/periodic-table/periodic-table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PeriodicTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Table-of-elements';
}
