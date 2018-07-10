import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Card, DatePicker, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MonthlyReport from '../../components/Sales/MonthlyReport';

const { MonthPicker } = DatePicker;

const dateFormat = 'YYYY-MM';
@connect(({ sales, loading }) => ({ sales, loading: loading.models.sales }))
export default class MonthlyRpt extends PureComponent {
  state={
    date: moment(now()).format(dateFormat),
  }

  onDateSelect=(date, dateString) => {
    this.setState({ date: dateString });
  }

  runAssess=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/monthlyRun', payload: this.state.date || moment(now()).format('YYYY-MM') });
  }

  render() {
    const { loading } = this.props;
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
            <Col xs={24} sm={6}>
              <Button loading={loading} onClick={() => { this.runAssess(); }} >没有数据？不准？跑一个</Button>
            </Col>
          </Row>
        </Card>
        <MonthlyReport date={this.state.date} />
      </PageHeaderLayout>
    );
  }
}
