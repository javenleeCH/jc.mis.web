import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert, Switch } from 'antd';
import Bar from './Bar';

@connect(({ sales }) => ({ yearlyRank: sales.yearlyRank }))
export default class YlyRank extends PureComponent {
  state={
    scroll: { y: 500 },
    columns: [
      { title: '排名', dataIndex: 'rank', align: 'center', width: 45 },
      { title: '理财师', dataIndex: 'ownerName', align: 'center', width: 60 }],
  }
  componentDidMount() {
    const { date } = this.props;
    this.fetchRank(date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) { this.fetchRank(nextProps.date); }
  }

  fetchRank=(date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/yearlyRank', payload: date || moment(now()).format('YYYY') })
      .then(() => {
        this.reBuildColumns();
      });
  }

  reBuildColumns=() => {
    const { yearlyRank } = this.props;
    const newCols = [
      { title: '排名', dataIndex: 'rank', align: 'center', width: 45 },
      { title: '理财师', dataIndex: 'ownerName', align: 'center', width: 60 }];
    if (yearlyRank && yearlyRank.length > 0) {
      for (const index in yearlyRank[0]) {
        if (index !== 'rank' && index !== 'ownerName' && index !== 'ownerId') {
          newCols.push({
            title: index,
            dataIndex: index,
            align: 'center',
            width: 90,
            render: (text) => {
              return text.toFixed();
            },
          });
        }
      }
      this.setState({ columns: newCols });
    }
  }

  buildFooter=(data) => {
    let sumA = 0.0;
    data.forEach((element) => {
      sumA += element.全年总业绩;
    });
    const rate = sumA / 3800;
    return (
      <Alert
        message={<div>【合计】全年总业绩： <span style={{ color: 'red' }}>{sumA.toFixed(2)}</span> 万元；中财一局总目标完成率：{rate.toFixed(2)}% (基于38亿)</div>}
        type="info"
      />
    );
  }

  handleScollChange=(enable) => {
    this.setState({ scroll: enable ? { y: 500 } : undefined });
  }

  render() {
    const { yearlyRank, loading } = this.props;
    const { columns } = this.state;

    const title = '年度业绩排名 [ ' + this.props.date + ' ]';
    const tbTitle = () => {
      return (
        <div><Switch checked={!!this.state.scroll} onChange={this.handleScollChange} /> 订住表头</div>
      );
    };

    return (
      <Card
        bordered={false}
        style={{ marginTop: 10 }}
        title={title}
        extra="单位：万元"
      >
        <Row gutter={10}>
          <Col xs={24} sm={24}>
            <Bar
              height={350}
              data={yearlyRank && yearlyRank}
              padding={[30, 20, 60, 50]}
            />
          </Col>
          <Col xs={24} sm={24}>
            <Table
              title={tbTitle}
              showHeader
              scroll={this.state.scroll}
              style={{ marginBottom: 10 }}
              size="small"
              loading={loading}
              rowKey={record => record.rank}
              pagination={false}
              columns={columns}
              dataSource={yearlyRank && yearlyRank}
              footer={this.buildFooter}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
