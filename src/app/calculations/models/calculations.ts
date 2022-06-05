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
}

export interface IBasketData {
  days: number;
  sum: number;
}
