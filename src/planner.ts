import * as ga from '../lib/ga'

export function getReturnPercentage(age: number) {
  if (age < 46) {
    return 10;
  } else if (age > 45 && age < 56) {
    return 9;
  } else if (age > 55 && age < 66) {
    return 7;
  } else if (age > 65 && age < 76) {
    return 6;
  }
  return 5;
}
class Planner {
  getFinancialPlan(ageOfDeath: number, age: number, expense: number, existingInvstment: number,
    retirementAge: number, yearlyIncrease: number, inflation: number) {
    if (typeof window !== 'undefined') {
      ga.event({
        action: "financial calculation",
        params: {
          ageOfDeath,
          age,
          expense,
          existingInvstment,
          retirementAge,
          yearlyIncrease,
          inflation
        }
      })
    }
    const ageArray = [];
    const expenseWithInflation: Map<number, number> = new Map();
    const savings: Map<number, number> = new Map();
    const contrubutions: Map<number, number> = new Map();
    expenseWithInflation.set(age, expense * 12);
    ageArray.push(age);
    for (let i = age + 1; i < ageOfDeath + 1; i++) {
      ageArray.push(i);
      expenseWithInflation.set(i, (expenseWithInflation.get(i - 1) || 0) * (1 + (inflation / 100)));
    }

    function calculateSavings() {
      let returnPercentage = getReturnPercentage(age);
      contrubutions.set(age, initialYearlySaving);
      savings.set(age, existingInvstment + initialYearlySaving * (1 + returnPercentage / 100));
      if (age < retirementAge) {
        for (let i = age + 1; i < retirementAge + 1; i++) {
          returnPercentage = getReturnPercentage(i);
          contrubutions.set(i, (contrubutions.get(i - 1) || 0) * (1 + yearlyIncrease / 100));
          const endOfYearSaving = (savings.get(i - 1) || 0) + (contrubutions.get(i) || 0);
          savings.set(i, (endOfYearSaving * (1 + returnPercentage / 100)))
        }
      }
      for (let i = retirementAge + 1; i < ageOfDeath + 1; i++) {
        returnPercentage = getReturnPercentage(i);
        const expenseAtAge = expenseWithInflation.get(i) || 0;
        const savingsAtAge = (savings.get(i - 1) || 0);
        savings.set(i, (savingsAtAge - expenseAtAge) * (1 + returnPercentage / 100));
      }
    }
    let initialYearlySaving = 100;
    while (!savings.get(ageOfDeath) || (savings.get(ageOfDeath) || 1) < 0) {
      initialYearlySaving *= 2;
      calculateSavings();
    }
    let found = false
    let start = initialYearlySaving / 2;
    let end = initialYearlySaving;

    do {
      initialYearlySaving = start + ((end - start) / 2);
      calculateSavings();
      if (Math.abs(savings.get(ageOfDeath) || 0) < 100 || start > end) {
        found = true;
      } else if ((savings.get(ageOfDeath) || 0) < 0) {
        start = initialYearlySaving + 1;
      } else {
        end = initialYearlySaving - 1;
      }
    } while (!found)
    return { ageArray, expenseWithInflation, savings, contrubutions };
  }
  formatToString(val: number = 0) {
    if (!val) {
      return '';
    }
    if (val >= 10000000) {
      return (val / 10000000).toFixed(2) + ' Cr';
    } else if (val >= 100000) {
      return (val / 100000).toFixed(2) + ' Lac';
    }
  }
  toLakhs(val: number = 0) {
    return Math.floor(val / 100000);
  }
  toCrs(val: number = 0) {
    return (val / 10000000);
  }

}
const planner = new Planner();
export default planner;