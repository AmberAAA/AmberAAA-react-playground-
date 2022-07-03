import axios from "axios";

export interface Response<T> {
  code: number;
  isSuccess: boolean;
  data: T;
}

export interface Page<T> {
  current: number;
  pageCount: number;
  size: number;
  data?: T;
}

export interface DateFilter {
  start: string;
  end: string;
}

export interface DetailItem {
  key: string;
  index: number; // 路数
  duration: string; // 时常
  onDateTime: string; // 开始时间
  offDateTime: string; // 结束时间
}

export async function getDetails(
  current: number,
  size: number,
  _data: DateFilter
) {
  const { data: { isSuccess, data } } = await axios.post<Response<Page<DetailItem[]>>>("/api/screen_power/detail", { current, size, data: _data });
  data.data?.forEach((item,index) =>  item.key = `${new Date().valueOf()}_${index}`)
  // if (!isSuccess) throw new Error("Fetch data error")
  return data
}

interface StatisticsBody {
  total: string,
  lists: StatisticsData[]
}

export interface StatisticsData {
  key: string,
  index: number,
  date: string,
  duration: string
}

export async function getStatisticsData(
  current: number,
  size: number,
  _data: DateFilter
) {
  const { data: { isSuccess, data } } = await axios.post<Response<Page<StatisticsBody>>>("/api/screen_power/statistics", { current, size, data: _data });
  data.data?.lists.forEach((item,index) =>  item.key = `${new Date().valueOf()}_${index}`)
  // if (!isSuccess) throw new Error("Fetch data error")
  return data
}