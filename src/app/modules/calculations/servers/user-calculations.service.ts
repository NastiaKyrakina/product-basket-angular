import { Injectable } from '@angular/core';
import { IUserParams, ActivityLevel, Sex } from '../models/calculations';

const ENERGY_GENDER = {
  [Sex.Male]: 5,
  [Sex.Female]: -161,
}

const Activity = {
  [ActivityLevel.lowest]: 1.2,
  [ActivityLevel.low]: 1.375,
  [ActivityLevel.medium]: 1.55,
  [ActivityLevel.high]: 1.725,
  [ActivityLevel.highest]: 1.9,
}

@Injectable({
  providedIn: 'root'
})
export class UserCalculationsService {

  // calculate daily energy by the Mifflin-San Geor formula
  getDailyEnergy(inputValues: IUserParams): number {
    let energyAmount =
      (10 * inputValues.weight) + (6.25 * inputValues.height)
      - (5 * inputValues.years)
      + ENERGY_GENDER[inputValues.sex];

    const kkalPerDay = Math.round(this.calculateWithActivityLevel(energyAmount, inputValues.activityLevel));
    return kkalPerDay;
  }
  // calculate daily energy with activity level
  private calculateWithActivityLevel(energy: number, level: ActivityLevel): number {
    return Activity[level] * energy;
  }

  // calculate body index mass
  getBMI(userData: IUserParams): number {
    return +(userData.weight / Math.pow(userData.height / 100, 2)).toFixed(2);
  }
}
