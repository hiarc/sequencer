import React from "react";

export default class Header extends React.Component {
  constructor() {
    super();
      this.name = "Header";
  }
  render() {
    return (
      <div>It's {this.name}!</div>
    );
  }
}