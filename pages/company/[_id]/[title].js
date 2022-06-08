import React from "react";
import Head from "next/head";
import axios from "axios";
import { Table, List, Typography } from "antd";
import { Line, Column } from "@ant-design/plots";
import { Header } from "../../../components/Header";
import { Adsense } from "../../../components/Adsense";
import { addComma } from "../../../utils";

const MoveEmployerColumnChart = ({ data }) => {
  if (data) {
    const join = data.map((item) => {
      return {
        name: "입사자",
        year: `${item.year}/${item.month}`,
        value: item.joinEmployer,
      };
    });
    const leave = data.map((item) => {
      return {
        name: "퇴사자",
        year: `${item.year}/${item.month}`,
        value: item.leaveEmployer,
      };
    });
    const d = join.concat(leave);
    const config = {
      data: d,
      isGroup: true,
      xField: "year",
      yField: "value",
      seriesField: "name",

      marginRatio: 0.1,
      label: {
        position: "middle",
        layout: [
          {
            type: "interval-adjust-position",
          },
          {
            type: "interval-hide-overlap",
          },
          {
            type: "adjust-color",
          },
        ],
      },
    };
    return <Column {...config} />;
  }
};

const TotalLineChart = ({ data }) => {
  if (data) {
    const t = data.map((item) => {
      return {
        year: `${item.year}/${item.month}`,
        value: item.totalEmployer,
      };
    });
    const config = {
      data: t,
      xField: "year",
      yField: "value",
      label: {},
      point: {
        size: 3,
        shape: "circle",
        style: {
          fill: "white",
          stroke: "#5B8FF9",
          lineWidth: 2,
        },
      },
      tooltip: {
        formatter: (d) => {
          return { name: "직원 수", value: d.value + "명" };
        },
        showMarkers: true,
      },
      state: {
        active: {
          style: {
            shadowBlur: 4,
            stroke: "#000",
            fill: "red",
          },
        },
      },
      interactions: [
        {
          type: "marker-active",
        },
      ],
    };
    return <Line {...config} />;
  }
};

const SalaryMonthLineChart = ({ data }) => {
  if (data) {
    const t = data.map((item) => {
      return {
        year: `${item.year}/${item.month}`,
        value: item.monthSalary,
      };
    });
    const config = {
      data: t,
      xField: "year",
      yField: "value",
      label: {},
      point: {
        size: 3,
        shape: "circle",
        style: {
          fill: "white",
          stroke: "#5B8FF9",
          lineWidth: 2,
        },
      },
      tooltip: {
        formatter: (d) => {
          return { name: "월급", value: addComma(d.value) + "원" };
        },
        showMarkers: true,
      },
      state: {
        active: {
          style: {
            shadowBlur: 4,
            stroke: "#000",
            fill: "red",
          },
        },
      },
      interactions: [
        {
          type: "marker-active",
        },
      ],
    };
    return <Line {...config} />;
  }
};

const SalaryYearLineChart = ({ data }) => {
  if (data) {
    const t = data.map((item) => {
      return {
        year: `${item.year}/${item.month}`,
        value: item.yearSalary,
      };
    });
    const config = {
      data: t,
      xField: "year",
      yField: "value",
      label: {},
      point: {
        size: 3,
        shape: "circle",
        style: {
          fill: "white",
          stroke: "#5B8FF9",
          lineWidth: 2,
        },
      },
      tooltip: {
        formatter: (d) => {
          return { name: "월급", value: addComma(d.value) + "원" };
        },
        showMarkers: true,
      },
      state: {
        active: {
          style: {
            shadowBlur: 4,
            stroke: "#000",
            fill: "red",
          },
        },
      },
      interactions: [
        {
          type: "marker-active",
        },
      ],
    };
    return <Line {...config} />;
  }
};

