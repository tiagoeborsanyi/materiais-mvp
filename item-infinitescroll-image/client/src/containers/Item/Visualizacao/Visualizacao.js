import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../axios-order';

import classes from './Visualizacao.css';

class Visualizacao extends Component {

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

  render() {
      // console.log(this.props);
      const id = this.props.location.hash.slice(1);
    return (
      <div className={classes.Container}>
        <div className={classes.image}>
            <img src={require(`../../../assests/images/no-photo.png`)} alt="Interruptor de luz" className={classes.image__item} />
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
            <p><span>Nome: </span>Conjunto Interruptor Simples</p>
            <div className={classes.item__texto}>
                <p><span>Modelo: </span>Placa 4x2 Duale Up Branco</p>
                <p><span>Marca: </span>Iriel</p>
            </div>
            <p><span>Especificação: </span>5 x 3 x 4 cm (largura x comprimento x altura)</p>
            <p><span>Código referencia: </span>615089</p>
            <div className={classes.item__texto}>
                <p><span>Tipo Embalagem: </span>Pacote</p>
                <p><span>Qtd. Embalagem: </span>1</p>
            </div>
            <p><span>descrição: </span>O Conjunto Interruptor Simples com Placa 4x2 Duale UP Branco da Iriel apresenta uma estrutura sem parafusos aparentes, além de possuir um design inovador, superfície brilhante e toque suave. O produto é produzido em material termoplástico de alta performance com aditivo anti UV e anti poeira, que auxilia na sua conservação. </p>
            <p><span>Observação: </span>A Iriel é uma empresa totalmente comprometida com a qualidade desde sua fundação, sendo a pioneira do setor elétrico na região sul do país a receber a Marca Nacional de Conformidade, concedida pelo Inmetro no ano de 1984. Marca concedida ao ser atestada a garantia de que todos os produtos de sua linha são seguros, têm qualidade e atendem às especificações técnicas.</p>
        </div>
      </div>
    )
  }
}

export default Visualizacao;