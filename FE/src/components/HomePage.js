//rafce
//in antd total num of cols is taken as 24. so 12 is half
import React from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';

const HomePage = () => {
  return (
    <div>
        <Typography.Title level={2} className='heading'>Global Crypto Stats</Typography.Title>
        <Row>
            <Col span={12}>
                <Statistic title='Total Cryptocurrencies' value={5} />
            </Col>
            <Col span={12}>
                <Statistic title='Total Exchanges' value={5} />
            </Col>
            <Col span={12}>
                <Statistic title='Total Market Cap' value={5} />
            </Col>
            <Col span={12}>
                <Statistic title='Total 24h Volume' value={5} />
            </Col>
            <Col span={12}>
                <Statistic title='Total Markets' value={5} />
            </Col>
        </Row>
    </div>
  )
}

export default HomePage
