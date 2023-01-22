export interface SortEvent {
	column: string;
	direction: SortDirection;

}

export type SortDirection = 'asc' | 'desc' | '';

export const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };
