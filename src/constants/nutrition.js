export const nutritionLabels = {
  protein: 'Protein (g)',
  lipidTot: 'Fat (g)',
  sugarTot: 'Sugar (g)',
  carbohydrt: 'Carbohydrates (g)',
  energKcal: 'Calories',
  shortDesc: 'Food Name',
  servingSize: 'Serving Size (g)',
  alcohol: 'Alcohol (g)',
}

export const totals = foodlist => foodlist.reduce((acc, { food={}, servings }) => {
  // const food = foodId || {};
  const protein = food.protein || 0;
  const lipidTot = food.lipidTot || 0;
  const carbohydrt = food.carbohydrt || 0;
  const sugarTot = food.sugarTot || 0;
  const energKcal = food.energKcal || 0;
  const alcohol = food.alcohol || 0;
  return {
    protein: acc.protein + protein * servings,
    lipidTot: acc.lipidTot + lipidTot * servings,
    carbohydrt: acc.carbohydrt + carbohydrt * servings,
    sugarTot: acc.sugarTot + sugarTot * servings,
    energKcal: acc.energKcal + energKcal * servings,
    alcohol: acc.alcohol + alcohol * servings,
  };
}, {
  protein: 0,
  lipidTot: 0,
  carbohydrt: 0,
  sugarTot: 0,
  energKcal: 0,
  alcohol: 0,
})