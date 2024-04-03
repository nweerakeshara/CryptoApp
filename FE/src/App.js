//create aftr index.js
//then navbar.js inside components folder

import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar, HomePage, Exchanges, CryptoCurrencies, CryptoDetails, News } from './components';
import 'antd/dist/reset.css'
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
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/exchanges' element={<Exchanges />} />
                            <Route path='/cryptocurrencies' element={<CryptoCurrencies />} />
                            <Route path='//crypto/:coinId' element={<CryptoDetails />} />
                            <Route path='/news' element={<News />} />
                        </Routes>
                    </div>
                </Layout>
                <div className='footer'>{/*footer section*/}
                    <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
                        Crypto News Hub <br />
                        All Rights Reserved
                    </Typography.Title>
                    <Space>
                        <Link to='/'>Home</Link>
                        <Link to='/cryptocurrencies'>Crypto Currencies</Link>
                        <Link to='/exchanges'>Exchanges</Link>
                        <Link to='/news'>News</Link>
                    </Space>
                </div>
            </div>

        </div>
    )
}

export default App
