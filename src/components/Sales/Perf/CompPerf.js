import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert } from 'antd';
import CompPie from './CompPie';

@connect(({ sales }) => ({ compPerf: sales.compPerf }))
export default class CompPerf extends PureComponent {
  componentDidMount() {
    const { date } = this.props;
    this.fetchRankProd(date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) { this.fetchRankProd(nextProps.date); }
  }

  fetchRankProd=(date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/compPerf', payload: date || moment(now()).format('YYYY-MM-DD') });
  }

  buildFooter=(data) => {
    let sumA = 0;
    data.forEach((element) => {
      sumA += element.amount;
    });
    return (
      <Alert
        message={<div>【合计】打款金额： <span style={{ color: 'red' }}>{sumA.toFixed(2)}</span> 万元；</div>}
        type="info"
      />
    );
  }

  render() {
    const { compPerf, loading } = this.props;

    const columns = [
      {
        title: '排名',
        dataIndex: 'index',
        width: 45,
        align: 'center',
        render: (text, record, index) => {
          return index + 1;
        },
      }, {
        title: '分公司',
        dataIndex: 'compName',
      }, {
        title: '成交金额',
        dataIndex: 'amount',
        width: 90,
        align: 'center',
        render: (text) => {
          return text.toFixed();
        },
      }, {
        title: '占比',
        dataIndex: 'rate',
        width: 90,
        align: 'center',
        render: (text) => {
          return (text * 100).toFixed(2) + '%';
        },
      },
    ];

    const title = '各分公司打款占比 [ ' + this.props.date + ' ]';
    return (
      <Card
        style={{ marginTop: 10 }}
        title={title}
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
              dataSource={compPerf && compPerf}
              footer={this.buildFooter}
            />
          </Col>
          <Col xs={24} sm={12}>
            <CompPie data={compPerf && compPerf} />
          </Col>
        </Row>
      </Card>
    );
  }
}
