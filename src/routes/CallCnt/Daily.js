import React, { PureComponent } from 'react';
import moment, { now } from 'moment';
import { Row, Col, Card, DatePicker, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CallAssessDaily from '../../components/CallCnt/Daily';

const Option = Select.Option;
let dateFormat = 'YYYY-MM-DD';
export default class Daily extends PureComponent {
  state={
    type: 2,
    date: moment(now()).format(dateFormat),
  }

  onDateSelect=(date, dateString) => {
    this.setState({ date: dateString });
  }

  onTypeChange=(value) => {
    switch (value) {
      case 2:
        dateFormat = 'YYYY-MM-DD  第W周';
        break;
      case 3:
        dateFormat = 'YYYY-MM';
        break;
      default:
        dateFormat = 'YYYY-MM-DD';
        break;
    }
    this.setState({ type: value });
  }

  render() {
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
        <CallAssessDaily type={this.state.type} date={this.state.date} />
      </PageHeaderLayout>
    );
  }
}
