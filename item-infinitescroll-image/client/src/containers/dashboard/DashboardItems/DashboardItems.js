import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './DashboardItems.css';

class DashboardItems extends Component {
    render() {
        const espec = this.props.especificacao ? (<p><strong>Especificações:</strong> {this.props.especificacao} - pacote {this.props.packunit} unidades</p>) : '';
        const stock = this.props.stock ? (<p><strong>Qtd. Estoque:</strong> {this.props.stock} itens</p>) : '';
        const brand = (this.props.marca+' - ') ? this.props.marca : '';
        console.log(typeof this.props.imagem);
        return (
            <div>
                <section>
                    <div className={classes.containerDashItem}>
                        <div className={classes.containerDashItem__div}>
                            <img className={classes.containerDashItem__img} src={require(`../../../assests/${this.props.imagem}`)} alt='' />
                        </div>
                        <div className={classes.containerDashItem__div}>
                            <div className={classes.containerDashItem__texto}>
                                <p>{this.props.nome} - {brand} <strong>Código:</strong>  {this.props.codref}</p>
                                {espec}
                                {stock}
                            </div>
                            <div className={classes.containerDashItem__info}>
                                <Link to={{
                                    pathname: "/visualiza-item",
                                    hash: "#"+this.props.id
                                }}>
                                    <img src={require('../../../assests/images/button-plus.png')} alt="" />
                                    <p>mais informação</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section> 
            </div>
        );
    }
}      

export default DashboardItems;