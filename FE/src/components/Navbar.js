//aftr app.js
//then 
//jsx vs js -> differntiate react components from basic js files.
//make an index.js inside components folder for all components. Add this there for coding good practices. Then import it to app.js from index.js

import React from 'react'
import {Button, Menu, Typography, Avatar} from 'antd';
import {Link} from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined} from '@ant-design/icons';
import icon from '../images/cryptocurrency.png'

const Navbar = () => {
  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} size={50} shape='square'/>        
        <Typography.Title level={2} className='logo'>
            <Link to='/'>Crypto News Hub</Link>
        </Typography.Title>
      </div> 
        <Menu theme='dark'>
            <Menu.Item icon={<HomeOutlined/>}>
                <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined/>}>
                <Link to='/cryptocurrencies'>Crypto Currencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined/>}>
                <Link to='/newbest'>New & Best</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined/>}>
                <Link to='/news'>News</Link>
            </Menu.Item>
        </Menu>
      
    </div>
  )
}

export default Navbar
