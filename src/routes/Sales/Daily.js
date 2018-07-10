import React, { PureComponent } from 'react';
import moment, { now } from 'moment';
import { Row, Col, Card, DatePicker, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import RankReduced from '../../components/Sales/RankReduced';
import RankProd from '../../components/Sales/RankProd';

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
export default class Daily extends PureComponent {
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
        <RankReduced type={this.state.type} date={this.state.date} />
        <RankProd type={this.state.type} date={this.state.date} />
      </PageHeaderLayout>
    );
  }
}
