import { Repair } from "./Repair.model";

export class Deposit{
  constructor(
    public ID: string,
    public state: DepositState,
    public payment: Payment,
    public createdAt: number,
    public updatedAt: number,
    public repairs: Repair[]
  ){}
}

export type DepositState = 'deposit' | 'received' | 'done' | 'pending' | 'ready' | 'collected' | 'cancelled';

export type Payment = 'pending' | 'done';
