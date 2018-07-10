import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Card, DatePicker, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CallAssessTrend from '../../components/CallCnt/Trend';

const { MonthPicker } = DatePicker;
const Option = Select.Option;
const dateFormat = 'YYYY-MM';
@connect(({ user, loading }) => ({ user, loading: loading.models.user }))
export default class Trend extends PureComponent {
  state={
    queryValue: {
      users: [],
      date: moment(now()).format(dateFormat),
    },
  }

  componentDidMount() {
    this.fetchUserOptions();
  }

  onDateSelect=(date, dateString) => {
    const { queryValue } = this.state;
    this.setState({
      queryValue: {
        ...queryValue,
        date: dateString,
      },
    });
  }

  onSelectedUsers = (value) => {
    const { queryValue } = this.state;
    this.setState({
      queryValue: {
        ...queryValue,
        users: value,
      },
    });
  }

  fetchUserOptions = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/options',
      payload: {
        type: 3, ctl: 'callCnt', act: 'trend',
      } });
  }

  render() {
    const { user: { userOptions } } = this.props;
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Row gutter={10}>
            <Col xs={24} sm={8}>
              <Select
                allowClear
                placeholder="--所有坐席--"
                mode="multiple"
                showSearch
                optionFilterProp="children"
                onChange={this.onSelectedUsers}
                style={{ width: '100%' }}
              >
                {userOptions && userOptions.map(d => (
                  <Option
                    key={d.key}
                    value={d.value}
                    disabled={d.disabled}
                  >{d.title}
                  </Option>))}
              </Select>
            </Col>
            <Col xs={24} sm={8}>
              <MonthPicker
                defaultValue={moment(this.state.queryValue.date, dateFormat)}
                format={dateFormat}
                onChange={this.onDateSelect}
              />
            </Col>
          </Row>
        </Card>
        <CallAssessTrend query={this.state.queryValue} />
      </PageHeaderLayout>
    );
  }
}
