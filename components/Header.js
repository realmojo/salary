import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { PageHeader, Input, Space, Avatar, Button, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
export const Header = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const onSearch = () => {
    router.push(`/list/${searchText}`);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  return (
    <>
      <PageHeader
        style={{ background: "#1890ff" }}
        className="site-page-header"
        title={
          <Space>
            <Link href="/">
              <Typography.Title
                level={2}
                style={{
                  cursor: "pointer",
                  color: "white",
                  marginBottom: 0,
                  marginRight: 20,
                }}
              >
                모두의 연봉
              </Typography.Title>
            </Link>

            <Input.Group compact style={{ minWidth: "400px" }}>
              <Input
                size="large"
                value={searchText}
                onChange={onChange}
                placeholder="연봉이 궁금한 회사명을 검색하세요"
                onPressEnter={() => onSearch()}
                suffix={suffix}
              />
            </Input.Group>
            <Space>
            <Link href="/category">
              <Typography.Title
                level={5}
                style={{
                  cursor: "pointer",
                  color: "white",
                  marginBottom: 0,
                }}
              >
                업종별 회사
              </Typography.Title>
            </Link>
          </Space>
        }
      />
    </>
  );
};
