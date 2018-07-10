import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { routerRedux } from 'dva/router';
import { Card, Table, Button, DatePicker, Row, Col, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
@connect(({ sales, loading }) => ({ extra: sales.extra, loading: loading.models.sales }))
export default class ExtraList extends PureComponent {
  state = {
    queryValue: {
      page: 1,
      size: 20,
      type: 2,
      date: moment(now()).format(dateFormat),
      keyword: '',
      sorter: 'total',
      asc: false,
    },
  }

  componentDidMount() {
    this.fetchextra();
  }

  onDateSelect=(date, dateString) => {
    const { queryValue } = this.state;
    this.setState({ queryValue: { ...queryValue, page: 1, date: dateString } },
      () => { this.fetchextra(); });
  }

  onTypeChange=(value) => {
    const { queryValue } = this.state;
    this.setState({ queryValue: { ...queryValue, page: 1, type: value } },
      () => { this.fetchextra(); });
  }

  fetchextra=() => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'sales/extra', payload: queryValue });
  }

  handleAdd=() => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/extraDtl/0'));
  }

  handleEdit= (record) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/extraDtl/' + record.id));
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
    this.setState({ queryValue }, () => { this.fetchextra(); });
  }

  render() {
    const { extra, loading } = this.props;

    const columns = [
      { title: '记录时间',
        dataIndex: 'traceOn',
        align: 'center',
        render: (text) => {
          return (moment(text).format('YYYY-MM-DD'));
        },
      },
      { title: '理财师',
        dataIndex: 'userName',
        align: 'center',
      },
      { title: '活动',
        children:
        [{ title: '考察',
          dataIndex: 'inspect',
          align: 'center',
        }, { title: '团建',
          dataIndex: 'teamActivity',
          align: 'center',
        },
        { title: '推新',
          dataIndex: 'pushNew',
          align: 'center',
        },
        { title: '产品路演',
          dataIndex: 'roadshow',
          align: 'center',
        },
        { title: '其它',
          dataIndex: 'other',
          align: 'center',
        }],
      },
      { title: '早会加分',
        dataIndex: 'earliest',
        align: 'center',
      },
      { title: '300w+',
        dataIndex: 'remitGt300',
        align: 'center',
      },
      { title: '存续浮动',
        dataIndex: 'existence',
        align: 'center',
      },
      { title: '最高VIP',
        dataIndex: 'mostVip',
        align: 'center',
      },
      { title: '任务包',
        dataIndex: 'taskPg',
        align: 'center',
      },
      { title: '迟到',
        dataIndex: 'beLate',
        align: 'center',
      },
      { title: '总分',
        dataIndex: 'total',
        align: 'center',
        sorter: true,
      },
      { title: '操作',
        dataIndex: 'operate',
        render: (text, record) => {
          return (
            <Fragment>
              <a onClick={() => this.handleEdit(record)}>编辑</a>
            </Fragment>
          );
        },
      },
    ];

    const pagination = {
      showQuickJumper: true,
      current: extra && extra.page,
      pageSize: extra && extra.size,
      total: extra && extra.totals,
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
            >添加加减分记录
            </Button>
            <Table
              bordered
              size="small"
              loading={loading}
              rowKey={record => record.id}
              columns={columns}
              dataSource={extra && extra.data}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
