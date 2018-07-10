import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert, DatePicker, Select } from 'antd';
import Bar from './Bar';

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
@connect(({ sales }) => ({ newIntr: sales.newIntr }))
export default class NewIntr extends PureComponent {
 state={
   type: 3,
   date: moment(now()).format(dateFormat),
 }

 componentDidMount() {
   this.fetchNewIntr(this.state.type, this.state.date);
 }

  onDateSelect=(date, dateString) => {
    this.setState({ date: dateString });
    this.fetchNewIntr(this.state.type, dateString);
  }

  onTypeChange=(value) => {
    this.setState({ type: value });
    this.fetchNewIntr(value, this.state.date);
  }

  fetchNewIntr=(type, date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/newIntr',
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
        message={<div>【合计】成交金额： <span style={{ color: 'red' }}>{sumA.toFixed(2)}</span> 万元；折算业绩：<span style={{ color: 'red' }}>{sumR.toFixed(2)}</span> 万元；</div>}
        type="info"
      />
    );
  }

  render() {
    const { newIntr, loading } = this.props;

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
        title: '[日期] 产品：业绩/打款 [来源渠道]',
        dataIndex: 'prods',
        render: (text, record) => {
          return (
            <div>
              {
              text && text.map((item, index) => {
              return (<span key={record.userId + '' + index}>{item}<br /></span>);
              })
            }
            </div>);
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
    const title = types[this.state.type - 1] + '新客户及来源 [ ' + this.state.date + ' ]';

    return (
      <Fragment>
        <Card bordered={false}>
          <Row gutter={10}>
            <Col xs={24} sm={24}>
              <Select
                style={{ marginTop: 5 }}
                defaultValue={this.state.type}
                onChange={this.onTypeChange}
              >
                <Option value={1}>日</Option>
                <Option value={2}>周</Option>
                <Option value={3}>月</Option>
                <Option value={4}>季</Option>
                <Option value={5}>年</Option>
              </Select>
              <DatePicker
                style={{ marginTop: 5 }}
                defaultValue={moment(this.state.date, dateFormat)}
                format={dateFormat}
                onChange={this.onDateSelect}
              />
            </Col>
          </Row>
        </Card>
        <Card
          bordered={false}
          style={{ marginTop: 10 }}
          title={title}
          extra="单位：万元"
        >
          <Row gutter={10}>
            <Col xs={24} sm={24} xl={14}>
              <Table
                style={{ marginBottom: 10 }}
                size="small"
                loading={loading}
                rowKey={record => record.rank}
                pagination={false}
                columns={columns}
                dataSource={newIntr && newIntr}
                footer={this.buildFooter}
              />
            </Col>
            <Col xs={24} sm={24} xl={10}>
              <Bar
                data={newIntr && newIntr}
                padding={[20, 60, 20, 70]}
              />
            </Col>
          </Row>
        </Card>
      </Fragment>
    );
  }
}
