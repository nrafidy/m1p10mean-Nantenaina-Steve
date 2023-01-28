import { Car } from "./Car.model";

export class User{
  constructor(
    public ID: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public type: UserType,
    public validationEmail: boolean,
    public cars: Car[],
    public access_token: string
  ){}
}

export type UserType = 'client' | 'res_atelier' | 'res_finance' | '';
