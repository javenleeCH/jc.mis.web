import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert } from 'antd';
import ChainBar from './ChainBar';

@connect(({ sales }) => ({ chain: sales.chain }))
export default class CChain extends PureComponent {
  componentDidMount() {
    const { type, date } = this.props;
    this.fetchChain(type, date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.fetchChain(nextProps.type, nextProps.date);
    }
    if (this.props.type !== nextProps.type) {
      this.fetchChain(nextProps.type, nextProps.date);
    }
  }

  fetchChain=(type, date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/chain',
      payload: {
        type: type || 3,
        date: date || moment(now()).format('YYYY-MM-DD'),
      } });
  }

  buildFooter=(data) => {
    if (data && data.length > 0) {
      const rateA = data[0].amount === 0 ? 0 : data[2].amount / data[0].amount * 100;
      const rateB = data[0].reduced === 0 ? 0 : data[2].reduced / data[0].reduced * 100;
      return (
        <Alert
          message={
            <div>成交金额比率： <span style={{ color: 'red' }}>{rateA.toFixed(2)}%</span> ；折算业绩比率：<span style={{ color: 'red' }}>{rateB.toFixed(2)}%</span> ；
            </div>}
          type="info"
        />
      );
    }
  }

  render() {
    const { type, date, chain, loading } = this.props;

    const columns = [
      {
        title: '时间',
        dataIndex: 'subject',
        align: 'center',
        width: 60,
      }, {
        title: '成交金额',
        dataIndex: 'amount',
        align: 'center',
        width: 90,
        render: (text) => {
          return text && (text[1] - text[0]).toFixed();
        },
      }, {
        title: '折算业绩',
        dataIndex: 'reduced',
        align: 'center',
        width: 90,
        render: (text) => {
          return text && (text[1] - text[0]).toFixed();
        },
      },
    ];

    const types = ['日', '周', '月', '季', '年'];
    const title = types[type - 1] + '业绩/打款 环比 [ ' + date + ' ]';

    return (
      <Fragment>
        <Card
          bordered={false}
          style={{ marginTop: 10 }}
          title={title}
          extra="单位：万元"
        >
          <Row gutter={10}>
            <Col xs={24} sm={24} xl={12}>
              <Table
                style={{ marginBottom: 10 }}
                size="small"
                loading={loading}
                rowKey={record => record.subject}
                pagination={false}
                columns={columns}
                dataSource={chain && chain}
                footer={this.buildFooter}
              />
            </Col>
            <Col xs={24} sm={24} xl={12}>
              <ChainBar
                height={300}
                data={chain && chain}
                padding={[30, 20, 50, 60]}
              />
            </Col>
          </Row>
        </Card>
      </Fragment>
    );
  }
}
