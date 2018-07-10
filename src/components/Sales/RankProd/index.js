import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert } from 'antd';
import Pie from './Pie';

@connect(({ sales, loading }) => ({ rankProd: sales.rankProd, loading: loading.models.sales }))
export default class RankProd extends PureComponent {
  componentDidMount() {
    const { type, date } = this.props;
    this.fetchRankProd(type, date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.fetchRankProd(this.props.type, nextProps.date);
    }
    if (this.props.type !== nextProps.type) {
      this.fetchRankProd(nextProps.type, this.props.date);
    }
  }

  fetchRankProd=(type, date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/rankProd',
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
    const { rankProd, loading } = this.props;

    const columns = [
      {
        title: '排名',
        dataIndex: 'rank',
        width: 45,
        align: 'center',
      }, {
        title: '产品',
        dataIndex: 'prod',
      }, {
        title: '成交金额',
        dataIndex: 'amount',
        width: 90,
        align: 'center',
      }, {
        title: '折算业绩',
        dataIndex: 'reduced',
        width: 90,
        align: 'center',
      },
    ];

    const types = ['日', '周', '月', '季', '年'];
    const title = types[this.props.type - 1] + ' 项目业绩排名 [ ' + this.props.date + ' ]';
    return (
      <Card
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
              dataSource={rankProd && rankProd}
              footer={this.buildFooter}
            />
          </Col>
          <Col xs={24} sm={10}>
            <Pie height={300} data={rankProd && rankProd} />
          </Col>
        </Row>
      </Card>
    );
  }
}
