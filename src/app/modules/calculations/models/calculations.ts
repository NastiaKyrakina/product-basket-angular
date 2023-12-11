export enum PhysicalActivityLevel {
  lowest = 1,
  low,
  medium,
  high,
  highest
}

export enum Sex {
  Male = 'M',
  Female = 'F',
}

export interface ICalculationsUser {
  sex: Sex;
  years: number;
  height: number;
  weight: number;
  activityLevel: PhysicalActivityLevel;
}

export interface ICalculations {
  user: ICalculationsUser;
  term: number;
  maxSum: number;
  diet: IDiet;
}

export interface IDiet {
  id: number;
  name: string;
  description: string;
  carbMin: number;
  carbMax: number;
  protMin: number;
  protMax: number;
  fatsMin: number;
  fatsMax: number;
}

export interface IBasketData {
  days: number;
  sum: number;
}
