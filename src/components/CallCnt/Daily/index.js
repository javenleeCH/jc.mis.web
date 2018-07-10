import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Row, Col, Table, Card, Alert, Tooltip, Icon } from 'antd';
import Bar from './Bar';
import Cust from './Cust';
import s from './index.less';

@connect(({ callCnt, loading }) => ({ daily: callCnt.daily, loading: loading.models.callCnt }))
export default class Daily extends PureComponent {
  componentDidMount() {
    const { type, date } = this.props;
    this.fetchDaily(type, date);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.fetchDaily(this.props.type, nextProps.date);
    }
    if (this.props.type !== nextProps.type) {
      this.fetchDaily(nextProps.type, this.props.date);
    }
  }

  fetchDaily=(type, date) => {
    const { dispatch } = this.props;
    dispatch({ type: 'callCnt/daily',
      payload: {
        type: type || 1,
        date: date || moment(now()).format('YYYY-MM-DD'),
      } });
  }

  render() {
    const { daily, loading } = this.props;

    const columns = [
      { title: '组别',
        dataIndex: 'deptName',
        align: 'center',
      },
      { title: '客户专员',
        dataIndex: 'userName',
        align: 'center',
      },
      { title: '呼叫表现',
        children: [
          { title: '外拔数量',
            dataIndex: 'dialing',
            align: 'center',
          },
          { title: '通话数量',
            dataIndex: 'calls',
            align: 'center',
          },
          { title: '通话时长(m)',
            dataIndex: 'callTime',
            align: 'center',
          },
          { title: '次均通时(m)',
            dataIndex: 'avg',
            align: 'center',
            render: (text, record) => {
              return record.calls === 0 ? '' : (record.callTime / record.calls).toFixed(2);
            },
          },
          { title: (<Tooltip placement="top" title="通时均值:通话时长日均值（因特殊情况导致当日通时不到60分钟者不含在内）">通时均值(m) <Icon type="question-circle-o" /></Tooltip>),
            dataIndex: 'avgTime',
            align: 'center',
            render: (text) => {
              return text === 0 ? '' : text.toFixed(0);
            },
          },
          { title: '接通率',
            dataIndex: 'rate',
            align: 'center',
            render: (text, record) => {
              return record.dialing === 0 ? '' : ((record.calls / record.dialing) * 100).toFixed(0) + '%';
            },
          },
        ],
      },
      { title: '业绩表现',
        children: [
          { title: '青铜',
            dataIndex: 'bronze',
            align: 'center',
          },
          { title: '玄铁',
            dataIndex: 'darksteel',
            align: 'center',
          },
          { title: '邀约',
            dataIndex: 'invite',
            align: 'center',
          },
          { title: '推送',
            dataIndex: 'push',
            align: 'center',
          },
          { title: '签单交易量',
            dataIndex: 'deal',
            align: 'center',
          },
        ],
      },
    ];

    const types = ['日', '周', '月', '季', '年'];
    const title = types[this.props.type - 1] + ' 活动量表现 [ ' + this.props.date + ' ]';
    return (
      <Card
        bordered={false}
        style={{ marginTop: 10 }}
        title={title}
      >
        <Row gutter={10}>
          <Col xs={24} sm={24}>
            <Bar
              height={300}
              data={daily && daily}
              padding={[30, 50, 50, 60]}
            />
          </Col>
          <Col xs={24} sm={24}>
            <Table
              bordered
              style={{ marginBottom: 10 }}
              size="small"
              loading={loading}
              rowKey={record => record.userId}
              pagination={false}
              columns={columns}
              dataSource={daily && daily}
              rowClassName={(record) => {
                return record.id === 1 ? s.groupRow : record.id === 2 ? s.compRow : '';
              }}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            style={{ paddingTop: '30px' }}
          >
            <Cust
              height={300}
              data={daily && daily}
              padding={[30, 50, 50, 60]}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}
