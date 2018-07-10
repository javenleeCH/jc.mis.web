import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Table, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ sales, loading }) => ({ quota: sales.quota, loading: loading.models.sales }))
export default class QuotaList extends PureComponent {
  state = {
    queryValue: {
      page: 1,
      size: 20,
      keyword: '',
      sorter: 'CreatedOn',
      asc: false,
    },
  }
  componentDidMount() {
    this.fetchQuota();
  }

  fetchQuota=() => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'sales/quota', payload: queryValue });
  }

  handleAdd=() => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/quotaDtl/0'));
  }

  handleEdit= (record) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/sales/quotaDtl/' + record.id));
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
    this.setState({ queryValue }, () => { this.fetchQuota(); });
  }

  render() {
    const { quota, loading } = this.props;

    const columns = [
      { title: '年',
        dataIndex: 'quotaYear',
        sorter: true,
      },
      { title: '考核维度',
        dataIndex: 'latitudeLabel',
        sorter: true,
      },
      { title: '分公司',
        dataIndex: 'compName',
      },
      { title: '部门',
        dataIndex: 'deptName',
      },
      { title: '个人',
        dataIndex: 'userName',
      },
      { title: '标准目标(月)',
        dataIndex: 'standard',
        sorter: true,
      },
      { title: '挑战目标(月)',
        dataIndex: 'challenge',
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
      current: quota && quota.page,
      pageSize: quota && quota.size,
      total: quota && quota.totals,
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
            >添加业绩目标
            </Button>
            <Table
              size="small"
              loading={loading}
              rowKey={record => record.id}
              columns={columns}
              dataSource={quota && quota.data}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
