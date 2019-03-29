import React, { Component } from 'react';
import axios from '../../axios-order';
import InfiniteScroll from 'react-infinite-scroll-component';

import Aux from '../../hoc/Aux/Aux';
import DashboardItems from './DashboardItems/DashboardItems';
import classes from './Dashboard.css'

class Dashboard extends Component {
  state = {
    dash: [],
    count: 3,
    start: 0,
    noPhoto: 'images/no-photo.png'
  }

  componentDidMount () {
    const { count, start } = this.state;
    axios.get(`/api/item?start=${start}&count=${count}`)
      .then(res => {
        // console.log(res.data);
        this.setState({dash: res.data});
      })
      .catch(err => console.log(err));
  }

  fetchItens = () => {
    const { count, start } = this.state;
    this.setState({start: count+start});
    axios.get(`/api/item?start=${start}&count=${count}`)
      .then(res => {
        this.setState({dash: this.state.dash.concat(res.data)});
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