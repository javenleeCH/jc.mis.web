import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Input, Form, List, Icon, Table, Button } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditTableCellSelect from '../../components/EditTableCellSelect';
// import s from './List.less';
const Search = Input.Search;
const options2rule = [
  { key: '-1', value: '-1', title: '无权限' },
  { key: '0', value: '0', title: '所有' },
  { key: '1', value: '1', title: '只能操作自己的' },
  { key: '2', value: '2', title: '自己及下级' },
  { key: '3', value: '3', title: '本部门所有' },
  { key: '4', value: '4', title: '向上贯穿到顶' },
];

@connect(({ organ, role, loading }) =>
  ({ organ, role, loading: loading.models.role }))
@Form.create()
export default class RoleList extends PureComponent {
  state = {
    queryValue: {
      page: 1,
      size: 20,
      keyword: '',
      sorter: 'CreatedOn',
      asc: false,
    },
    ruleList: [],
  }
  componentDidMount() {
    this.fetchRole();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ruleList: nextProps.role.rule.data });
  }

  fetchRole = () => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'role/list', payload: queryValue });
  }

  handleRoleAdd=(value) => {
    const { dispatch } = this.props;
    if (value) {
      dispatch({ type: 'role/save', payload: { name: value } })
        .then(() => {
          this.fetchRole();
        });
    }
  }

  handleSelected=(record) => {
    const { dispatch } = this.props;
    dispatch({ type: 'role/details', payload: record.id });
    dispatch({ type: 'role/rule', payload: record.id });
  }

  handleRuleSave=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'role/ruleSave', payload: this.state.ruleList });
  }


  handleChangeItem=(value, record, column) => {
    const newData = [...this.state.ruleList];
    const target = newData.find(item => record.moduleId === item.moduleId);
    if (target) {
      target[column] = value;
      this.setState({ ruleList: newData });
    } else {
      newData.forEach((element) => {
        if (element.children) {
          const t = element.children.find(item => record.moduleId === item.moduleId);
          if (t) {
            t[column] = value;
            this.setState({ ruleList: newData });
            return true;
          } else {
            element.children.forEach((el) => {
              if (el.children) {
                const tt = el.children.find(item => record.moduleId === item.moduleId);
                if (tt) {
                  tt[column] = value;
                  this.setState({ ruleList: newData });
                  return true;
                }
              }
            });
          }
        }
      });
    }
  }


  render() {
    const { role: { list, details }, loading } = this.props;
    const { ruleList } = this.state;

    const pagination = {
      current: list && list.page,
      pageSize: list && list.size,
      total: list && list.totals,
    };

    const columns = [
      { title: '功能模块',
        dataIndex: 'moduleName',
      },
      { title: '查看',
        dataIndex: 'viewAuth',
        render: (text, record) => {
          return (
            <EditTableCellSelect
              editable
              selectValue={text}
              options={options2rule}
              onChange={value => this.handleChangeItem(value, record, 'viewAuth')}
            />
          );
        },
      },
      { title: '新增/编辑',
        dataIndex: 'editAuth',
        render: (text, record) => {
          return (
            <EditTableCellSelect
              editable
              selectValue={text}
              options={options2rule}
              onChange={value => this.handleChangeItem(value, record, 'editAuth')}
            />
          );
        },
      },
      { title: '删除',
        dataIndex: 'deleteAuth',
        render: (text, record) => {
          return (
            <EditTableCellSelect
              editable
              selectValue={text}
              options={options2rule}
              onChange={value => this.handleChangeItem(value, record, 'deleteAuth')}
            />
          );
        },
      },
    ];

    return (
      <Fragment>
        <PageHeaderLayout>
          <Row gutter={24}>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card bordered={false}>
                <Search
                  placeholder="添加角色"
                  onSearch={value => this.handleRoleAdd(value)}
                  enterButton="添加"
                />
                <List
                  style={{ marginTop: 10 }}
                  size="middle"
                  rowKey="id"
                  loading={loading}
                  dataSource={list && list.data}
                  pagination={pagination}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        title={<a onClick={() => { this.handleSelected(item); }}><Icon type="safety" /> {item.name}</a>}
                      />
                    </List.Item>
                    )}
                />
              </Card>
            </Col>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card bordered={false} title={details && details.name}>
                <Button
                  type="dashed"
                  style={{ width: '100%', marginBottom: 8, borderColor: '#f07d4b', backgroundColor: '#f07d4b15' }}
                  icon="save"
                  onClick={() => { this.handleRuleSave(); }}
                >保存角色权限
                </Button>
                <Table
                  size="small"
                  loading={loading}
                  rowKey={record => record.moduleId}
                  columns={columns}
                  dataSource={ruleList && ruleList}
                  pagination={false}
                />
                <Button
                  type="dashed"
                  style={{ width: '100%', marginBottom: 8, borderColor: '#f07d4b', backgroundColor: '#f07d4b15' }}
                  icon="save"
                  onClick={() => { this.handleRuleSave(); }}
                >保存角色权限
                </Button>
              </Card>
            </Col>
          </Row>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
