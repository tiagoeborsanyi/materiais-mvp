import React, { Component } from 'react';
import axios from '../../axios-order';

import Aux from '../../hoc/Aux/Aux';
import DashboardItems from './DashboardItems/DashboardItems';
import classes from './Dashboard.css'

class Dashboard extends Component {
  state = {
    dash: [],
    noPhoto: 'images/no-photo.png'
  }

  componentDidMount () {
    axios.get('/api/item')
      .then(res => {
        // console.log(res.data);
        this.setState({dash: res.data});
      })
      .catch(err => console.log(err));
  }

  render() { 
    return (
      <Aux>
        <div className={classes.Dashboard}>
        {
          this.state.dash.map(item => (
            <DashboardItems
              key={item._id}
              id={item._id}
              nome={item.name}
              marca={item.brand}
              codref={item.codrefproduct}
              especificacao={item.specification}
              packunit={item.qtdpacking}
              stock={item.qtdestock}
              imagem={item.imagem ? item.imagem : this.state.noPhoto} />
          ))
        }
        </div>
      </Aux>
    )
  }
}

export default Dashboard;