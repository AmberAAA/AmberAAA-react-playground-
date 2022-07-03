import { message, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { StatisticsData, getStatisticsData } from "./api";

interface Props {
  start: Moment;
  end: Moment;
}

const columns: ColumnsType<StatisticsData> = [
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
    width: "33%",
  },

  {
    title: "日期",
    dataIndex: "date",
    key: "date",
    width: "33%",
  },

  {
    title: "每日统计",
    dataIndex: "duration",
    key: "duration",
  },
];

export const Statistics: React.FC<Props> = (props) => {
  const [data, setData] = useState<StatisticsData[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (t) => `共 ${t} 条数据`,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [info, setInfo] = useState("");

  const fetchData = () => {
    const start = props.start.format("YYYYMMDD");
    const end = props.end.format("YYYYMMDD");

    setLoading(true);
    getStatisticsData(
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
        if (res.data) {
          setInfo(res.data.total);
          setData(res.data.lists);
        } else {
          setData([])
        }
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
  }, [props]);

  const pageOnChange = (page: number, pageSize: number) => {
    pagination.current = page;
    pagination.pageSize = pageSize;
    setPagination(pagination);
    fetchData();
  };

  const spanStyle: React.CSSProperties = {
    fontSize: "14px",
    position: "absolute",
    zIndex: 10,
    right: "127px",
    top: "-48px",
  };

  return (
    <div style={{ position: "relative" }}>
      <span style={spanStyle}>总计：{info}</span>
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
