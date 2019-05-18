import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import externalActions from '../../actions/externalActions';

const DetailPage = ({ food }) => {
  const {
    protein,
    lipidTot,
    sugarTot,
    carbohydrt,
    energKcal,
    servingSize,
    shortDesc,
  } = food;
  return (
    <div className="detail-page">
      <h2>{shortDesc}</h2>
      <h3>Serving size {servingSize} g:</h3>
      {sugarTot ? <div>Sugars: {sugarTot} g</div> : <div>No sugar</div>}
      {carbohydrt ? <div>Carbs: {carbohydrt} g</div> : <div>No Carbs</div>}
      {protein ? <div>Protein: {protein} g</div> : <div>No Protein</div>}
      {lipidTot ? <div>Fat: {lipidTot} g</div> : <div>No fat</div>}
      <div>Calories: {energKcal}</div>
    </div>
  );
}


const mapStateToProps = ({ data }, { match: { params: { foodId }}}) => ({
  food: data[foodId]
})

const mapDispatchToProps = (dispatch) => ({
  externalActions: bindActionCreators(externalActions, dispatch),
})

export default connect(mapStateToProps)(DetailPage);