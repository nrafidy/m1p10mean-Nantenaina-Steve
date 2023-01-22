import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { compare, rotate, SortDirection, SortEvent } from '../interfaces/sort.interface';


@Directive({
	selector: 'th[sortable]',
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class SortableHeader {
	@Input() sortable: string = '';
	@Input() direction: SortDirection = '';

	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}

@Component({
  selector: 'app-sortable-table',
  templateUrl: './sortable-table.component.html',
  styleUrls: ['./sortable-table.component.scss']
})
export class SortableTableComponent {
  originalData = [];
  sortedData = [];

	@ViewChildren(SortableHeader)
  headers!: QueryList<SortableHeader>;

	sort({ column, direction }: SortEvent): void {
		// resetting other headers
		// this.headers.forEach((header) => {
		// 	if (header.sortEvent.column !== column) {
		// 		header.sortEvent.direction = '';
		// 	}
		// });

		// // sorting countries
		// if (direction === '' || column === '') {
		// 	this.sortedData = this.originalData;
		// } else {
		// 	this.sortedData = [...this.originalData].sort((a, b) => {
		// 		const res = compare(a[column], b[column]);
		// 		return direction === 'asc' ? res : -res;
		// 	});
		// }
	}
}
