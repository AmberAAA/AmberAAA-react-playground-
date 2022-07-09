import { Form, DatePicker, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import "./App.css";
import { Details } from "./Details";
import { Statistics } from "./Statistics";
import { DownLoad } from "./Download";
import { useCount } from "./useName";
import { ShowHook } from "./showHook";


const tailLayout = {
  labelCol: { offset: 3 },
};

interface DateType {
  start: Moment,
  end: Moment
}

const App: React.FC = () => {
  const [ form ] = Form.useForm<DateType>()
  const [date, setDate] = useState<DateType>({
    start: moment(),
    end: moment()
  })

  const { TabPane } = Tabs;
  
  useEffect(() => {
    form.setFieldsValue({
      start: moment(),
      end: moment()
    })
  }, [])

  const count = useCount();

  const fromChange = () => {
    const value = form.getFieldsValue();
    setDate(value)
  };

  const disabledStartDate = (current: Moment): boolean => {
    const end = form.getFieldValue("end") as Moment;
    if (end) {
      return !current.isBetween(moment(end).subtract(1, 'year'), moment(end).add(1, 'day'))
    }
    const unix = moment(0)
    return moment.max(unix, current) !== current
  };

  const disabledEndDate = (current: Moment): boolean => {
    const start = form.getFieldValue("start") as Moment;
    if (start) {
      return !current.isBetween(moment(start).subtract(1, 'd') , moment(start).add(1, 'year'))
    }
    const unix = moment(0)
    return moment.max(unix, current) !== current
  };

  return (
    <div className="App" style={{position: 'relative', height: '200px'}}>
      {count}
      <ShowHook />
      <Form
        form={form}
        name="control-hooks"
        layout="inline"
        onValuesChange={fromChange}
      >
        <Form.Item name="start" label="开始时间">
          <DatePicker
            style={{ width: "200px" }}
            clearIcon={false}
            disabledDate={disabledStartDate}
          />
        </Form.Item>
        <Form.Item name="end" label="结束时间" style={{ marginLeft: '24px'}}>
          <DatePicker
            style={{ width: "200px" }}
            clearIcon={false}
            disabledDate={disabledEndDate}
          />
        </Form.Item>
        <Form.Item {...tailLayout} style={{ marginLeft: '24px'}}>
          <DownLoad {...date} />
        </Form.Item>
      </Form>
      <Tabs defaultActiveKey="1">
        <TabPane tab="详情" key="1">
          <Details {...date} ></Details>
        </TabPane>
        <TabPane tab="统计" key="2">
          <Statistics {...date}/>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
