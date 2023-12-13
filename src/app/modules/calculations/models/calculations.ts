export enum ActivityLevel {
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

export interface IUserParams {
  sex: Sex;
  years: number;
  height: number;
  weight: number;
  activityLevel: ActivityLevel;
}

export interface ICalculations {
  user: IUserParams;
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
