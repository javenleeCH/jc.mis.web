// 候选人列表，候选人管理，跟踪记录
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import moment from 'moment';
import { Row, Col, Card, Table, Input, Form, Button, Divider, Select, Popconfirm } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const Search = Input.Search;
const Option = Select.Option;

@connect(({ user, recruit, datum, organ, loading }) =>
  ({ user, recruit, datum, organ, loading: loading.models.recruit }))
@Form.create()
export default class RecruitList extends PureComponent {
  state = {
    queryValue: {
      page: 1,
      size: 20,
      keyword: '',
      sorter: 'StorageOn',
      asc: false,
      users: [],
    },
  }

  componentWillMount() {
    this.fetchUserOptions();
    this.fetchUser();
    const { queryValue } = this.state;
    const { user: { userOptions, currentUser } } = this.props;
    if (currentUser && userOptions) {
      const target = userOptions.find(item => item.value === currentUser.id + '');
      if (target) {
        this.setState({ queryValue: { ...queryValue,
          users: [currentUser.id + ''] } });
      }
    }
  }

  componentDidMount() {
    this.fetchCandidate();
  }

  onSelectedUsers = (value) => {
    const { queryValue } = this.state;
    this.setState({
      queryValue: {
        ...queryValue,
        users: value,
      },
    });
  }

  fetchUserOptions = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/options',
      payload: {
        type: 1, ctl: 'recruit', act: 'list',
      } });
  }

  fetchCandidate = () => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'recruit/candidate', payload: queryValue });
  }

  fetchUser = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchCurrent' });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { queryValue } = this.state;
    queryValue.page = pagination.current;
    if (sorter.field) {
      queryValue.sorter = sorter.field.replace('Label', '');
      queryValue.asc = sorter.order !== 'descend';
    }
    this.setState({ queryValue }, () => { this.fetchCandidate(); });
  }

  handleSearch = (keyword) => {
    const { queryValue } = this.state;
    this.setState({ queryValue: { ...queryValue, page: 1, keyword } },
      () => { this.fetchCandidate(); });
  }

  // handleEdit = (record) => {
  //   // const { dispatch } = this.props;
  //   // dispatch(routerRedux.push('/recruit/details/' + record.id));
  // }
  handleDisabled = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'recruit/disabled', payload: { id } })
      .then(() => {
        this.fetchCandidate();
      });
  }

  handleAddCandidate = () => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/recruit/details/0'));
  }

  render() {
    const { recruit, user, loading } = this.props;
    const { list } = recruit;
    const { userOptions } = user;

    const candidateList = {
      list: list && list.data,
      pagination: {
        showQuickJumper: true,
        current: list && list.page,
        pageSize: list && list.size,
        total: list && list.totals,
        showTotal: (total, range) => {
          return `第 ${range[0]}-${range[1]} / ${total} 行`;
        },
      },
    };

    const columns = [
      {
        title: '入库日期',
        dataIndex: 'storageOn',
        sorter: true,
        render: (text) => {
          return (moment(text).format('YYYY-MM-DD'));
        },
      }, {
        title: '姓名',
        dataIndex: 'name',
      }, {
        title: '性别',
        dataIndex: 'genderLabel',
      }, {
        title: '手机',
        dataIndex: 'mobile',
      }, {
        title: '所在公司',
        dataIndex: 'lastComp',
      }, {
        title: '工龄',
        dataIndex: 'workYears',
      }, {
        title: '学历',
        dataIndex: 'educationLabel',
      }, {
        title: '负责人',
        dataIndex: 'ownerIdName',
      }, {
        title: '跟进阶段',
        dataIndex: 'tracePhaseLabel',
        sorter: true,
      }, {
        title: '最新跟进时间',
        dataIndex: 'lastTraceOn',
        sorter: true,
        render: (text) => {
          return (moment(text).format('YYYY-MM-DD'));
        },
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <Fragment>
              <Link to={'/recruit/details/' + record.id} key={record.id} target="_blank">编辑</Link>
              <Divider type="vertical" />
              <Popconfirm title="确定禁用?" onConfirm={() => this.handleDisabled(record.id)}>
                <a href="#">禁用</a>
              </Popconfirm>
              {/* <a onClick={() => this.handleEdit(record)}>编辑</a> */}
              {/* <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.id)}>
                <a href="#">删除</a>
              </Popconfirm> */}
            </Fragment>
          );
        },
      },
    ];

    return (
      <Fragment>
        <PageHeaderLayout>
          <Card bordered={false}>
            <Row gutter={8}>
              <Col xs={24} sm={6}>
                <Select
                  allowClear
                  optionFilterProp="children"
                  mode="multiple"
                  placeholder="--用户--"
                  style={{ width: '100%' }}
                  defaultValue={this.state.queryValue.users}
                  onChange={this.onSelectedUsers}
                >
                  {userOptions && userOptions.map(d => (
                    <Option key={d.key} value={d.value} disabled={d.disabled}>{d.title}
                    </Option>
                ))}
                </Select>
              </Col>
              <Col xs={24} sm={6}>
                <Search
                  placeholder="输入关键字"
                  style={{ width: '100%', marginBottom: 8 }}
                  onSearch={value => this.handleSearch(value)}
                  enterButton
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
              onClick={() => this.handleAddCandidate()}
            >新建候选人
            </Button>

            <Table
              size="small"
              loading={loading}
              rowKey={record => record.id}
              dataSource={candidateList.list}
              pagination={candidateList.pagination}
              columns={columns}
              onChange={this.handleTableChange}
            />
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
