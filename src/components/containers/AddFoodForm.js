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
  servingSize: 'Serving Size (g)',
  alcohol: 'Alcohol (g)',
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
        processFood,
      } = this.props;

      return (
        <div className="add-food-form">
          <div className="row">
            <div className="title">{titles.shortDesc}</div>
            <div>
              <DebouncedInput
                value={this.props.shortDesc}
                onChange={value => userInputActions.userSetText({ shortDesc: value })}
                onEnter={() => processFood()}
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
            'alcohol',
          ].map(key => (
            <div key={key} className="row">
              <div className="title">{titles[key]}</div>
              <div>
                <DebouncedInput
                  value={this.props[key]}
                  onChange={value => userInputActions.userSetText({ [key]: value })}
                  onEnter={() => processFood()}
                  validate="^\d*$"
                  type="number"
                />
              </div>
            </div>
          ))}
          <div><button onClick={() => processFood()}>ADD</button></div>
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