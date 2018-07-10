import React from 'react';
import { Chart, Geom, Tooltip, Coord, Label, Legend, Guide } from 'bizcharts';
import { DataView } from '@antv/data-set';
import autoHeight from '../autoHeight';

const { Text } = Guide;

@autoHeight()
export default class Funnel extends React.Component {
  render() {
    const {
      height,
      padding,
    } = this.props;
    let data = this.props.data || [];
    if (data.length === 0) {
      data = [{ step: 1, subject: '简历', total: 0, linkRate: 0, integralRate: 0 },
        { step: 2, subject: '跟进', total: 0, linkRate: 0, integralRate: 0 },
        { step: 3, subject: '初试', total: 0, linkRate: 0, integralRate: 0 },
        { step: 4, subject: '复试', total: 0, linkRate: 0, integralRate: 0 },
        { step: 5, subject: '终试', total: 0, linkRate: 0, integralRate: 0 },
        { step: 6, subject: '谈薪', total: 0, linkRate: 0, integralRate: 0 },
        { step: 7, subject: 'OFFER', total: 0, linkRate: 0, integralRate: 0 },
        { step: 8, subject: '到岗', total: 0, linkRate: 0, integralRate: 0 },
      ];
    }
    const dv = new DataView().source(data);
    dv.transform({
      type: 'percent',
      field: 'integralRate',
      dimension: 'subject',
      as: 'percent',
    });
    const cols = { percent: { nice: false } };
    const tooltipFormat = ['subject*total*linkRate*integralRate',
      (subject, total, linkRate, integralRate) => {
        return {
          name: subject,
          total,
          link: linkRate + '%',
          integral: integralRate + '%',
        };
      }];

    const colors = ['subject', ['#BAE7FF', '#69C0FF', '#40A9FF', '#1890FF', '#005FFF', '#0050FB', '#0050B3', '#4400cc']];

    return (
      <Chart
        width={height}
        height={height}
        padding={padding}
        data={dv.rows}
        scale={cols}
        forceFit
      >
        <Tooltip showTitle={false} itemTpl='<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}：{total}<br/><span style="padding-left: 16px">环节转化率:{link}</span><br/><span style="padding-left: 16px">整体转化率:{integral}</span></li>' />
        <Coord type="rect" transpose scale={[1, -1]} />
        <Legend offsetX={-25} />
        <Guide >
          {data.map((obj) => {
          return (
            <Text
              top
              key={obj.step}
              position={{ subject: obj.subject, percent: 'median' }}
              content={obj.integralRate + '%'}
              style={{
                fill: '#f11',
                fontSize: '12',
                textAlign: 'center',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)' }}
            />
            );
          })}
        </Guide>
        <Geom
          type="intervalSymmetric"
          position="subject*percent"
          shape="funnel"
          color={colors}
          tooltip={tooltipFormat}
        >
          <Label
            content={['subject*total', (subject, total) => { return subject + '：' + total; }]}
            offset={25}
            labeLine={{ lineWidth: 1, stroke: 'rgba(255, 0, 0, 0.15)' }}
          />
        </Geom>
      </Chart>
    );
  }
}
