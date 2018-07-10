import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Card, DatePicker, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import style from './KeyTrace.less';

const { WeekPicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect(({ recruit, loading }) => ({ keyTrace: recruit.keyTrace, loading: loading.models.recruit }))
export default class KeyTrace extends PureComponent {
  state={
    date: moment(now()).format(dateFormat),
  }
  componentDidMount() {
    this.fetchKeyTrace(this.state.date);
  }

  onDateSelect=(date, dateString) => {
    this.setState({ date: dateString });
    this.fetchKeyTrace(dateString);
  }

  fetchKeyTrace=(date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'recruit/keyTrace',
      payload: date || moment(now()).format('YYYY-MM-DD') });
  }

  render() {
    const { keyTrace, loading } = this.props;

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        width: 60,
        align: 'center',
        fixed: 'left',
        render: (text, record, index) => {
          return index + 1;
        },
      }, {
        title: '部门',
        dataIndex: 'applyOrganLabel',
        align: 'center',
        fixed: 'left',
        width: 150,
      }, {
        title: '已发OFFER/入职情况',
        dataIndex: 'entryLog',
        width: 250,
        render: (text) => {
          return (
            <div>
              {
              text && text.map((item, index) => {
                return (<span key={'e' + index}><i>{item.main}</i>：{item.desc}<br /></span>);
              })
            }
            </div>);
        },
      }, {
        title: 'OFFER谈判中的候选人',
        dataIndex: 'offerLog',
        width: 250,
        render: (text) => {
          return (
            <div>
              {
              text && text.map((item, index) => {
                return (<span key={'e' + index}><i>{item.main}</i>：{item.desc}<br /></span>);
              })
            }
            </div>);
        },
      }, {
        title: '已面试候选人情况',
        dataIndex: 'interviewLog',
        width: 250,
        render: (text) => {
          return (
            <div>
              {
              text && text.map((item, index) => {
                return (<span key={'e' + index}><i>{item.main}</i>：{item.desc}<br /></span>);
              })
            }
            </div>);
        },
      }, {
        title: '已/待协调面谈时间的候选人',
        dataIndex: 'traceLog',
        width: 250,
        render: (text) => {
          return (
            <div>
              {
              text && text.map((item, index) => {
                return (<span key={'e' + index}><i>{item.main}</i>：{item.desc}<br /></span>);
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
            <Col xs={24} sm={8}>
              <WeekPicker
                style={{ marginTop: 5 }}
                defaultValue={moment(this.state.date, dateFormat)}
                format={dateFormat}
                week
                onChange={this.onDateSelect}
              />
            </Col>
          </Row>
        </Card>
        <Card
          bordered={false}
          style={{ marginTop: 10 }}
          title="周重点候选人跟进表"
          extra={this.state.date}
        >
          <Table
            className={style.tableList}
            style={{ marginBottom: 10 }}
            bordered
            size="small"
            loading={loading}
            rowKey={record => record.applyOrgan}
            pagination={false}
            columns={columns}
            dataSource={keyTrace && keyTrace}
            scroll={{ x: 1210, y: 500 }}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
