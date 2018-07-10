import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Label, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../../Charts/autoHeight';

@autoHeight()
export default class Bar extends Component {
  state = {
    autoHideXLabels: false,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleRoot = (n) => {
    this.root = n;
  };

  handleRef = (n) => {
    this.node = n;
  };

  render() {
    const {
      title,
      height,
      forceFit = true,
      data,
      padding,
    } = this.props;

    const tooltip = [
      'type*value',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    const tooltipRate = [
      'actuals*actual',
      (x, y) => ({
        name: x,
        value: y,
      }),
    ];

    const rateColor = ['actuals', (type) => {
      if (type === '电话量') { return '#DD664D'; }
      if (type === '拜访量') { return '#EB9A3F'; }
      if (type === '总成交') { return '#FDEB52'; }
      if (type === '新客户成交') { return '#DF5363'; }
    }];

    const dv = new DataView().source(data);
    dv.transform({
      type: 'rename',
      map: {
        total: '总分',
        actualCall: '电话量',
        actualVisit: '拜访量',
        totalDeal: '总成交',
        actualDeal: '新客户成交',
      },
    }).transform({
      type: 'fold',
      fields: ['总分'],
      key: 'type',
      value: 'value',
    }).transform({
      type: 'fold',
      fields: ['电话量', '拜访量', '总成交', '新客户成交'],
      key: 'actuals',
      value: 'actual',
    });
    return (
      <div style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart
            width={this.node && this.node.parentNode.clientWidth}
            height={title ? height - 41 : height}
            forceFit={forceFit}
            data={dv}
            padding={padding || 'auto'}
          >
            <Legend position="top" />
            <Axis name="userName" />
            <Axis name="value" min={0} />
            <Tooltip />
            <Geom
              type="interval"
              position="userName*value"
              color="type"
              tooltip={tooltip}
              size={10}
            >
              <Label
                offset={8}
                content={['value', (x) => {
                return `${x}`;
              }]}
              />
            </Geom>
            <Geom
              type="line"
              position="userName*actual"
              color={rateColor}
              size={3}
              tooltip={tooltipRate}
            >
              <Label
                offset={8}
                content={['actual', (x) => {
                return `${(x)}`;
              }]}
              />
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}

