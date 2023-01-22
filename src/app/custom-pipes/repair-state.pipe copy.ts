import { Pipe, PipeTransform } from '@angular/core';
import { RepairState } from '../models/Repair.model';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'repairState'})
export class RepairStatePipe implements PipeTransform {
  transform(value: RepairState): string {
    switch(value){
      case 'todo':
        return 'En attente';
      case 'in_progress':
        return 'En cours';
      case 'done':
        return 'Effectué';
      case 'cancelled':
        return 'Annulé';
      default:
        return 'En attente confirmation';
    }
  }
}
