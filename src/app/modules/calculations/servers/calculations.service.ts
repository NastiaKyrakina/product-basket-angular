import { Injectable } from '@angular/core';
import { ICalculationsUser, PhysicalActivityLevel, Sex } from '../models/calculations';

const ENERGY_GENDER = {
  [Sex.Male]: 5,
  [Sex.Female]: -161,
}

const Activity = {
  [PhysicalActivityLevel.lowest]: 1.2,
  [PhysicalActivityLevel.low]: 1.375,
  [PhysicalActivityLevel.medium]: 1.55,
  [PhysicalActivityLevel.high]: 1.725,
  [PhysicalActivityLevel.highest]: 1.9,
}

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor() { }

  // формула Міффлін-Сан Жеора
  getDailyCCalAmount(userData: ICalculationsUser): number {
    let energyPerDay =
      (10 * userData.weight) + (6.25 * userData.height)
      - (5 * userData.years)
      + ENERGY_GENDER[userData.sex];

    return Math.round(this.getActivityDependency(energyPerDay, userData.activityLevel));
  }

  //ІМТ = m:h2  індекс маси тіла
  getMIT(userData: ICalculationsUser): number {
    return +(userData.weight / Math.pow(userData.height / 100, 2)).toFixed(2);
  }


  private getActivityDependency(energyPerDay: number, activityLevel: PhysicalActivityLevel): number {
    return energyPerDay * Activity[activityLevel];
  }
}
