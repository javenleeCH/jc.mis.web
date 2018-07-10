import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Card, Table, Alert, DatePicker, Row, Col } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { MonthPicker } = DatePicker;
const dateFormat = 'YYYY-MM';
@connect(({ sales, loading }) => ({ dueFunds: sales.dueFunds, loading: loading.models.sales }))
export default class DueFundsList extends PureComponent {
  state = {
    date: moment(now()).format(dateFormat),
  }

  componentDidMount() {
    this.fetchDueFunds(this.state.date);
  }

  onDateSelect = (date, dateString) => {
    this.setState({ date: dateString });
    this.fetchDueFunds(dateString);
  };

  fetchDueFunds=(dateString) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/dueFunds', payload: dateString });
  }

  buildFooter=(data) => {
    let sumA = 0;
    data.forEach((element) => {
      sumA += element.amount;
    });
    return (
      <Alert
        message={<div>合计金额： <span style={{ color: 'red' }}>{sumA.toFixed(0)}</span> 万元；</div>}
        type="info"
      />
    );
  }

  render() {
    const { dueFunds, loading } = this.props;

    const columns = [
      { title: '理财师',
        dataIndex: 'userName',
      },
      { title: '合计金额',
        dataIndex: 'amount',
      },
      { title: '项目明细 [到期日期 项目 金额 资产类型]',
        dataIndex: 'details',
        render: (text, record) => {
          return (
            <div>
              {
              text && text.map((item) => {
              return (<span key={record.userId}>{item}<br /></span>);
              })
            }
            </div>);
        },
      },
    ];

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Row gutter={10}>
            <Col xs={24} sm={6}>
              <MonthPicker
                defaultValue={moment(this.state.date, dateFormat)}
                format={dateFormat}
                onChange={this.onDateSelect}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        </Card>
        <Card>
          <Table
            size="small"
            loading={loading}
            rowKey={record => record.userId}
            columns={columns}
            dataSource={dueFunds && dueFunds}
            pagination={false}
            onChange={this.handleTableChange}
            footer={this.buildFooter}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
