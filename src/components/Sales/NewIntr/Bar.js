import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Label, Coord } from 'bizcharts';
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

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return;
    }
    const canvasHeight = this.node.parentNode.clientHeight;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minHeight = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasHeight <= minHeight) {
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
      title,
      forceFit = true,
      data,
      color = 'rgba(24, 144, 255, 0.85)',
      padding,
    } = this.props;

    const scale = {
      x: { type: 'cat' },
      y: { min: 0 },
    };

    const tooltip = [
      'ownerName*reduced',
      (x, y) => ({
        name: x,
        value: y + ' 万',
      }),
    ];

    const minHeight = data.length * 35;

    return (
      <div style={{ minHeight }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          {title && <h3 style={{ marginBottom: 20, marginLeft: 70 }}>{title}</h3>}
          <Chart
            scale={scale}
            height={title ? minHeight - 41 : minHeight}
            forceFit={forceFit}
            data={data}
            padding={padding || 'auto'}
          >
            <Coord transpose reflect />
            <Axis name="ownerName" />
            <Axis name="reduced" />
            <Tooltip showTitle={false} />
            <Geom type="interval" position="ownerName*reduced" color={color} tooltip={tooltip} >
              <Label
                offset={8}
                content={['reduced', (reduced) => {
                return `${reduced.toFixed(0)}`;
              }]}
              />
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}

