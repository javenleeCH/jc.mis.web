import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Card, DatePicker, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { WeekPicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
@connect(({ recruit, loading }) => ({ workload: recruit.workload, loading: loading.models.recruit }))
export default class Workload extends PureComponent {
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
    dispatch({ type: 'recruit/workload',
      payload: date || moment(now()).format('YYYY-MM-DD') });
  }

  render() {
    const { workload, loading } = this.props;

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
        title: '岗位',
        dataIndex: 'name',
        align: 'center',
        fixed: 'left',
        width: 150,
      }, {
        title: '人才信息/简历收集数',
        dataIndex: 'resumes',
        align: 'center',
        width: 150,
        render: (text) => {
          return text === 0 ? '' : text;
        },
      }, {
        title: '电话沟通数',
        dataIndex: 'traces',
        align: 'center',
        width: 100,
        render: (text) => {
          return text === 0 ? '' : text;
        },
      }, {
        title: '保持跟进数',
        dataIndex: 'flows',
        align: 'center',
        width: 100,
        render: (text) => {
          return text === 0 ? '' : text;
        },
      }, {
        title: '初面人数',
        dataIndex: 'intv1sts',
        align: 'center',
        width: 100,
        render: (text) => {
          return text === 0 ? '' : text;
        },
      }, {
        title: '复面人数',
        dataIndex: 'intv2nd',
        align: 'center',
        width: 100,
        render: (text) => {
          return text === 0 ? '' : text;
        },
      }, {
        title: '终面人数',
        dataIndex: 'intvlsts',
        align: 'center',
        width: 100,
        render: (text) => {
          return text === 0 ? '' : text;
        },
      }, {
        title: '谈薪人数',
        dataIndex: 'salaries',
        align: 'center',
        width: 100,
        render: (text) => {
          return text === 0 ? '' : text;
        },
      }, {
        title: '已OFFER人数',
        dataIndex: 'offers',
        align: 'center',
        width: 100,
        render: (text) => {
          return text === 0 ? '' : text;
        },
      }, {
        title: '已入职人数',
        dataIndex: 'entries',
        align: 'center',
        width: 100,
        render: (text) => {
          return text === 0 ? '' : text;
        },
      }, {
        title: '入职人员明细',
        dataIndex: 'entDesc',
        width: 200,
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
          title="周 招聘工作汇总"
          extra={this.state.date}
        >
          <Table
            style={{ marginBottom: 10 }}
            bordered
            size="small"
            loading={loading}
            rowKey={record => record.applyOrgan}
            pagination={false}
            columns={columns}
            dataSource={workload && workload}
            scroll={{ x: 1360 }}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
