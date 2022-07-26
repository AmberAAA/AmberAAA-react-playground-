import React from "react";

export interface IUserDetailsProps {
  name: string;
  age: number;
  address: string;
}

export const UserDetails: React.FC<IUserDetailsProps> = (props) => {
  return (
    <details>
      <summary>{props.name}</summary>
      <strong>{props.age}</strong>
      <address>{props.address}</address>
    </details>
  )  
}

export class Counter extends React.Component<any,{count: number}> {
  constructor(props: any) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }
  handleClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.handleClick}>
          Click me
        </button>
      </div>
    );
  }
}