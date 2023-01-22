import { Injectable } from '@angular/core';
import { Repair } from 'src/app/models/Repair.model';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  constructor() { }

  getRepairs(): Repair[]{
    return [
      {ID:'1', name:"Remplacement disque d'embrayage", state:"todo", amount:100000, payment:'pending', type:'repair'},
      {ID:'2', name:"Redressage carrosserie", state:"in_progress", amount:120000, payment:'done', type:'repair'},
      {ID:'3', name:"Nettoyage injecteur", state:"done", amount:150000, payment:'pending', type:'repair'},

      {ID:'4', name:"Changement huile moteur", state:"todo", amount:150000, payment:'done', type:'maintenance'},
      {ID:'5', name:"Purge des freins", state:"in_progress", amount:150000, payment:'pending', type:'maintenance'},
      {ID:'6', name:"Changement plaquettes de frein", state:"done", amount:150000, payment:'pending', type:'maintenance'},

      {ID:'7', name:"Diagnostique ABS", state:"todo", amount:150000, payment:'pending', type:'diagnostic'},
      {ID:'8', name:"Lecture données calculateur", state:"in_progress", amount:150000, payment:'pending', type:'diagnostic'},
      {ID:'9', name:"Tune ECU", state:"done", amount:150000, payment:'done', type:'diagnostic'},
    ];
  }
}
