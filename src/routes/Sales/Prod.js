import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
import { Card, Table, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ sales, loading }) => ({ prod: sales.prod, loading: loading.models.sales }))
export default class ModuleList extends PureComponent {
  state = {
    queryValue: {
      page: 1,
      size: 20,
      keyword: '',
      sorter: 'OfflineDate',
      asc: false,
    },
  }

  componentDidMount() {
    this.fetchProd();
  }

  fetchProd=() => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'sales/prod', payload: queryValue });
  }

  handleAdd=() => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/prodDtl/0'));
  }

  handleEdit= (record) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/prodDtl/' + record.id));
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { queryValue } = this.state;
    queryValue.page = pagination.current;
    if (sorter.field) {
      queryValue.sorter = sorter.field.replace('Label', '');
      queryValue.asc = sorter.order !== 'descend';
    }
    this.setState({ queryValue }, () => { this.fetchProd(); });
  }

  render() {
    const { prod, loading } = this.props;
    const columns = [
      { title: '产品代码',
        dataIndex: 'code',
      },
      { title: '简称',
        dataIndex: 'shortName',
      },
      { title: '折算系数',
        dataIndex: 'ratio',
      },
      { title: '期限（月）',
        dataIndex: 'expires',
      },
      { title: '上线时间',
        dataIndex: 'onlineDate',
        sorter: true,
        render: (text) => {
          return (moment(text).format('YYYY-MM-DD'));
        },
      },
      { title: '下线时间',
        dataIndex: 'offlineDate',
        sorter: true,
        render: (text) => {
          return (moment(text).format('YYYY-MM-DD'));
        },
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
      current: prod && prod.page,
      pageSize: prod && prod.size,
      total: prod && prod.totals,
      showTotal: (total, range) => {
        return `第 ${range[0]}-${range[1]} / ${total} 行`;
      },
    };

    return (
      <Fragment>
        <PageHeaderLayout>
          <Card>
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8, borderColor: '#f07d4b', backgroundColor: '#f07d4b15' }}
              icon="plus"
              onClick={() => this.handleAdd()}
            >添加产品
            </Button>
            <Table
              size="small"
              loading={loading}
              rowKey={record => record.id}
              columns={columns}
              dataSource={prod && prod.data}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
