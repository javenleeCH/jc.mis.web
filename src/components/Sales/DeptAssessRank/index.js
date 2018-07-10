import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert } from 'antd';
import Bar from './Bar';


@connect(({ sales }) => ({ deptAssessRank: sales.deptAssessRank }))
export default class DeptAssessRank extends PureComponent {
  componentDidMount() {
    const { date } = this.props;
    this.fetchRank(date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) { this.fetchRank(nextProps.date); }
  }

  fetchRank=(date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/deptAssessRank', payload: date || moment(now()).format('YYYY-MM') });
  }

  buildFooter=() => {
    return (
      <Alert
        message={
          <div>Tips：因团队相关数据涉及理财师考核数据，运算此算数据时请先确定已经运算过理财师考核排名数据</div>}
        type="info"
      />
    );
  }

  render() {
    const { deptAssessRank, loading } = this.props;

    const columns = [
      {
        title: '部门',
        dataIndex: 'deptName',
        align: 'center',
        width: 60,
      }, {
        title: '员工',
        dataIndex: 'users',
        align: 'center',
        width: 100,
      }, {
        title: '团队业绩',
        children: [{
          title: '目标',
          dataIndex: 'standard',
          align: 'center',
          width: 50,
        }, {
          title: '总业绩',
          dataIndex: 'teamPerf',
          align: 'center',
          width: 50,
        }, {
          title: '排名',
          dataIndex: 'perfRank',
          align: 'center',
          width: 40,
        }, {
          title: '加分',
          dataIndex: 'perfScore',
          align: 'center',
          width: 40,
        }],
      }, {
        title: '业绩完成率',
        children: [{
          title: '完成率',
          dataIndex: 'reachedRate',
          align: 'center',
          width: 50,
          render: (text) => {
            return (text * 100).toFixed(2) + '%';
          },
        }, {
          title: '得分',
          dataIndex: 'reachedScore',
          align: 'center',
          width: 40,
        }],
      }, {
        title: '团队人均工作量得分',
        dataIndex: 'avgAssess',
        align: 'center',
        width: 50,
      }, {
        title: '负责人业绩',
        children: [{
          title: '目标',
          dataIndex: 'leaderStandard',
          align: 'center',
          width: 40,
        }, {
          title: '业绩',
          dataIndex: 'leaderPerf',
          align: 'center',
          width: 40,
        }, {
          title: '得分',
          dataIndex: 'leaderScore',
          align: 'center',
          width: 40,
        }],
      }, {
        title: '加减分',
        dataIndex: 'extraScore',
        align: 'center',
        width: 40,
      }, {
        title: '总分',
        dataIndex: 'totalScore',
        align: 'center',
        width: 40,
      }, {
        title: '奖罚',
        dataIndex: 'penalty',
        align: 'center',
        width: 40,
      }, {
        title: '共计',
        dataIndex: 'total',
        align: 'center',
        width: 40,
      },
    ];

    const title = '部门经理月度考核排名 [ ' + this.props.date + ' ]';

    return (
      <Card
        title={title}
        bordered={false}
        style={{ marginTop: 10 }}
        extra="金额单位：万元"
      >
        <Row gutter={10}>
          <Col xs={24} sm={24}>
            <Table
              style={{ marginBottom: 10 }}
              bordered
              size="small"
              loading={loading}
              rowKey={record => record.rank}
              pagination={false}
              columns={columns}
              dataSource={deptAssessRank && deptAssessRank}
              footer={this.buildFooter}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
