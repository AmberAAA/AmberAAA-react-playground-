import React from "react";
import { TodoContainer } from "./to-do/Index";

const App: React.FC = () => { 
  return (
    <div className="App" style={{position: 'relative', height: '200px'}}>
      <TodoContainer />
    </div>
  );
};

export default App;

type TPageName = "home" | "details" | "welcome"

interface IPage {
  title: string;
  body: string
}

const pages: Record<TPageName, IPage> = {
  details: {
    title: "",
    body: ""
  },
  home: {
    title: "",
    body: ""
  },
  welcome: {
    title: "",
    body: ""
  }
}

type IOtherPage = {
  [key in TPageName]: IPage
}

let otherPages: IOtherPage = pages

console.log(pages)
console.log(otherPages)
