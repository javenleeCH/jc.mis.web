import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment, { now } from 'moment';
import { Card, Table, Button, Divider, Popconfirm, DatePicker, Col, Row, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
@connect(({ sales, loading }) =>
  ({ workload: sales.workload, loading: loading.models.sales }))
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
    this.fetchWorkload();
  }

  onDateSelect=(date, dateString) => {
    const { queryValue } = this.state;
    this.setState({ queryValue: { ...queryValue, page: 1, date: dateString } },
      () => { this.fetchWorkload(); });
  }

  onTypeChange=(value) => {
    const { queryValue } = this.state;
    this.setState({ queryValue: { ...queryValue, page: 1, type: value } },
      () => { this.fetchWorkload(); });
  }

  fetchWorkload=() => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'sales/workload', payload: queryValue });
  }

  handleAdd=() => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/workloadDtl/0'));
  }

  handleEdit= (record) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/workloadDtl/' + record.id));
  }

  handleDelete=(id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/workloadDelete', payload: id }).then(() => {
      this.fetchWorkload();
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
    this.setState({ queryValue }, () => { this.fetchWorkload(); });
  }

  render() {
    const { workload, loading } = this.props;

    const columns = [
      { title: '记录时间',
        dataIndex: 'traceOn',
        render: (text) => {
          return (moment(text).format('YYYY-MM-DD 第W周'));
        },
      },
      { title: '理财师',
        dataIndex: 'userName',
        align: 'center',
      },
      { title: '活动邀约',
        children: [
          { title: '成交',
            dataIndex: 'inviteDeal',
            align: 'center',
          },
          { title: '青铜',
            dataIndex: 'inviteBronze',
            align: 'center',
          },
          { title: '玄铁',
            dataIndex: 'inviteDarksteel',
            align: 'center',
          },
          { title: '其它',
            dataIndex: 'inviteOther',
            align: 'center',
          },
        ],
      },
      { title: '外出拜访',
        children: [
          { title: '成交',
            dataIndex: 'visitDeal',
            align: 'center',
          },
          { title: '青铜',
            dataIndex: 'visitBronze',
            align: 'center',
          },
          { title: '玄铁',
            dataIndex: 'visitDarksteel',
            align: 'center',
          },
          { title: '其它',
            dataIndex: 'visitOther',
            align: 'center',
          },
        ],
      },
      { title: 'Vip',
        dataIndex: 'vips',
        align: 'center',
      },
      { title: '电话量',
        dataIndex: 'calls',
        align: 'center',
      },
      { title: '预计打款',
        dataIndex: 'expected',
        align: 'center',
      },
      { title: '备注/说明',
        dataIndex: 'memo',
        render: (text, record) => {
          return (record.vipsDesc || '') + (text || '');
        },
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
      current: workload && workload.page,
      pageSize: workload && workload.size,
      total: workload && workload.totals,
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
              dataSource={workload && workload.data}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
