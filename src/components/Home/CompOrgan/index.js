import React, { Component } from 'react';
import { Chart, Geom, Tooltip, Coord, Label, View } from 'bizcharts';
import { DataView } from '@antv/data-set';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../../Charts/autoHeight';


@autoHeight()
export default class CompOrgan extends Component {
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
      height,
      data,
      padding,
    } = this.props;

    const scale = {
      value: {
        nice: false,
      },
    };

    const dv = new DataView().source(data, {
      type: 'hierarchy',
    });
    dv.transform({
      type: 'hierarchy.cluster',
    });
    const cWidth = this.node && this.node.parentNode.clientWidth;
    const mWidth = data.totals * 45;
    return (
      <div style={{ height, overflowX: 'auto', overflowY: 'hidden' }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          <Chart
            data={dv}
            width={cWidth > mWidth ? cWidth : mWidth}
            height={height}
            padding={padding || 'auto'}
            scale={scale}
          >
            <Tooltip showTitle={false} />
            <Coord reflect />
            <View
              data={dv.getAllLinks().map(link => ({
                x: [link.source.x, link.target.x],
                y: [link.source.y, link.target.y],
                source: link.source.id,
                target: link.target.id,
                name: link.target.data.name,
              }))}
            >
              <Geom
                type="edge"
                position="x*y"
                shape="smooth"
                color="grey"
                opacity={0.5}
                tooltip={false}
              />
            </View>
            <View
              data={dv.getAllNodes().map(node => ({
                hasChildren: !!(node.children && node.children.length),
                name: node.data.name,
                value: node.value,
                depth: node.depth,
                x: node.x,
                y: node.y,
              }))}
            >
              <Geom type="point" position="x*y" color={false} size="10" tooltip={false} active={false}>
                <Label
                  offset={0}
                  content="name"
                  htmlTemplate={(text, item) => {
                    const width = item.point.hasChildren ? (text.length + 1) * 10 : 25;
                    const ht = item.point.hasChildren ? 25 : (text.length > 3 ? 85 : 70);
                    return '<span class="title" style="color:#fff;display:block;width: ' + width + 'px;height:' + ht + 'px;border:1px solid #ccc;text-align:center;background:#1890ff;">' + text + '</span>';
                  }}
                />
              </Geom>
            </View>
          </Chart>
        </div>
      </div>
    );
  }
}
