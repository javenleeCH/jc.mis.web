import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment, { now } from 'moment';
import { Card, Table, Button, Divider, Popconfirm, DatePicker, Col, Row, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
@connect(({ callCnt, loading }) =>
  ({ callAssess: callCnt.callAssess, loading: loading.models.callCnt }))
export default class WorkloadList extends PureComponent {
  state = {
    queryValue: {
      page: 1,
      size: 20,
      type: 2,
      date: moment(now()).format(dateFormat),
      keyword: '',
      sorter: 'traceOn',
      asc: false,
    },
  }

  componentDidMount() {
    this.fetchCallAssess();
  }

  onDateSelect=(date, dateString) => {
    const { queryValue } = this.state;
    this.setState({ queryValue: { ...queryValue, page: 1, date: dateString } },
      () => { this.fetchCallAssess(); });
  }

  onTypeChange=(value) => {
    const { queryValue } = this.state;
    this.setState({ queryValue: { ...queryValue, page: 1, type: value } },
      () => { this.fetchCallAssess(); });
  }

  fetchCallAssess=() => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'callCnt/callAssess', payload: queryValue });
  }

  handleAdd=() => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/callCnt/workloadDtl/0'));
  }

  handleEdit= (record) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/callCnt/workloadDtl/' + record.id));
  }

  handleDelete=(id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'callCnt/callAssessDelete', payload: id }).then(() => {
      this.fetchCallAssess();
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { queryValue } = this.state;
    queryValue.page = pagination.current;
    if (sorter.field) {
      queryValue.sorter = sorter
        .field
        .replace('Label', '');
      queryValue.asc = sorter.order !== 'descend';
    }
    this.setState({ queryValue }, () => { this.fetchCallAssess(); });
  }

  render() {
    const { callAssess, loading } = this.props;

    const columns = [
      { title: '记录时间',
        dataIndex: 'traceOn',
        render: (text) => {
          return (moment(text).format(dateFormat));
        },
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
          { title: '次均通时',
            dataIndex: 'avg',
            align: 'center',
            render: (text, record) => {
              return record.calls === 0 ? '' : (record.callTime / record.calls).toFixed(2);
            },
          },
          { title: '接通率',
            dataIndex: 'callTime',
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
      { title: '备注',
        dataIndex: 'memo',
      },
      { title: '操作',
        dataIndex: 'operate',
        render: (text, record) => {
          return (
            <Fragment>
              <a onClick={() => this.handleEdit(record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.id)}>
                <a href="#">删除</a>
              </Popconfirm>
            </Fragment>
          );
        },
      },
    ];

    const pagination = {
      showQuickJumper: true,
      current: callAssess && callAssess.page,
      pageSize: callAssess && callAssess.size,
      total: callAssess && callAssess.totals,
      showTotal: (total, range) => {
        return `第 ${range[0]}-${range[1]} / ${total} 行`;
      },
    };

    return (
      <Fragment>
        <PageHeaderLayout>
          <Card bordered={false}>
            <Row gutter={10}>
              <Col xs={24} sm={8}>
                <Select
                  style={{ marginTop: 5 }}
                  defaultValue={this.state.queryValue.type}
                  onChange={this.onTypeChange}
                >
                  <Option value={1}>日</Option>
                  <Option value={2}>周</Option>
                  <Option value={3}>月</Option>
                  <Option value={4}>季</Option>
                  <Option value={5}>年</Option>
                </Select>
                <DatePicker
                  style={{ marginTop: 5 }}
                  defaultValue={moment(this.state.queryValue.date, dateFormat)}
                  format={dateFormat}
                  onChange={this.onDateSelect}
                />
              </Col>
            </Row>
          </Card>
          <Card
            bordered={false}
            style={{ marginTop: 10 }}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8, borderColor: '#f07d4b', backgroundColor: '#f07d4b15' }}
              icon="plus"
              onClick={() => this.handleAdd()}
            >添加工作量记录
            </Button>
            <Table
              bordered
              size="small"
              loading={loading}
              rowKey={record => record.id}
              columns={columns}
              dataSource={callAssess && callAssess.data}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
