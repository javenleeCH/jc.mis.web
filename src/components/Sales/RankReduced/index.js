import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert } from 'antd';
import Bar from './Bar';

@connect(({ sales, loading }) => ({ rankReduced: sales.rankReduced, loading: loading.models.sales }))
export default class RankReduced extends PureComponent {
  componentDidMount() {
    const { type, date } = this.props;
    this.fetchRankReduced(type, date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.fetchRankReduced(this.props.type, nextProps.date);
    }
    if (this.props.type !== nextProps.type) {
      this.fetchRankReduced(nextProps.type, this.props.date);
    }
  }

  fetchRankReduced=(type, date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/rankReduced',
      payload: {
        type: type || 1,
        date: date || moment(now()).format('YYYY-MM-DD'),
      } });
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
        message={<div>【合计】成交金额： <span style={{ color: 'red' }}>{sumA}</span> 万元；折算业绩：<span style={{ color: 'red' }}>{sumR.toFixed(2)}</span> 万元；</div>}
        type="info"
      />
    );
  }

  render() {
    const { rankReduced, loading } = this.props;

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
        title: '产品',
        dataIndex: 'prods',
        render: (text) => {
          return text && text.join('、');
        },
      }, {
        title: '成交金额',
        dataIndex: 'amount',
        align: 'center',
        width: 90,
      }, {
        title: '折算业绩',
        dataIndex: 'reduced',
        align: 'center',
        width: 90,
      },
    ];

    const types = ['日', '周', '月', '季', '年'];
    const title = types[this.props.type - 1] + ' 理财师业绩排名 [ ' + this.props.date + ' ]';
    return (
      <Card
        bordered={false}
        style={{ marginTop: 10 }}
        title={title}
        extra="单位：万元"
      >
        <Row gutter={10}>
          <Col xs={24} sm={12}>
            <Table
              style={{ marginBottom: 10 }}
              size="small"
              loading={loading}
              rowKey={record => record.rank}
              pagination={false}
              columns={columns}
              dataSource={rankReduced && rankReduced}
              footer={this.buildFooter}
            />
          </Col>
          <Col xs={24} sm={11}>
            <Bar
              data={rankReduced && rankReduced}
              padding={[20, 100, 20, 70]}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
