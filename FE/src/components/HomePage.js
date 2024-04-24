//rafce
//in antd total num of cols is taken as 24. so 12 is half
import React from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { CryptoCurrencies,News } from '../components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const HomePage = () => {
    const {data, isFetching} = useGetCryptosQuery(12);
    const globalStats = data?.data?.stats;
    if (isFetching) return <Skeleton count={150} />
   
    return (
        <div>
            <Typography.Title level={2} className='heading'>Global Crypto Stats</Typography.Title>
            <Row>
                <Col span={12}>
                    <Statistic title='Total Cryptocurrencies' value={globalStats?.total} />
                </Col>
                <Col span={12}>
                    <Statistic title='Total Exchanges' value={millify(globalStats?.totalExchanges)} />
                </Col>
                <Col span={12}>
                    <Statistic title='Total Market Cap' value={millify(globalStats?.totalMarketCap)} />
                </Col>
                <Col span={12}>
                    <Statistic title='Total 24h Volume' value={millify(globalStats?.total24hVolume)} />
                </Col>
                <Col span={12}>
                    <Statistic title='Total Markets' value={millify(globalStats?.totalMarkets)} />
                </Col>
            </Row>

            <div className='home-heading-container'>
                <Typography.Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Typography.Title>
                <Typography.Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Typography.Title>
            </div>
            <CryptoCurrencies simplified /> {/*simplified keyword use to show only 12 */}

            <div className='home-heading-container'>
                <Typography.Title level={2} className='home-title'>Latest Crypto News</Typography.Title>
                <Typography.Title level={3} className='show-more'><Link to='/news'>Show More</Link></Typography.Title>
            </div>
            <News simplified />
        </div>
    )
}

export default HomePage
