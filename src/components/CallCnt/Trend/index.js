import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert } from 'antd';
import Calls from './Calls';
import Cust from './Cust';

@connect(({ callCnt, loading }) => ({ trend: callCnt.trend, loading: loading.models.callCnt }))
export default class Trend extends PureComponent {
  componentDidMount() {
    const { query } = this.props;
    this.fetchTrend(query);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.query !== nextProps.query) {
      this.fetchTrend(nextProps.query);
    }
  }

  fetchTrend=(query) => {
    const { dispatch } = this.props;
    dispatch({ type: 'callCnt/trend',
      payload: query });
  }

  render() {
    const { trend, loading } = this.props;

    const title = ' 活动量趋势 [ ' + this.props.query.date + ' ]';
    return (
      <Card
        bordered={false}
        style={{ marginTop: 10 }}
        title={title}
      >
        <Row gutter={10}>
          <Col xs={24} sm={24}>
            <Calls
              height={300}
              data={trend && trend}
              padding={[30, 50, 50, 60]}
            />
          </Col>
          <Col xs={24} sm={24}>
            <Cust
              height={300}
              data={trend && trend}
              padding={[30, 50, 50, 60]}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