const columns = [
  { title: "연도", dataIndex: "year", key: "year" },
  { title: "월", dataIndex: "month", key: "month" },
  {
    title: "월 평균 급여(예상)",
    dataIndex: "monthSalary",
    key: "monthSalary",
    render: (value) => (
      <div>
        <strong>{addComma(value.toFixed(0))} 원</strong>
      </div>
    ),
  },
  {
    title: "월 평균 연봉(예상)",
    dataIndex: "yearSalary",
    key: "yearSalary",
    render: (value) => <div>{addComma(value.toFixed(0))} 원</div>,
  },
  {
    title: "총 직원수",
    dataIndex: "totalEmployer",
    key: "totalEmployer",
    render: (value) => <div>{addComma(value)} 명</div>,
  },
  {
    title: "입사 직원수",
    dataIndex: "joinEmployer",
    key: "joinEmployer",
    render: (value) => <div>{addComma(value)} 명</div>,
  },
  {
    title: "퇴사 직원수",
    dataIndex: "leaveEmployer",
    key: "leaveEmployer",
    render: (value) => <div>{addComma(value)} 명</div>,
  },
];

export const CompanyPage = ({ item }) => {
  const { title, address, roadAddress, code, codeName, info } = item;

  const recentlyYear = info[info.length - 1].year;
  const recentlyMonth = info[info.length - 1].month;
  const recentlyYearSalary = addComma(info[info.length - 1].yearSalary);

  const newInfo = info.map((item, index) => {
    return {
      index,
      ...item,
    };
  });

  const schemaData = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "모두의 연봉 - 내 연봉은 어디쯤?",
    url: "http://salaryinfo.co.kr",
    image: "https://salaryinfo.s3.ap-northeast-2.amazonaws.com/logo.png",
    brand: "salary info",
    datePublished: "2022-05-15",
  };

  return (
    <>
      <Head>
        <title>{title} 연봉정보 | 모두의 연봉</title>
        <meta
          name="description"
          content={`${recentlyYear}년 ${recentlyMonth}월 ${title} 연봉은 ${recentlyYearSalary}원 입니다. | 모두의 연봉. 내 연봉은 어디쯤 되는지 확인해보세요. 900,000개 이상의 연봉정보를 확인할 수 있습니다. 본 사이트는 국민연금 가입자 내역을 토대로 데이터를 제공합니다.`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
        />
        <meta property="og:title" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="http://salaryinfo.co.kr" />
        <meta
          property="og:image"
          content="https://salaryinfo.s3.ap-northeast-2.amazonaws.com/logo.png"
        />
        <meta
          property="og:description"
          content={`${recentlyYear}년 ${recentlyMonth}월 ${title} 연봉은 ${recentlyYearSalary}원 입니다. | 모두의 연봉. 내 연봉은 어디쯤 되는지 확인해보세요. 900,000개 이상의 연봉정보를 확인할 수 있습니다. 본 사이트는 국민연금 가입자 내역을 토대로 데이터를 제공합니다.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>
      <Header />
      <Adsense />
      <div className="container-wrap">
        <Typography.Title level={1}>{title}</Typography.Title>
        <List bordered style={{ marginBottom: 20 }}>
          <List.Item key="address">
            지번 주소: <strong>{address}</strong>
          </List.Item>
          <List.Item key="roadAddress">
            도로명 주소: <strong>{roadAddress}</strong>
          </List.Item>
          <List.Item key="code">
            업종코드: <strong>{code}</strong>
          </List.Item>
          <List.Item key="codeName">
            업종코드명: <strong>{codeName}</strong>
          </List.Item>
        </List>
        <Typography.Title level={2}>연봉정보(추정)</Typography.Title>
        {newInfo.length && (
          <Table
            bordered
            style={{ marginBottom: 20 }}
            size="small"
            dataSource={newInfo}
            columns={columns}
            rowKey="index"
            pagination={false}
          />
        )}
        <Typography.Title level={2} className="mt-10">
          평균월급(추정)
        </Typography.Title>
        {newInfo.length && <SalaryMonthLineChart data={newInfo} />}
        <Typography.Title level={2} className="mt-10">
          평균연봉(추정)
        </Typography.Title>
        {newInfo.length && <SalaryYearLineChart data={newInfo} />}
        <Typography.Title level={2} className="mt-10">
          직원 수
        </Typography.Title>
        {newInfo.length && <TotalLineChart data={newInfo} />}
        <Typography.Title level={2} className="mt-10">
          직원 이동 수
        </Typography.Title>
        {newInfo.length && <MoveEmployerColumnChart data={newInfo} />}
      </div>
    </>
  );
};
export default CompanyPage;

export const getServerSideProps = async ({ params }) => {
  const { _id } = params;

  const response = await axios.get(
    `${process.env.BASE_URL}/api/company/${_id}`
  );

  return { props: { item: response.data } };
};
