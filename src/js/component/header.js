import React from "react";

export default class Header extends React.Component {
  constructor() {
    super();
      this.name = "Header";
  }
  render() {
    return (
      <h1>It's {this.name}!</h1>
    );
  }
}