import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Label, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../../Charts/autoHeight';

@autoHeight()
export default class ChainBar extends Component {
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
      'type*value',
      (x, y) => ({
        name: x,
        value: (y[1] - y[0]).toFixed(2) + ' 万',
      }),
    ];
    const trans = data;
    if (trans && trans.length > 0) {
      trans[2].amount = [trans[0].amount, trans[0].amount + trans[2].amount];
      trans[2].reduced = [trans[0].reduced, trans[0].reduced + trans[2].reduced];
      trans[0].amount = [0, trans[0].amount];
      trans[1].amount = [0, trans[1].amount];
      trans[0].reduced = [0, trans[0].reduced];
      trans[1].reduced = [0, trans[1].reduced];
    }
    const dv = new DataView().source(trans);
    dv.transform({
      type: 'rename',
      map: {
        amount: '成交金额',
        reduced: '折算业绩',
      },
    }).transform({
      type: 'fold',
      fields: ['成交金额', '折算业绩'],
      key: 'type',
      value: 'value',
    });

    const colors = ['type*subject*value', (type, subject, value) => {
      if (type === '成交金额') { return value[1] - value[0] > 0 ? '#1E90FF' : '#7B68EE'; }
      if (type === '折算业绩') { return value[1] - value[0] > 0 ? '#FF4500' : '#FF0000'; }
    }];

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
            <Axis name="subject" />
            <Axis name="value" />
            <Tooltip />
            <Geom
              type="interval"
              position="subject*value"
              color={colors}
              adjust={[{ type: 'dodge', marginRatio: 1 / 32 },
              { type: 'stack', dodgeBy: 'key' }]}
              tooltip={tooltip}
              size={30}
            >
              {/* <Label
                offset={8}
                content={['value', (x) => { return (x[1] - x[0]).toFixed(); }]}
              /> */}
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}
