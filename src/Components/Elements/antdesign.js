import React, { Component } from "react";
import { Switch } from "antd";
class AntComponent extends Component {
  render() {
    return <Switch onChange={this.props.toggle} />;
  }
}
export default AntComponent;
