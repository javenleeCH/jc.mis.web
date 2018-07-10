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
      forceFit = true,
      height,
      data,
      padding,
    } = this.props;

    const tooltip = [
      'type*value',
      (x, y) => ({
        name: x,
        value: y.toFixed(2) + ' 万',
      }),
    ];

    const tooltipRate = [
      'rates*rate',
      (x, y) => ({
        name: x,
        value: (y * 100).toFixed(2) + '%',
      }),
    ];

    const dodgeColor = ['type', (type) => {
      if (type === '挑战目标') { return '#1E90FF'; }
      if (type === '实际目标') { return '#7B68EE'; }
      if (type === '完成业绩') { return '#FF4500'; }
    }];

    const rateColor = ['rates', (type) => {
      if (type === '挑战目标完成率') { return '#1E90FF'; }
      if (type === '实际目标完成率') { return '#7B68EE'; }
    }];

    const dv = new DataView().source(data);// .filter(x => x.compId === x.deptId)
    dv.transform({
      type: 'rename',
      map: {
        challenge: '挑战目标',
        standard: '实际目标',
        reduced: '完成业绩',
        reachedRate: '实际目标完成率',
        dareRate: '挑战目标完成率',
      },
    }).transform({
      type: 'fold',
      fields: ['挑战目标', '实际目标', '完成业绩'],
      key: 'type',
      value: 'value',
    }).transform({
      type: 'fold',
      fields: ['挑战目标完成率', '实际目标完成率'],
      key: 'rates',
      value: 'rate',
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
            <Axis name="deptName" />
            <Axis name="value" />
            <Tooltip />
            <Geom
              type="interval"
              position="deptName*value"
              color={dodgeColor}
              adjust={[{ type: 'dodge', marginRatio: 1 / 16 }]}
              tooltip={tooltip}
              size={10}
            >
              <Label
                offset={8}
                content={['value', (x) => {
                return `${x.toFixed(0)}`;
              }]}
              />
            </Geom>
            <Geom
              type="line"
              position="deptName*rate"
              color={rateColor}
              size={3}
              tooltip={tooltipRate}
            >
              <Label
                offset={8}
                content={['rate', (x) => {
                return `${(x * 100).toFixed(0)}%`;
              }]}
              />
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}

