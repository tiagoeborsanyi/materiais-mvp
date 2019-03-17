import React, { Component } from 'react'

class Visualizacao extends Component {
  render() {
      console.log(this.props);
      const id = this.props.location.hash.slice(1)
    return (
      <div>
        <h1>Visualiza um item: {id}</h1>
      </div>
    )
  }
}

export default Visualizacao;