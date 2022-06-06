import { Header } from "../components/Header";
import { Row, Col, Card, Skeleton, Typography } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ko";
import Link from "next/link";
import Head from "next/head";

const SkeletonComponent = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
        <Col
          key={item}
          className="mb-4"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 6 }}
        >
          <Skeleton />
        </Col>
      ))}
    </>
  );
};
const ItemsComponent = ({ items }) => {
  return (
    <>
      {items.map((item, index) => (
        <Col
          key={index}
          className="mb-4"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <Card
            type="inner"
            title={<Link href={`/number/${item.number}`}>{item.number}</Link>}
          >
            <p>ddd</p>
            {/* <span style={{ fontSize: 12, color: "#bbb" }}>
              {moment(item.created).fromNow()}
            </span> */}
            {/* <span style={{ fontSize: 12, color: "#bbb" }}>
              ({convertIP(item.ip)})
            </span> */}
          </Card>
        </Col>
      ))}
    </>
  );
};
const Home = () => {
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //   axios.get(`/api/phone/comments/recently`).then((res) => {
  //     setItems(res.data.recentlyItems || []);
  //   });
  // }, []);
  return (
    <>
      {/* <Head>
        <title>폰북업 - 이 번호 찾아줘</title>
        <meta
          name="description"
          content="스팸 전화번호부를 같이 만들어나가는 위키 서비스입니다. 모르는 전화번호를 검색하세요. 당신의 소중한 한 줄이 많은 사람들을 보이스피싱으로부터 구할 수 있습니다."
        />
        <meta property="og:title" content="폰북업 - 이 번호 찾아줘" />
        <meta
          property="og:description"
          content="스팸 전화번호부를 같이 만들어나가는 위키 서비스입니다. 모르는 전화번호를 검색하세요. 당신의 소중한 한 줄이 많은 사람들을 보이스피싱으로부터 구할 수 있습니다."
        />
      </Head> */}
      <Header />
      <div
        style={{
          width: 1024,
          height: 300,
          background: "#ddd",
          margin: "20px auto",
        }}
      >
        adsense
      </div>
      <div className="container-wrap" style={{ paddingTop: 20 }}>
        <Typography.Title>최근에 등록된 회사</Typography.Title>
      </div>
      <Row gutter={16} className="pt-4 container-wrap">
        {items.length === 0 ? (
          <SkeletonComponent />
        ) : (
          <ItemsComponent items={items} />
        )}
      </Row>
    </>
  );
};

export default Home;
