import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.css';

const navigationItems = () => (
    <ul className={classes.mainNav__items}>
        <li className={classes.mainNav__item} style={{marginRight: 'auto'}}>
            <NavLink to="/">MVP - Item</NavLink>
        </li>
        
        <li className={classes.mainNav__item+' '+classes.list1} style={{marginRight: '60px'}}>
            <span>Cadastrar</span>
            <ul>
                <li>
                    <NavLink to="/cadastro">Item</NavLink>
                </li>
            </ul>
        </li>
    </ul>
);

export default navigationItems;