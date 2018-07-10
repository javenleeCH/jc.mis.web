import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Card, DatePicker, Button, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ReachedRate from '../../components/Sales/ReachedRate';

const { MonthPicker } = DatePicker;
const Option = Select.Option;

const dateFormat = 'YYYY-MM';
@connect(({ sales, loading }) => ({ sales, loading: loading.models.sales }))
export default class Reached extends PureComponent {
  state={
    type: 1,
    date: moment(now()).format(dateFormat),
  }

  onDateSelect=(date, dateString) => {
    this.setState({ date: dateString });
  }

  onTypeChange=(value) => {
    this.setState({ type: value });
  }

  runReached=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/reachedRun',
      payload: {
        reachedOn: this.state.date || moment(now()).format('YYYY-MM'),
        type: this.state.type,
      },
    });
  }

  render() {
    const { loading } = this.props;
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Row gutter={10}>
            <Col xs={24} sm={8}>
              <Select
                style={{ marginTop: 5 }}
                defaultValue={this.state.type}
                onChange={this.onTypeChange}
              >
                <Option value={1}>分公司</Option>
                <Option value={2}>部门</Option>
                <Option value={3}>个人</Option>
              </Select>
              <MonthPicker
                defaultValue={moment(this.state.date, dateFormat)}
                format={dateFormat}
                onChange={this.onDateSelect}
              />
            </Col>
            <Col xs={24} sm={6}>
              <Button loading={loading} onClick={() => { this.runReached(); }} >没有数据？不准？跑一个</Button>
            </Col>
          </Row>
        </Card>
        <ReachedRate type={this.state.type} date={this.state.date} />
      </PageHeaderLayout>
    );
  }
}
