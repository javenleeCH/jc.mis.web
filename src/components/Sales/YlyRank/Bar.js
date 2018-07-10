import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Label } from 'bizcharts';
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
      color = 'rgba(24, 144, 255, 0.85)',
      padding,
    } = this.props;

    const scale = {
      ownerName: { type: 'cat' },
      全年总业绩: { min: 0 },
    };

    const tooltip = [
      'ownerName*全年总业绩',
      (x, y) => ({
        name: x,
        value: y + ' 万',
      }),
    ];

    const labelStyle = {
      autoRotate: false,
      textStyle: { rotate: '90' },
    };

    return (
      <div style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart
            scale={scale}
            width={this.node && this.node.parentNode.clientWidth}
            height={title ? height - 41 : height}
            forceFit={forceFit}
            data={data}
            padding={padding || 'auto'}
          >
            <Axis name="ownerName" label={labelStyle} />
            <Axis name="全年总业绩" min={0} />
            <Tooltip showTitle={false} />
            <Geom type="interval" position="ownerName*全年总业绩" color={color} tooltip={tooltip} >
              <Label
                offset={8}
                textStyle={{ rotate: -30 }}
                content={['全年总业绩', (x) => { return x.toFixed(); }]}
              />
            </Geom>
          </Chart>
        </div>
      </div>
    );
  }
}

