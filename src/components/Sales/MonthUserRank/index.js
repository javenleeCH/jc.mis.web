import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert } from 'antd';
import Bar from './Bar';

@connect(({ sales }) => ({ mthUsrRank: sales.mthUsrRank }))
export default class MonthUserRank extends PureComponent {
  componentDidMount() {
    const { date } = this.props;
    this.fetchRank(date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) { this.fetchRank(nextProps.date); }
  }

  fetchRank=(date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/mthUsrRank', payload: date || moment(now()).format('YYYY-MM') });
  }

  buildFooter=(data) => {
    let sumA = 0;
    let sumR = 0;
    data.forEach((element) => {
      sumA += element.amount;
      sumR += element.reduced;
    });
    return (
      <Alert
        message={
          <div>【合计】成交金额： <span style={{ color: 'red' }}>{sumA}</span> 万元；折算业绩：<span style={{ color: 'red' }}>{sumR.toFixed(2)}</span> 万元；
          </div>}
        type="info"
      />
    );
  }

  render() {
    const { mthUsrRank, loading } = this.props;

    const columns = [
      {
        title: '排名',
        dataIndex: 'rank',
        width: 45,
        align: 'center',
      }, {
        title: '理财师',
        dataIndex: 'ownerName',
        align: 'center',
        width: 60,
      }, {
        title: '成交金额',
        dataIndex: 'amount',
        align: 'center',
        width: 90,
        render: (text) => {
          return text.toFixed();
        },
      }, {
        title: '折算业绩',
        dataIndex: 'reduced',
        align: 'center',
        width: 90,
        render: (text) => {
          return text.toFixed();
        },
      },
    ];

    const title = '月度业绩排名 [ ' + this.props.date + ' ]';

    return (
      <Card
        title={title}
        bordered={false}
        style={{ marginTop: 10 }}
        extra="单位：万元"
      >
        <Row gutter={10}>
          <Col xs={24} sm={10}>
            <Table
              style={{ marginBottom: 10 }}
              size="small"
              loading={loading}
              rowKey={record => record.rank}
              pagination={false}
              columns={columns}
              dataSource={mthUsrRank && mthUsrRank}
              footer={this.buildFooter}
            />
          </Col>
          <Col xs={24} sm={14}>
            <Bar
              data={mthUsrRank && mthUsrRank}
              padding={[20, 60, 20, 70]}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
