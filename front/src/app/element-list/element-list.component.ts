import { NgClass, NgFor } from '@angular/common';
import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../toast/toast.service';

// Manejo de Elementos
import { Elemento } from './elemento';
import { ElementoService } from './elemento.service';

export type SortColumn = keyof Elemento | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

type CompType = string | number | boolean;

const compare = (v1: CompType, v2: CompType) => ((v1 < v2) ? 1 : 0) - ((v1 > v2) ? 1 : 0);

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: 'app-element-list',
  standalone: true,
  imports: [
    NgbdSortableHeader,
    FormsModule,
    NgFor,
    NgClass,
    RouterLink,
    NgbDropdownModule
  ],
  templateUrl: './element-list.component.html',
  styleUrl: './element-list.component.css'
})
export class ElementListComponent {
  elementos!: Elemento[];
  sortDirection: SortDirection = '';
  sortColumn: SortColumn = '';
  totalElementos!: number;
  page = 1;
  pageCount = 1;
  selectionState!: string;
  searchName = '';
  elementoToDelete!: Elemento;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

  constructor(
    private elementoService: ElementoService,
    private toastService: ToastService,
    private modalService: NgbModal
    ) {
    this.refreshData();
  }

  refreshData() {
    this.elementoService.getElementos().subscribe((data: Elemento[]) => {
      // Asignar un id único a cada elemento
      const elementosConId = data.map((el, index) => ({ ...el, id: index + 1 }));

      let elementos = elementosConId.filter((o) => o.nombre.toLowerCase().includes(this.searchName.toLowerCase()));

      this.totalElementos = elementos.length;

      // sort elementos
      if (this.sortDirection !== '' && this.sortColumn !== '') {
        elementos = [...elementos].sort((a, b) => {
          const valueA = a[this.sortColumn as keyof Elemento];
          const valueB = b[this.sortColumn as keyof Elemento];
          if (typeof valueA === 'string' || typeof valueA === 'number' || typeof valueA === 'boolean') {
            const res = compare(valueA, valueB as CompType);
            return this.sortDirection === 'asc' ? res : -res;
          }
          return 0; // No se puede comparar, considerar igual
        });
      }

      this.pageCount = Math.max(1, Math.ceil(elementos.length / 10));

      elementos = elementos.slice((this.page - 1) * 10, (this.page - 1) * 10 + 10);

      // Añadir propiedad checked a cada elemento
      elementos = elementos.map(el => ({ ...el, checked: false }));

      if (elementos.some((o) => !o.checked)) {
        this.selectionState = 'none';
      }
      else if (elementos.every((o) => o.checked)) {
        this.selectionState = 'all';
      }
      else {
        this.selectionState = 'some';
      }

      this.elementos = elementos;
    });
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    for (const header of this.headers) {
      if (header.sortable !== column) {
        header.direction = '';
      }
    }

    this.sortColumn = column;
    this.sortDirection = direction;
    this.deseletAll();

    this.refreshData();
  }

  selectPage(i: number) {
    if (this.page !== i) {
      this.page = i;
      this.deseletAll();

      this.refreshData();
    }
  }

  nextPage() {
    if (this.page < this.pageCount) {
      this.page++;
      this.deseletAll();

      this.refreshData();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.deseletAll();

      this.refreshData();
    }
  }

  deseletAll() {
    this.elementos.forEach((o) => o.checked = false);
  }

  toggleSelectAll() {
    if (this.selectionState !== 'all') {
      this.elementos.forEach((o) => o.checked = true);
    }
    else {
      this.deseletAll();
    }

    this.refreshData();
  }

  onCheckboxChange() {
    this.refreshData()
  }

  deleteElemento() {
    this.toastService.showSuccessToast('Se ha eliminado el elemento ' + this.elementoToDelete.nombre);

    // Aquí eliminarías el elemento de la lista en tu backend y actualizarías la lista localmente
    // Ejemplo: this.elementos = this.elementos.filter((o) => o.id !== this.elementoToDelete.id);
    this.refreshData();
  }

  deleteSelectedElementos() {
    // Aquí eliminarías los elementos seleccionados de la lista en tu backend y actualizarías la lista localmente
    // Ejemplo: this.elementos = this.elementos.filter((o) => !o.checked);
    this.toastService.showSuccessToast('Se han eliminado los elementos seleccionados');
    this.refreshData();
  }

  search(name: string) {
    this.searchName = name;
    this.page = 1;

    this.refreshData();
  }

  openDeleteModal(id: number, content: TemplateRef<any>) {
    this.elementoToDelete = this.elementos.find((o) => o.id === id) as Elemento;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        this.deleteElemento();
      },
      (reason) => {
      },
    );
  }

  openDeleteSelectionModal(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        this.deleteSelectedElementos();
      },
      (reason) => {
      },
    );
  }

  trackById(index: number, item: Elemento): number {
    return item.id;
  }
}
