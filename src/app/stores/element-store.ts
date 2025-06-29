import { Injectable, computed, signal } from '@angular/core';
import { PeriodicElement } from '../models/element.model';

const STORAGE_KEY = 'element_data';

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Injectable({ providedIn: 'root' })
export class ElementStore {
  private elements = signal<PeriodicElement[]>([]);
  private filterText = signal<string>('');

  readonly filteredElements = computed(() => {
    const query = this.filterText().toLowerCase().trim();
    if (!query) return this.elements();
    return this.elements().filter(el =>
      Object.values(el).some(val =>
        val.toString().toLowerCase().includes(query)
      )
    );
  });

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const data = stored ? JSON.parse(stored) : ELEMENT_DATA;
    setTimeout(() => this.elements.set(data), 1000);
  }

  updateElement(updated: PeriodicElement) {
    this.elements.update(list => {
      const newList = list.map(el =>
        el.position === updated.position ? updated : el
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
      return newList;
    });
  }

  setFilter(value: string) {
    this.filterText.set(value);
  }
}
