import React from 'react';

const AddFoodForm = (prop) => {
  const {
    userInputActions,
    externalActions,
    protein,
    lipidTot,
    sugarTot,
    carbohydrt,
    energKcal,
    shortDesc,
    servingSize,
  } = prop;
  return (
    <div>
      {[
        'protein',
        'lipidTot',
        'sugarTot',
        'carbohydrt',
        'energKcal',
        'shortDesc',
        'servingSize',
      ].map(key => (
        <div key={key} className="add-food-form">
          <span>{key}</span>
          <input
            type="text"
            value={prop[key]}
            onChange={evt => {
              const text = { [key]: evt.target.value };
              console.log(text);
              userInputActions.userSetText(text);
            }}
          />
        </div>
      ))}
    </div>
  )
};

export default AddFoodForm;