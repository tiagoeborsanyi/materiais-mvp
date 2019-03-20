import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios-order';

import classes from './Visualizacao.css';

class Visualizacao extends Component {

    state = {
        item: {},
        update: true
    }

    deleteItem = (id) => {
        axios.delete(`/api/item/${id}`)
            .then(res => {
                console.log(res);
                if (res.data.success) {
                    this.props.history.push('/');
                }
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        console.log('didMount')
        if (this.state.update) {
            const id = this.props.location.hash.slice(1);
            axios.get(`/api/item/${id}`)
            .then(res => {
                this.setState({item: res.data, update: false});
                console.log(res);
            })
            .catch(err => console.log(err));
        }
    }
    componentDidUpdate() {
        console.log('update');
        
    }


    render() {
      const id = this.props.location.hash.slice(1);
      //console.log(this.state.item)
      const objItem = {...this.state.item};
      console.log(objItem.model)
        return (
        <div className={classes.Container}>
            <div className={classes.image}>
                <img className={classes.image__item} src={this.state.item.imagem ? require(`../../../assests/${this.state.item.imagem}`) : require('../../../assests/images/no-photo.png')} alt="Interruptor de luz" />
                <div className={classes.image__text}>
                    <p>Qtd. Estoque</p>
                    <p>1080</p>
                    <p><Link to="/">Historico Estoque</Link></p>
                    <p><Link to="/">Historico Guias</Link></p>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.content__botao}>
                    <button>Alterar Estoque</button>
                    <Link to={{
                    pathname: "/edita",
                    hash: this.props.location.hash
                    }}>Editar</Link>
                    <button onClick={() => this.deleteItem(id)}>Excluir</button>
                </div>
                <p><span>Nome: </span>{this.state.item.name}</p>
                <div className={classes.item__texto}>
                    <p><span>Modelo: </span>{this.state.item.model}</p>
                    <p><span>Marca: </span>{this.state.item.brand}</p>
                </div>
                <p><span>Especificação: </span>{this.state.item.especification}</p>
                <p><span>Código referencia: </span>{this.state.item.codrefproduct}</p>
                <div className={classes.item__texto}>
                    <p><span>Tipo Embalagem: </span>{this.state.item.packingtype}</p>
                    <p><span>Qtd. Embalagem: </span>{this.state.item.qtdpacking}</p>
                </div>
                <p><span>descrição: </span>{this.state.item.descrition}</p>
                <p><span>Observação: </span>{this.state.item.observation}</p>
            </div>
        </div>
        )
    }
}

export default Visualizacao;