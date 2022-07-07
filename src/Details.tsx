import { message, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { DetailItem, getDetails } from "./api";

interface Props {
  start: Moment;
  end: Moment;
}

const columns: ColumnsType<DetailItem> = [
  {
    title: "序号",
    dataIndex: "name",
    key: "name",
    width: 80,
    render: (_, $, index) => index + 1,
  },
  {
    title: "路数",
    dataIndex: "index",
    key: "index",
    width: 200,
  },

  {
    title: "打开时间",
    dataIndex: "onDateTime",
    key: "onDateTime",
    width: "33%",
  },

  {
    title: "关闭时间",
    dataIndex: "offDateTime",
    key: "offDateTime",
    width: "33%",
  },
  {
    title: "时长",
    dataIndex: "duration",
    key: "duration",
  },
];

let a: Props;

export const Details: React.FC<Props> = (props) => {
  const [data, setData] = useState<DetailItem[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (t) => `共 ${t} 条数据`,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = () => {
    const start = props.start.format("YYYYMMDD");
    const end = props.end.format("YYYYMMDD");

    setLoading(true);
    getDetails(
      typeof pagination.current === "number" ? pagination.current - 1 : 0,
      pagination.pageSize || 10,
      {
        start,
        end,
      }
    )
      .then((res) => {
        pagination.total = res.current;
        setPagination(pagination);
        setData(res.data || []);
      })
      .catch(() => {
        message.error("请求数据，发生错误");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [props.start, props.end]);

  const pageOnChange = (page: number, pageSize: number) => {
    pagination.current = page;
    pagination.pageSize = pageSize;
    setPagination(pagination);
    fetchData();
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="key"
        loading={loading}
        pagination={{ ...pagination, onChange: pageOnChange }}
      ></Table>
    </div>
  );
};
