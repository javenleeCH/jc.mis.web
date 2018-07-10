import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Label, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import autoHeight from '../../Charts/autoHeight';

@autoHeight()
export default class Calls extends Component {
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
      height = 300,
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

    const dv = new DataView().source(data);
    dv.transform({
      type: 'rename',
      map: {
        callTime: '通时',
        calls: '通次',
      },
    }).transform({
      type: 'fold',
      fields: ['通时', '通次'],
      key: 'type',
      value: 'value',
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
            <Axis name="memo" />
            <Axis name="value" />
            <Tooltip />
            <Geom
              type="interval"
              position="memo*value"
              color={['type', ['#fa0', '#f52']]}
              adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]}
              tooltip={tooltip}
              size={20}
            >
              <Label
                offset={8}
                content={['value', (x) => { return x === 0 ? '' : x; }]}
              />
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}

