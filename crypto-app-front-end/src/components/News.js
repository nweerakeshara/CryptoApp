import React, { useEffect, useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import HTMLReactParser from 'html-react-parser';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const News = ({ simplified }) => {
  const { data, isFetching } = useGetCryptoNewsQuery({ time: 'w' });
  const [news, setNews] = useState([])

  useEffect(() => {
    if (simplified) {
      const filteredData = Array.isArray(data?.data?.data) ? data?.data.data.slice(0, 6) : [];
      setNews(filteredData);
    } else {
      setNews(data?.data?.data);
    }
  }, [data, simplified]);

  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

  if (isFetching) return <Skeleton count={150} />

  return (
    <Row gutter={[24, 24]}>
      {Array.isArray(news) && news.length !== 0 && (<>
        {news?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>

            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Typography.Title className="news-title" level={4}>{news.title}</Typography.Title>
                  <img src={news?.image || demoImage} alt="" />
                </div>
                <p>{news.excerpt.length > 200 ? HTMLReactParser(`${news.excerpt.substring(0, 200)}...`) : HTMLReactParser(news.excerpt)}</p>
                <div className="provider-container">
                  <div>
                    <Typography.Text className="provider-name">{news.syndicate}</Typography.Text>
                  </div>
                  <Typography.Text>{news.relativeTime}</Typography.Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </>)}

    </Row>
  )
}

export default News
