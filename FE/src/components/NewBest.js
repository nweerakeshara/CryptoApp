import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import {Typography} from 'antd';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { useGetNewBestCryptosQuery } from '../services/cryptoApi';

const NewBest = () => {
  const { data, isFetching } = useGetNewBestCryptosQuery();
  const [newCryptos, setNewCryptos] = useState([])
  const [bestCryptos, setBestCryptos] = useState([])
  useEffect(() => {
    setNewCryptos(data?.data?.bestCoins);
    setBestCryptos(data?.data?.newestCoins);
  }, [data]);

  if (isFetching) return <Skeleton count={150} />

  return (
    <div>
      <Col className="coin-heading-container">
        <Typography.Title level={2} className="coin-name">
          Newest Cryptocurrencies Right Now
        </Typography.Title>
        
      </Col>

      <Row gutter={[32, 32]} className='best-crypto-card-container'>
        {newCryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={8} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card title={`${currency.name}`}
                extra={<img className='best-crypto-image' src={currency.iconUrl} />}
                hoverable
              >              
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <Col className="coin-heading-container">
        <Typography.Title level={2} className="coin-name">
          Best Cryptocurrencies Right Now
        </Typography.Title>        
      </Col>

      <Row gutter={[32, 32]} className='best-crypto-card-container'>
        {bestCryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={8} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card title={`${currency.name}`}
                extra={<img className='best-crypto-image' src={currency.iconUrl} />}
                hoverable
              >
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default NewBest
