import React, { PureComponent } from 'react';
import moment, { now } from 'moment';
import { Row, Col, Card, DatePicker } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import MonthUserRank from '../../components/Sales/MonthUserRank';

const { MonthPicker } = DatePicker;

const dateFormat = 'YYYY-MM';
export default class MthUsrRank extends PureComponent {
  state={
    date: moment(now()).format(dateFormat),
  }

  onDateSelect=(date, dateString) => {
    this.setState({ date: dateString });
  }

  render() {
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
        <MonthUserRank date={this.state.date} />
      </PageHeaderLayout>
    );
  }
}
