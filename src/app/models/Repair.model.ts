import { Payment } from "./Deposit.model";

export class Repair{
  constructor(
    public ID: string,
    public type: RepairType,
    public state: RepairState,
    public name: string,
    public amount: number,
    public payment: Payment,
  ){}
}

export type RepairType = 'repair' | 'maintenance' | 'diagnostic';

export type RepairState = 'todo' | 'in_progress' | 'done' | 'cancelled';
