import { ConfigContext } from "antd/lib/config-provider";
import { MouseEventHandler, useContext, useEffect, useMemo, useState } from "react";

export const ShowHook: React.FC = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `count is ${count}`
  }, [count])

  const data =  useContext(ConfigContext)

  const type = useMemo(() => (count % 2 ? "偶" : "奇"), [count]);

  const add: MouseEventHandler<HTMLButtonElement> = (e) => {
    setCount(count + 1);
    e.stopPropagation()
  };

  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <>
      <p>
        count: {count} <button onClick={add}>喜加一</button>
      </p>
      <p>奇偶数： {type}</p>
    </>
  );
};
