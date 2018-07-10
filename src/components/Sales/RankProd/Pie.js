import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import { DataView } from '@antv/data-set';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../../Charts/autoHeight';

@autoHeight()
export default class Pie extends Component {
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
    const minWidth = data.length * 30;
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

    const dv = new DataView().source(data);
    dv.transform({
      type: 'percent',
      field: 'reduced',
      dimension: 'prod',
      as: 'percent',
    });

    const scale = { percent: { nice: false } };

    const tooltip = [
      'prod*reduced',
      (x, y) => ({
        name: x,
        value: y.toFixed(2) + ' 万',
      }),
    ];

    return (
      <div style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart
            scale={scale}
            height={title ? height - 41 : height}
            forceFit={forceFit}
            data={dv}
            padding={padding || 'auto'}
          >
            <Coord type="theta" radius={1} innerRadius={0.1} />
            <Axis name="percent" />
            <Tooltip showTitle={false} />
            <Geom
              type="intervalStack"
              position="percent"
              color="prod"
              tooltip={tooltip}
              style={{ lineWidth: 2, stroke: '#fff' }}
            >
              <Label
                content={['prod*percent', (x, y) => {
                    return `${x}\n${(y * 100).toFixed(2)} %`;
                  }]}
                offset={-40}
                textStyle={{
                  rotate: 0,
                  textAlign: 'center',
                  shadowBlur: 2,
                  shadowColor: 'rgba(0, 0, 0, .45)',
                }}
              />
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}

