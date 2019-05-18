import React from 'react';
import PropTypes from 'prop-types';
import DebouncedInput from '../simple/DebouncedInput';

const titles = {
  protein: 'Protein (g)',
  lipidTot: 'Fat (g)',
  sugarTot: 'Sugar (g)',
  carbohydrt: 'Carbohydrates (g)',
  energKcal: 'Calories',
  shortDesc: 'Food Name',
  servingSize: 'Serving Size (g)'
}

class AddFoodForm extends React.Component {
  render() {
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
      } = this.props;

      const addFood = () => {
        externalActions.addFood({
          protein: Number(protein) || 0,
          shortDesc,
          lipidTot: Number(lipidTot) || 0,
          carbohydrt: Number(carbohydrt) || 0,
          servingSize: Number(servingSize) || 0,
          sugarTot: Number(sugarTot) || 0,
          energKcal: Number(energKcal) || 0,
        });
      }

      return (
        <div className="add-food-form">
          <div className="row">
            <div className="title">{titles.shortDesc}</div>
            <div>
              <DebouncedInput
                value={this.props.shortDesc}
                onChange={value => userInputActions.userSetText({ shortDesc: value })}
                onEnter={() => addFood()}
                type="text"
              />
            </div>
          </div>
          {[
            'servingSize',
            'energKcal',
            'protein',
            'lipidTot',
            'sugarTot',
            'carbohydrt',
          ].map(key => (
            <div key={key} className="row">
              <div className="title">{titles[key]}</div>
              <div>
                <DebouncedInput
                  value={this.props[key]}
                  onChange={value => userInputActions.userSetText({ [key]: value })}
                  onEnter={() => addFood()}
                  validate="^\d*$"
                  type="number"
                />
              </div>
            </div>
          ))}
          <div><button onClick={addFood}>ADD</button></div>
        </div>
      );

  }
}

 
AddFoodForm.propTypes = {
  userInputActions: PropTypes.object,
  externalActions: PropTypes.object,
  protein: PropTypes.string,
  lipidTot: PropTypes.string,
  sugarTot: PropTypes.string,
  carbohydrt: PropTypes.string,
  energKcal: PropTypes.string,
  shortDesc: PropTypes.string,
  servingSize: PropTypes.string,
}

export default AddFoodForm;