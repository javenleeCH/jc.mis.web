import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment, { now } from 'moment';
import { Card, Table, Button, Row, Col, DatePicker, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
@connect(({ sales, loading }) => ({ remit: sales.remit, loading: loading.models.sales }))
export default class RemitList extends PureComponent {
  state = {
    queryValue: {
      page: 1,
      size: 20,
      type: 2,
      date: moment(now()).format(dateFormat),
      keyword: '',
      sorter: 'CreatedOn',
      asc: false,
    },
  }

  componentDidMount() {
    this.fetchRemit();
  }

  onDateSelect=(date, dateString) => {
    const { queryValue } = this.state;
    this.setState({ queryValue: { ...queryValue, page: 1, date: dateString } },
      () => { this.fetchRemit(); });
  }

  onTypeChange=(value) => {
    const { queryValue } = this.state;
    this.setState({ queryValue: { ...queryValue, page: 1, type: value } },
      () => { this.fetchRemit(); });
  }

  fetchRemit=() => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'sales/remit', payload: queryValue });
  }

  handleAdd=() => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/remitDtl/0'));
  }

  handleEdit= (record) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/remitDtl/' + record.id));
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
    this.setState({ queryValue }, () => { this.fetchRemit(); });
  }

  render() {
    const { remit, loading } = this.props;

    const columns = [
      { title: '打款时间',
        dataIndex: 'remitOn',
        sorter: true,
        render: (text) => {
          return (moment(text).format('YYYY-MM-DD'));
        },
      },
      { title: '理财师',
        dataIndex: 'userName',
      },
      { title: '客户姓氏',
        dataIndex: 'customer',
      },
      { title: '购买项目',
        dataIndex: 'productName',
      },
      { title: '成交金额',
        dataIndex: 'amount',
        sorter: true,
      },
      { title: '折算业绩',
        dataIndex: 'reduced',
        sorter: true,
      },
      { title: '是否新客户',
        dataIndex: 'isNew',
        sorter: true,
        render: (text) => {
          return (text === 0 ? '' : '是');
        },
      },
      { title: '客户来源',
        dataIndex: 'custChannelLabel',
        render: (text) => {
          return (text === '老客户' ? '' : text);
        },
      },
      { title: '是否存续期产品到期打款',
        dataIndex: 'isExpired',
        sorter: true,
        render: (text) => {
          return (text === 0 ? '' : '是');
        },
      },
      { title: '存续金额新增部分',
        dataIndex: 'increase',
        sorter: true,
        render: (text) => {
          return (text === 0 ? '' : text);
        },
      },
      { title: '关联理财师',
        dataIndex: 'cooperateName',
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
            </Fragment>
          );
        },
      },
    ];

    const pagination = {
      showQuickJumper: true,
      current: remit && remit.page,
      pageSize: remit && remit.size,
      total: remit && remit.totals,
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
            >添加客户打款
            </Button>
            <Table
              size="small"
              loading={loading}
              rowKey={record => record.id}
              columns={columns}
              dataSource={remit && remit.data}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
