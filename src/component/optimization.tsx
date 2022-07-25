import React, { memo, useCallback, useState } from "react";
import "../index.css";

export const Optimizations: React.FC = () => {
  const [count, setCount] = useState(0);

  console.log("render Optimizations");

  const onClick = () => {
    setCount((e) => e + 1);
  };

  const onClickCache = useCallback(() => setCount((e) => e + 1), []);

  return (
    <div className="border">
      {count}
      <ComponentA onClick={onClick}></ComponentA>
      <ComponentB></ComponentB>
      <ComponentC></ComponentC>
      <ComponentD onClick={onClickCache}></ComponentD>
      <ComponentE onClick={onClickCache} count={count}></ComponentE>
      <ComponentF onClick={onClickCache} count={count}></ComponentF>
    </div>
  );
};

interface IProps {
  onClick?: () => void;
  count?: number;
}

// 每次只要父组件更新，都会渲染
const ComponentA: React.FC<IProps> = (props) => {
  console.log("render Component A");
  return (
    <div className="border-green ">
      <p>Component A</p>
      <button onClick={() => props.onClick && props.onClick()}>Plus</button>
    </div>
  );
};

// 每次只要父组件更新，都会渲染
const ComponentB: React.FC = () => {
  console.log("render Component B");
  return <div className="border-green">I'm Component B</div>;
};

// 通过memo，会将props进行一次浅比较，这里没有任何对外依赖，所以只会在初始化时执行一次render
const ComponentC: React.FC = memo(() => {
  console.log("render Component C");
  return <div className="border-green ">I'm Component C</div>;
});

// 通过memo，会将props进行一次浅比较，如果都没有变化，则不会执行render方法 
const ComponentD: React.FC<IProps> = memo((props) => {
  console.log("render Component D");
  return (
    <div className="border-green ">
      <p>Component D</p>
      <button onClick={() => props.onClick && props.onClick()}>Plus</button>
    </div>
  );
});


const ComponentE: React.FC<IProps> = (props) => {
  console.log("render Component E");
  return (
    <div className="border-green ">
      <p>Component E</p>
      <button onClick={props.onClick}>Plug One</button>
      <div>parent's count is {props.count || 0}</div>
    </div>
  );
};

// 通过memo接收第二个参数，用来判断，是否需要重新渲染，当返回值为false，则只进行一次
const ComponentF: React.FC<IProps> = memo(
  (props) => {
    console.log("render Component F");
    return (
      <div className="border-green ">
        <p>Component F</p>
        <button onClick={props.onClick}>Plug One</button>
        <div>parent's count is {props.count || 0}</div>
      </div>
    );
  },
  (prev, next) => {
    console.log(prev.count === next.count)
    return prev.count === next.count;
  }
);
