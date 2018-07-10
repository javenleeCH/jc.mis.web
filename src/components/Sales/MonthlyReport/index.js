import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert, Switch } from 'antd';


@connect(({ sales }) => ({ monthly: sales.monthly }))
export default class MonthlyReport extends PureComponent {
  state={
    scroll: { y: 500 },
  }
  componentDidMount() {
    const { date } = this.props;
    this.fetchRank(date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) { this.fetchRank(nextProps.date); }
  }

  fetchRank=(date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/monthly', payload: date || moment(now()).format('YYYY-MM') });
  }

  buildFooter=(data) => {
    let perf = 0;
    let newsPerf = 0;
    let regularPerf = 0;
    let news = 0;
    let vips = 0;
    let calls = 0;
    let interview = 0;
    data.forEach((element) => {
      if (element.type === 0) {
        perf += parseInt(element.perf, 10);
        newsPerf += parseInt(element.newsPerf, 10);
        regularPerf += parseInt(element.regularPerf, 10);
        news += element.news;
        vips += element.vips;
        calls += element.calls;
        interview += element.interview;
      }
    });
    return (
      <Alert
        message={
          <div>【合计】业绩： <span style={{ color: 'red' }}>{perf}</span> 万元(新客户：{newsPerf},老客户：{regularPerf})；
          新客户数：<span style={{ color: 'red' }}>{news}</span>；
          VIP：<span style={{ color: 'red' }}>{vips}</span>；
          见面量：<span style={{ color: 'red' }}>{interview}</span>；
          电话量：<span style={{ color: 'red' }}>{calls}</span>；
          </div>}
        type="info"
      />
    );
  }

  handleScollChange=(enable) => {
    this.setState({ scroll: enable ? { y: 500 } : undefined });
  }


  render() {
    const { monthly, loading } = this.props;

    const columns = [
      {
        title: '分公司',
        dataIndex: 'compName',
        width: 45,
        align: 'center',
      }, {
        title: '部门',
        dataIndex: 'deptName',
        width: 45,
        align: 'center',
      }, {
        title: '理财师',
        dataIndex: 'userName',
        align: 'center',
        width: 60,
      }, {
        title: '业绩',
        children: [{
          title: '总量',
          dataIndex: 'perf',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.perf - b.perf,
          render: (text) => {
            return text.toFixed();
          },
        }, {
          title: '新客户',
          dataIndex: 'newsPerf',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.newsPerf - b.newsPerf,
          render: (text) => {
            return text.toFixed();
          },
        }, {
          title: '老客户',
          dataIndex: 'regularPerf',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.regularPerf - b.regularPerf,
          render: (text) => {
            return text.toFixed();
          },
        }, {
          title: '新客户数',
          dataIndex: 'news',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.news - b.news,
        }],
      }, {
        title: '总工作量',
        children: [{
          title: '见面',
          dataIndex: 'interview',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.interview - b.interview,
        }, {
          title: 'VIP',
          dataIndex: 'vips',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.vips - b.vips,
        }, {
          title: '电话量',
          dataIndex: 'calls',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.calls - b.calls,
        }],
      }, {
      //   title: '团队业绩',
      //   children: [{
      //     title: '共计',
      //     dataIndex: 'teamPerf',
      //     align: 'center',
      //     width: 40,
      //   }, {
      //     title: '人均',
      //     dataIndex: 'avgPerf',
      //     align: 'center',
      //     width: 40,
      //   }],
      // }, {
        title: '本周工作量',
        children: [{
          title: '业绩',
          dataIndex: 'weekPerf',
          align: 'center',
          width: 40,
        }, {
          title: '见面',
          dataIndex: 'weekInterview',
          align: 'center',
          width: 40,
        }, {
          title: 'VIP',
          dataIndex: 'weekVips',
          align: 'center',
          width: 40,
        }, {
          title: '电话量',
          dataIndex: 'weekCalls',
          align: 'center',
          width: 40,
        }],
      }, {
        title: '本月得分',
        dataIndex: 'score',
        align: 'center',
        width: 40,
        sorter: (a, b) => a.score - b.score,
      },
    ];

    const title = '月度汇总业绩&工作量 [ ' + this.props.date + ' ]';
    const tbTitle = () => {
      return (
        <div><Switch checked={!!this.state.scroll} onChange={this.handleScollChange} /> 订住表头</div>
      );
    };

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
              dataSource={monthly && monthly}
              footer={this.buildFooter}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
