import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Label, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../../Charts/autoHeight';

@autoHeight()
export default class Cust extends Component {
  state = {
    autoHideXLabels: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return;
    }
    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 20;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }

  handleRoot = (n) => {
    this.root = n;
  };

  handleRef = (n) => {
    this.node = n;
  };

  render() {
    const {
      height,
      title,
      forceFit = true,
      data,
      padding,
    } = this.props;

    const tooltip = [
      'types*value',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    const dv = new DataView().source(data);
    dv.transform({
      type: 'rename',
      map: {
        bronze: '青铜',
        darksteel: '玄铁',
        invite: '邀约',
        push: '推送',
      },
    }).transform({
      type: 'fold',
      fields: ['青铜', '玄铁', '邀约', '推送'],
      key: 'types',
      value: 'value',
      retains: ['userName'],
    }).transform({
      type: 'map',
      callback: (obj) => {
        const key = obj.types;
        let type = 'a';
        if (key === '青铜' || key === '玄铁') {
          type = 'a';
        } else if (key === '邀约') {
          type = 'b';
        } else {
          type = 'c';
        }
        obj.type = type;
        return obj;
      } });

    return (
      <div style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart
            width={this.node && this.node.parentNode.clientWidth}
            height={title ? height - 41 : height}
            data={dv}
            forceFit={forceFit}
            padding={padding || 'auto'}
          >
            <Legend position="top" />
            <Axis name="userName" />
            <Axis name="value" />
            <Tooltip />
            <Geom
              type="interval"
              position="userName*value"
              color={['types', ['#a80', '#07c', '#fa0', '#f52']]}
              adjust={[{ type: 'dodge', dodgeBy: 'type', marginRatio: 1 / 32 }, { type: 'stack' }]}
              tooltip={tooltip}
              size={20}
            >
              <Label
                offset={-8}
                content={['value', (x) => { return x === 0 ? '' : x; }]}
              />
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}
