import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Card, Table, Button, Divider, Popconfirm } from 'antd';
import EditTableCellText from '../../components/EditTableCellText';
import EditTableCellSelect from '../../components/EditTableCellSelect';
import EditTableCellTreeSelect from '../../components/EditTableCellTreeSelect';
import EditTableCellDate from '../../components/EditTableCellDate';

@connect(({ user, recruit, datum, organ, loading }) =>
  ({ user, recruit, datum, organ, loading: loading.models.recruit }))
export default class TraceSalaryEditor extends PureComponent {
  state = {
    traceSalary: [],
  }

  componentDidMount() {
    this.fetchSalary();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ traceSalary: nextProps.recruit.traceSalary });
  }

  fetchSalary=() => {
    const { cid, dispatch } = this.props;
    if (cid !== '0') {
      dispatch({ type: 'recruit/traceSalary', payload: cid });
    }
  }

  handleChangeSalary = (value, key, column) => {
    const newData = [...this.state.traceSalary];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ traceSalary: newData });
    }
  }

  handleAddSalary = () => {
    const { user: { currentUser } } = this.props;
    const newData = [...this.state.traceSalary];
    newData.push({
      id: 0,
      traceOn: moment(now()).format('YYYY-MM-DD'),
      traceBy: currentUser.id,
      traceByName: currentUser.name,
      salaryType: 1010,
      salary: '0',
      deptId: 0,
      position: 1010,
      memo: '',
      editable: true,
    });
    this.setState({ traceSalary: newData });
  }

  handleEditSalary = (id) => {
    const newData = [...this.state.traceSalary];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ traceSalary: newData });
    }
  }

  handleSaveSalary = (id) => {
    const { cid, dispatch, handleChangePhase } = this.props;
    const newData = [...this.state.traceSalary];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.candidateId = cid;
      dispatch({ type: 'recruit/saveSalary', payload: target }).then(() => {
        target.editable = false;
        this.setState({ traceSalary: newData });
        this.fetchSalary();
        handleChangePhase(1060);
      });
    }
  }

  handleCancelSalary = (id) => {
    const newData = [...this.state.traceSalary];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      if (target.id !== 0) {
        target.editable = false;
        this.setState({ traceSalary: newData });
      } else {
        this.setState({ traceSalary: newData.filter(item => id !== item.id) });
      }
    }
  }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'recruit/deleteSalary', payload: id }).then(() => {
      this.fetchSalary();
    });
  }

  render() {
    const { cid, datum: { options }, loading, organ } = this.props;
    const { traceSalary } = this.state;

    const salaryColumns = [
      {
        title: '跟进日期',
        dataIndex: 'traceOn',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellDate
              editable={editable}
              value={text}
              onChange={value => this.handleChangeSalary(value, id, 'traceOn')}
            />);
        },
      }, {
        title: '跟进人',
        dataIndex: 'traceBy',
        render: (text, record) => {
          const { traceByName } = record;
          return (
            <Fragment>
              { traceByName }
            </Fragment>
          );
        },
      }, {
        title: '薪酬类别',
        dataIndex: 'salaryType',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options.salaryType}
              onChange={value => this.handleChangeSalary(value, id, 'salaryType')}
            />);
        },
      }, {
        title: '薪资',
        dataIndex: 'salary',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellText
              editable={editable}
              value={text}
              onChange={value => this.handleChangeSalary(value, id, 'salary')}
            />);
        },
      }, {
        title: '部门',
        dataIndex: 'deptId',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellTreeSelect
              editable={editable}
              selectValue={text}
              options={organ.tree}
              onChange={value => this.handleChangeSalary(value, id, 'deptId')}
            />);
        },
      }, {
        title: '岗位',
        dataIndex: 'position',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options.position}
              onChange={value => this.handleChangeSalary(value, id, 'position')}
            />);
        },
      }, {
        title: '描述备注',
        dataIndex: 'memo',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellText
              editable={editable}
              value={text}
              onChange={value => this.handleChangeSalary(value, id, 'memo')}
            />
          );
        },
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <Fragment>
              {
                editable ? (
                  <span>
                    <a onClick={() => this.handleSaveSalary(id)}>保存</a>
                    <Divider type="vertical" />
                    <Popconfirm title="取消保存?" onConfirm={() => this.handleCancelSalary(id)}>
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <span>
                    <a onClick={() => this.handleEditSalary(id)}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm title="确定删除？" onConfirm={() => this.handleDelete(id)}>
                      <a>删除</a>
                    </Popconfirm>
                  </span>
              )}
            </Fragment>
          );
        },
      },
    ];

    return (
      <Fragment>
        <Card
          style={{ marginTop: 10, display: cid !== '0' ? 'inherit' : 'none' }}
          title="谈薪记录"
          hoverable
          extra={<Button icon="plus" onClick={this.handleAddSalary}>添加</Button>}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            pagination={false}
            loading={loading}
            rowKey={record => record.id}
            columns={salaryColumns}
            dataSource={traceSalary}
          />
        </Card>
      </Fragment>
    );
  }
}
