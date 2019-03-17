import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/dashboard/Dashboard';
import Cadastro from './containers/Item/Cadastro/Cadastro';
import Visualiza from './containers/Item/Visualizacao/Visualizacao';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/cadastro" component={Cadastro} />
            <Route path="/visualiza-item" component={Visualiza} />
            <Route path="/" exact component={Dashboard} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
