import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card, Form, Button, message, Divider, Popconfirm, Table, Modal, Tree, Input, Checkbox, Row, Col } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from '../../components/StandardTable';

import s from './User.less';

const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

const getValue = obj => Object
  .keys(obj)
  .map(key => obj[key])
  .join(',');

const CreateForm = Form.create()((props) => {
  const {
    showRoleModel,
    handleSave,
    handleModalVisible,
    form,
    roles,
    auths,
  } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      handleSave({ ...fieldsValue, userId: auths.userId });
    });
  };

  const handleSelected = (checkedKeys) => {
    form.setFieldsValue({
      roleIds: checkedKeys,
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  return (
    <Modal
      title="用户角色管理"
      visible={showRoleModel}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...formItemLayout} label="选择赋予的角色">
        {form.getFieldDecorator('roleIds', {
            initialValue: auths ? auths.roleIds : [],
        })(
          <Checkbox.Group
            style={{ width: '100%', marginTop: 10 }}
            onChange={handleSelected}
          >
            {roles && roles.map((item) => {
              return (
                <Row>
                  <Col span={24}>
                    <Checkbox key={item.id} value={item.id}>{item.name}</Checkbox>
                  </Col>
                </Row>);
            })}
          </Checkbox.Group>
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ user, role, loading }) =>
  ({ user, role, loading: loading.models.user }))
@Form.create()
export default class UserList extends PureComponent {
  state = {
    showRoleModel: false,
    queryValue: {
      page: 1,
      size: 20,
      keyword: '',
      sorter: 'CreatedOn',
      asc: true,
    },
  };

  componentDidMount() {
    this.fetchUsers();
    this.fetchRoles();
  }

  fetchUsers = () => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'user/list', payload: queryValue });
  }

  fetchRoles=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'role/list', payload: { page: 1, size: 100 } });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { queryValue } = this.state;
    queryValue.page = pagination.current;
    if (sorter.field) {
      queryValue.sorter = sorter.field.replace('Label', '');
      queryValue.asc = sorter.order !== 'descend';
    }
    this.setState({ queryValue }, () => { this.fetchUsers(); });
  }

  handleSearch = (keyword) => {
    const { queryValue } = this.state;
    queryValue.page = 1;
    queryValue.keyword = keyword;
    this.setState({ queryValue }, () => { this.fetchUsers(); });
  }

  handleAdd=() => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/organ/userDtl/0'));
  }

  handleEdit= (record) => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push('/organ/userDtl/' + record.id));
  }

  handleEnabled = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/enabled', payload: { id } })
      .then(() => {
        message.success('用户已启用');
        this.fetchUsers();
      });
  };

  handleDisabled = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/disabled', payload: { id } })
      .then(() => {
        message.success('用户已禁用');
        this.fetchUsers();
      });
  };

  handleRoleAuth=(id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/role', payload: id })
      .then(() => {
        this.setState({ showRoleModel: true });
      });
  }

  handleModalVisible = (flag) => {
    this.setState({ showRoleModel: !!flag });
  }

  handleSave = (fields) => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/roleSave', payload: fields })
      .then(() => {
        this.setState({ showRoleModel: false });
      });
  }

  render() {
    const { user, role, loading } = this.props;
    const { list } = user;
    const { showRoleModel } = this.state;

    const pagination = {
      current: list && list.page,
      pageSize: list && list.size,
      total: list && list.totals,
    };

    const parentMethods = {
      handleSave: this.handleSave,
      handleModalVisible: this.handleModalVisible,
      roles: role && role.list.data,
      auths: user && user.roles,
    };

    const columns = [
      {
        title: '工号',
        dataIndex: 'code',
        sorter: true,
      }, {
        title: '姓名',
        dataIndex: 'name',
      }, {
        title: '用户名',
        dataIndex: 'userName',
      }, {
        title: '域用户名',
        dataIndex: 'domainName',
      }, {
        title: '手机',
        dataIndex: 'mobile',
      }, {
        title: '邮件',
        dataIndex: 'email',
      }, {
        title: '座机',
        dataIndex: 'telephone',
      }, {
        title: '部门',
        dataIndex: 'deptName',
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <Fragment>
              <a onClick={() => this.handleEdit(record)}>编辑</a>
              <Divider type="vertical" /> {record.state === 0
                ? (
                  <Popconfirm title="确定禁用?" onConfirm={() => this.handleDisabled(record.id)}>
                    <a href="#">禁用</a>
                  </Popconfirm>
                )
                : (
                  <Popconfirm title="确定启用?" onConfirm={() => this.handleEnabled(record.id)}>
                    <a href="#">启用</a>
                  </Popconfirm>
                )}
              <Divider type="vertical" />
              <a onClick={() => this.handleRoleAuth(record.id)}>角色</a>
            </Fragment>
          );
        },
      },
    ];

    return (
      <Fragment>
        <PageHeaderLayout>
          <Card bordered={false}>
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8, borderColor: '#f07d4b', backgroundColor: '#f07d4b15' }}
              icon="plus"
              onClick={() => this.handleAdd(true)}
            >添加用户
            </Button>
            <Search
              placeholder="输入关键字"
              style={{ width: '100%', marginBottom: 8 }}
              onSearch={value => this.handleSearch(value)}
            />
            <Table
              loading={loading}
              rowKey={record => record.id}
              columns={columns}
              dataSource={list && list.data}
              pagination={pagination}
              onChange={this.handleTableChange}
            />
          </Card>
          <CreateForm {...parentMethods} showRoleModel={showRoleModel} />
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
