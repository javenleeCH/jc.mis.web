import React, { PureComponent } from 'react';
import moment, { now } from 'moment';
import { Row, Col, Card, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import YlyRank from '../../components/Sales/YlyRank';

const Option = Select.Option;
const dateFormat = 'YYYY';
export default class YearlyRank extends PureComponent {
  state={
    date: moment(now()).format(dateFormat),
  }

  onDateSelect=(date) => {
    this.setState({ date });
  }

  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <Row gutter={10}>
            <Col xs={24} sm={6}>
              <Select
                defaultValue={this.state.date}
                onChange={this.onDateSelect}
                style={{ width: '100%' }}
              >
                <Option key={2018} value={2018}>2018年</Option>
                <Option key={2018} value={2017}>2017年</Option>
                <Option key={2018} value={2016}>2016年</Option>
              </Select>
            </Col>
          </Row>
        </Card>
        <YlyRank date={this.state.date} />
      </PageHeaderLayout>
    );
  }
}
