import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert, Switch } from 'antd';


@connect(({ sales, loading }) => ({ assessRank: sales.assessRank, loading: loading.models.sales }))
export default class AssessRank extends PureComponent {
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
    dispatch({ type: 'sales/assessRank', payload: date || moment(now()).format('YYYY-MM') });
  }

  buildFooter=(data) => {
    let perf = 0;
    let vips = 0;
    let calls = 0;
    let deals = 0;
    data.forEach((element) => {
      perf += parseInt(element.actualPerf, 10);
      vips += element.actualVip;
      calls += element.actualCall;
      deals += element.actualDeal;
    });
    return (
      <Alert
        message={
          <div>【合计】业绩： <span style={{ color: 'red' }}>{perf}</span> 万元；VIP：<span style={{ color: 'red' }}>{vips}</span>；
          电话量：<span style={{ color: 'red' }}>{calls}</span>；新成交客户：<span style={{ color: 'red' }}>{deals}</span>；
          </div>}
        type="info"
      />
    );
  }

  handleScollChange=(enable) => {
    this.setState({ scroll: enable ? { y: 500 } : undefined });
  }

  render() {
    const { assessRank, loading } = this.props;

    const columns = [
      {
        title: '排名',
        dataIndex: 'rank',
        width: 45,
        align: 'center',
      }, {
        title: '理财师',
        dataIndex: 'userName',
        align: 'center',
        width: 60,
      }, {
        title: '岗位',
        dataIndex: 'positionLabel',
        align: 'center',
        width: 60,
      }, {
        title: '入职信息',
        children: [{
          title: '日期',
          dataIndex: 'entryDate',
          align: 'center',
          width: 60,
          render: (text) => {
            return (moment(text).format('YYYY-MM-DD'));
          },
        }, {
          title: '天数',
          dataIndex: 'workingDays',
          align: 'center',
          width: 40,
        }, {
          title: '年限',
          dataIndex: 'workingYears',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.workingYears - b.workingYears,
        }],
      }, {
        title: '业绩（上不封顶）',
        children: [{
          title: '标准',
          dataIndex: 'normPerf',
          align: 'center',
          width: 40,
          render: (text) => {
            return text.toFixed();
          },
        }, {
          title: '实际',
          dataIndex: 'actualPerf',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.actualPerf - b.actualPerf,
          render: (text) => {
            return text.toFixed();
          },
        }, {
          title: '得分',
          dataIndex: 'perfScore',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.perfScore - b.perfScore,
          render: (text) => {
            return text.toFixed();
          },
        }],
      }, {
        title: 'VIP（满分100）',
        children: [{
          title: '标准',
          dataIndex: 'normVip',
          align: 'center',
          width: 40,
        }, {
          title: '实际',
          dataIndex: 'actualVip',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.actualVip - b.actualVip,
        }, {
          title: '得分',
          dataIndex: 'vipScore',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.vipScore - b.vipScore,
        }],
      }, {
        title: '电话量（满分100）',
        children: [{
          title: '标准',
          dataIndex: 'normCall',
          align: 'center',
          width: 40,
        }, {
          title: '实际',
          dataIndex: 'actualCall',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.actualCall - b.actualCall,
        }, {
          title: '得分',
          dataIndex: 'callScore',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.callScore - b.callScore,
        }],
      }, {
        title: '新成交客户（满分100）',
        children: [{
          title: '标准',
          dataIndex: 'normDeal',
          align: 'center',
          width: 40,
        }, {
          title: '实际',
          dataIndex: 'actualDeal',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.actualDeal - b.actualDeal,
        }, {
          title: '得分',
          dataIndex: 'dealScore',
          align: 'center',
          width: 40,
          sorter: (a, b) => a.dealScore - b.dealScore,
        }],
      }, {
        title: '加减分',
        dataIndex: 'extraScore',
        align: 'center',
        width: 40,
      }, {
        title: '总分',
        dataIndex: 'total',
        align: 'center',
        width: 40,
        sorter: (a, b) => a.total - b.total,
      },
    ];

    const title = '理财师月度考核排名 [ ' + this.props.date + ' ]';
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
              rowKey={record => record.rank}
              pagination={false}
              columns={columns}
              dataSource={assessRank && assessRank}
              footer={this.buildFooter}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
