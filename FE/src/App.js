//create aftr index.js
//then navbar.js inside components folder

import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Layout, Typography, Space} from 'antd';
import {Navbar} from './components';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>{/*navbar section*/}
        <Navbar />      
      </div>
      <div className='main'>{/*main section*/}
        <Layout>
            <div className='routes'>
                <Switch>
                    <Route exact path='/'>
                        <HomePage/>
                    </Route>
                    <Route exact path='/exchanges'>
                        <Exchanges/>
                    </Route>
                    <Route exact path='/cryptocurrencies'>
                        <CryptoCurrencies/>
                    </Route>
                    <Route exact path='/crypto/:coinId'>
                        <CryptoDetails/>
                    </Route>
                    <Route exact path='/news'>
                        <News/>
                    </Route>
                </Switch>
            </div>
        </Layout>
    </div>
    <div className='footer'>{/*footer section*/}
      
    </div>
    </div>
  )
}

export default App
