import { Deposit } from "./Deposit.model";
import { User } from "./User.model";

export class Car{
  constructor(
    public ID: string,
    public color: string,
    public make: string,
    public model: string,
    public vin: string,
    public deposits: Deposit[]
  ){}
}
