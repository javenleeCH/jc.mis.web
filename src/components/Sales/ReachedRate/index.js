import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert, Switch } from 'antd';
import Bar from './Bar';

@connect(({ sales }) => ({ reached: sales.reached }))
export default class ReachedRate extends PureComponent {
  state={
    scroll: { y: 500 },
  }
  componentDidMount() {
    const { type, date } = this.props;
    this.fetchReached(type, date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) { this.fetchReached(this.props.type, nextProps.date); }
    if (this.props.type !== nextProps.type) { this.fetchReached(nextProps.type, this.props.date); }
  }

  fetchReached=(type, date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/reachedList',
      payload: {
        reachedOn: date || moment(now()).format('YYYY-MM'),
        type,
      },
    });
  }

  buildFooter=(data) => {
    let sumR = 0;
    data.forEach((element) => {
      sumR += element.reduced;
    });
    const rate = sumR / (3800 / 12);
    return (
      <Alert
        message={<div>【合计】折算业绩：<span style={{ color: 'red' }}>{sumR.toFixed(2)}</span> 万元；中财一局月目标完成率：{rate.toFixed(2)}% (基于38亿/12月)</div>}
        type="info"
      />
    );
  }

  handleScollChange=(enable) => {
    this.setState({ scroll: enable ? { y: 500 } : undefined });
  }

  render() {
    const { reached, loading } = this.props;

    const columns = [
      {
        title: '分公司/部门',
        dataIndex: 'deptName',
        align: 'center',
        width: 40,
        render: (text, record) => {
          if (record.latitude === 1030) { return record.compName; } else { return text; }
        },
      }, {
        title: '员工 [考核人数]',
        dataIndex: 'employees',
        width: 150,
      },
      {
        title: '已完成业绩',
        children: [{
          title: '总业绩',
          dataIndex: 'reduced',
          align: 'center',
          width: 50,
          sorter: (a, b) => a.reduced - b.reduced,
          render: (text) => {
            return text.toFixed();
          },
        }, {
          title: '人均业绩',
          dataIndex: 'userNum',
          align: 'center',
          width: 50,
          sorter: (a, b) => (a.reduced / a.userNum) - (b.reduced / b.userNum),
          render: (text, record) => {
            if (record.latitude === 1030) {
              return record.reduced;
            } else { return (record.reduced / text).toFixed(); }
          },
        }],
      }, {
        title: '月实际目标',
        children: [{
          title: '实际目标',
          dataIndex: 'standard',
          align: 'center',
          width: 50,
          render: (text) => {
            return text.toFixed();
          },
        }, {
          title: '差额',
          dataIndex: 'spread',
          align: 'center',
          width: 50,
          render: (text, record) => {
            return (record.standard - record.reduced).toFixed();
          },
        }],
      }, {
        title: '月挑战目标',
        children: [{
          title: '挑战目标',
          dataIndex: 'challenge',
          align: 'center',
          width: 50,
          render: (text) => {
            return text.toFixed();
          },
        }, {
          title: '差额',
          dataIndex: 'spread1',
          align: 'center',
          width: 50,
          render: (text, record) => {
            return (record.challenge - record.reduced).toFixed();
          },
        }],
      }, {
        title: '月目标完成率',
        children: [{
          title: '实际',
          dataIndex: 'reachedRate',
          align: 'center',
          width: 50,
          sorter: (a, b) => a.reachedRate - b.reachedRate,
          render: (text) => {
            return (text * 100).toFixed(2) + '%';
          },
        }, {
          title: '挑战',
          dataIndex: 'dareRate',
          align: 'center',
          width: 50,
          sorter: (a, b) => a.dareRate - b.dareRate,
          render: (text) => {
            return (text * 100).toFixed(2) + '%';
          },
        },
        ] }, {
        title: '年目标完成率',
        children: [{
          title: '实际',
          dataIndex: 'yearlyRate',
          align: 'center',
          width: 50,
          sorter: (a, b) => a.yearlyRate - b.yearlyRate,
          render: (text) => {
            return (text * 100).toFixed(2) + '%';
          },
        }, {
          title: '挑战',
          dataIndex: 'yearlyDareRate',
          align: 'center',
          width: 50,
          sorter: (a, b) => a.yearlyDareRate - b.yearlyDareRate,
          render: (text) => {
            return (text * 100).toFixed(2) + '%';
          },
        },
        ] },
    ];

    const types = ['', '分公司', '部门', '个人'];
    const title = types[this.props.type] + '业绩目标完成率 [ ' + this.props.date + ' ]';
    const tbTitle = () => {
      return (
        <div><Switch checked={!!this.state.scroll} onChange={this.handleScollChange} /> 订住表头</div>
      );
    };

    return (
      <Card
        bordered={false}
        style={{ marginTop: 10 }}
        title={title}
        extra="单位：万元"
      >
        <Row gutter={10}>
          <Col xs={24} sm={24}>
            <Bar
              data={reached && reached}
              height={430}
              padding={[20, 60, 100, 70]}
            />
          </Col>
          <Col xs={24} sm={24}>
            <Table
              title={tbTitle}
              showHeader
              scroll={this.state.scroll}
              style={{ marginBottom: 10 }}
              bordered
              size="small"
              loading={loading}
              rowKey={record => record.id}
              pagination={false}
              columns={columns}
              dataSource={reached && reached}
              footer={this.buildFooter}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
