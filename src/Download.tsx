import { Button, Modal, Steps } from "antd";
import { Moment } from "moment";
import { useState } from "react";
import * as XLSX from "xlsx";
import {
  DateFilter,
  getDetails,
  getStatisticsData as getStatistics,
} from "./api";

const PAGE_SIZE = 1000;

interface Props {
  start: Moment;
  end: Moment;
}

export const DownLoad: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [status, setStatus] = useState(0);
  const { Step } = Steps;

  const getStatus = (current: number) => {
    if (current === status) return "process";
    return current < status ? "finish" : "wait"
  }

  const getDetailsData = async (
    current: number,
    list: any[],
    filter: DateFilter
  ) => {
    const data = await getDetails(current, PAGE_SIZE, filter);
    if (current < data.pageCount) {
      data.data?.forEach((it) =>
        list.push([it.index, it.onDateTime, it.offDateTime, it.duration])
      );
      await getDetailsData(current + 1, list, filter);
    }
  };

  const getStatisticsData = async (
    current: number,
    list: any[],
    filter: DateFilter
  ) => {
    const data = await getStatistics(current, PAGE_SIZE, filter);
    if (current < data.pageCount) {
      data.data?.lists.forEach((it) =>
        list.push([it.index, it.date, it.duration])
      );
      await getDetailsData(current + 1, list, filter);
    }
  };

  const onClick = async () => {
    setVisible(true);
    

    const book = XLSX.utils.book_new();

    // 1. 获取所有的详情数据

    const start = props.start.format("YYYYMMDD");
    const end = props.end.format("YYYYMMDD");

    // INFO: STEP1 导出详情
    setStatus(1)
    const details: any[] = [["路数", "打开时间", "关闭时间", "时长"]];
    await getDetailsData(0, details, { start, end });
    XLSX.utils.book_append_sheet(
      book,
      XLSX.utils.aoa_to_sheet(details),
      "详情"
    );

    // INFO: STEP2 导出统计
    setStatus(2)
    const statistics: any[] = [["路数", "日期", "每日统计"]];
    await getStatisticsData(0, statistics, { start, end });

    setStatus(3)
    XLSX.utils.book_append_sheet(
      book,
      XLSX.utils.aoa_to_sheet(statistics),
      "统计"
    );
    XLSX.writeFile(book, "数据.xlsx");
    setStatus(4)
  };

  const onClose = () => {
    setStatus(0)
    setVisible(false)
  }

  return (
    <div>
      <Button onClick={onClick}>导出</Button>
      <Modal
        title="进度"
        visible={visible}
        onOk={onClose}
        onCancel={onClose}
      >
        <Steps>
          <Step status={getStatus(1)} title="获取详情数据" />
          <Step status={getStatus(2)}  title="获取统计数据" />
          <Step status={getStatus(3)}  title="生成文件" />
        </Steps>
      </Modal>
    </div>
  );
};
