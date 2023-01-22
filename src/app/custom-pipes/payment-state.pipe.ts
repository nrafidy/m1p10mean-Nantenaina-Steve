import { Pipe, PipeTransform } from '@angular/core';
import { Payment } from '../models/Deposit.model';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'paymentState'})
export class PaymentStatePipe implements PipeTransform {
  transform(value: Payment): string {
    switch(value){
      case 'pending':
        return 'Non payé';
      case 'done':
        return 'Payé';
      default:
        return 'En attente confirmation';
    }
  }
}
