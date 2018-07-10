import React, { PureComponent } from 'react';
import { DataView } from '@antv/data-set';
import { Row, Col } from 'antd';
import { Chart, Tooltip, Geom, Legend, Coord, Guide, Label } from 'bizcharts';

const { Text } = Guide;

export default class CustRating extends PureComponent {
  render() {
    const { data } = this.props;
    let fData = [
      { item: '客户数', value: 0 },
      { item: '重点跟踪', value: 0 },
      { item: '玄铁', value: 0 },
      { item: '青铜', value: 0 },
      { item: '成交', value: 0 },
    ];
    let pData = [
      { item: '客户数', value: 0 },
      { item: '重点跟踪', value: 0 },
      { item: '玄铁', value: 0 },
      { item: '青铜', value: 0 },
      { item: '成交', value: 0 },
    ];
    if (data && data.userId) {
      fData = [];
      fData.push({ item: '客户数', value: data.total });
      fData.push({ item: '重点跟踪', value: data.priority });
      fData.push({ item: '玄铁', value: data.darksteel });
      fData.push({ item: '青铜', value: data.bronze });
      fData.push({ item: '成交', value: data.deal });

      pData = [];
      pData.push({ item: '白银', value: data.silver });
      pData.push({ item: '黄金', value: data.gold });
      pData.push({ item: '白金', value: data.platinum });
      pData.push({ item: '钻石', value: data.diamond });
      pData.push({ item: '超钻', value: data.overDiamond });
    }
    const dvFul = new DataView().source(fData);
    dvFul.transform({
      type: 'percent',
      field: 'value',
      dimension: 'item',
      as: 'percent',
    });
    const dvPie = new DataView().source(pData);
    dvPie.transform({
      type: 'percent',
      field: 'value',
      dimension: 'item',
      as: 'percent',
    });

    const scale = {
      percent: {
        nice: false,
      },
    };
    const scaleP = {
      percent: {
        nice: false,
      },
    };

    return (
      <Row gutter={5}>
        <Col xs={12} sm={12}>
          <Chart
            height={120}
            data={dvFul.rows}
            scale={scale}
            padding={[0, 0, 0, 0]}
            forceFit
          >
            <Tooltip showTitle={false} itemTpl='<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/><span style="padding-left: 16px">人数：{value}</span></li>' />
            <Coord type="rect" transpose scale={[1, -1]} />
            <Legend position="left" offsetX={-20} offsetY={5} />
            <Guide >
              {dvFul.rows.map((obj, index) => {
              return (
                <Text
                  top
                  key={index}
                  position={{ item: obj.item, percent: 'median' }}
                  content={obj.value}
                  style={{
                    fill: '#fff',
                    fontSize: '12',
                    textAlign: 'center',
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .65)' }}
                />
                  );
                })}
            </Guide>
            <Geom
              type="intervalSymmetric"
              position="item*percent"
              shape="funnel"
              color="item"
              tooltip={['item*value', (item, value) => {
                return {
                  name: item,
                  value,
                };
              }]}
            />
          </Chart>
        </Col>
        <Col xs={12} sm={12}>
          <Chart
            height={120}
            data={dvPie}
            scale={scaleP}
            padding={[0, 0, 10, 0]}
            forceFit
          >
            <Coord type="theta" innerRadius={0.1} />
            <Tooltip
              showTitle={false}
              itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
            <Geom
              type="intervalStack"
              position="percent"
              color="item"
              tooltip={['item*value', (item, value) => {
                return {
                  name: item,
                  value,
                };
              }]}
              style={{ lineWidth: 5, stroke: '#fff' }}
            >
              <Label
                content={['item*value', (item, value) => {
                  return `${item}:${value}`;
                }]}
                offset={-20}
                textStyle={{
                  rotate: 0,
                  textAlign: 'center',
                  shadowBlur: 2,
                  shadowColor: 'rgba(0, 0, 0, .45)',
                }}
              />
            </Geom>
          </Chart>
        </Col>
      </Row>
    );
  }
}
