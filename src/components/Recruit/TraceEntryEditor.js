import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Card, Table, Button, Divider, Popconfirm } from 'antd';
import EditTableCellText from '../../components/EditTableCellText';
import EditTableCellSelect from '../../components/EditTableCellSelect';
import EditTableCellTreeSelect from '../../components/EditTableCellTreeSelect';
import EditTableCellDate from '../../components/EditTableCellDate';

const options2yesno = [{ key: '0', value: '0', title: '否' }, { key: '1', value: '1', title: '是' }];

@connect(({ user, recruit, datum, organ, loading }) =>
  ({ user, recruit, datum, organ, loading: loading.models.recruit }))
export default class TraceEntryEditor extends PureComponent {
  state = {
    traceEntry: [],
  }

  componentDidMount() {
    this.fetchEntry();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ traceEntry: nextProps.recruit.traceEntry });
  }

  fetchEntry=() => {
    const { cid, dispatch } = this.props;
    if (cid !== '0') {
      dispatch({ type: 'recruit/traceEntry', payload: cid });
    }
  }

  handleChangeEntry = (value, key, column) => {
    const newData = [...this.state.traceEntry];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ traceEntry: newData });
    }
  }

  handleAddEntry = () => {
    const { user: { currentUser } } = this.props;
    const newData = [...this.state.traceEntry];
    newData.push({
      id: 0,
      entryDate: moment(now()).format('YYYY-MM-DD'),
      traceBy: currentUser.id,
      traceByName: currentUser.name,
      isEntry: 0,
      isMedically: 0,
      deptId: '0',
      position: 1010,
      memo: '',
      editable: true,
    });
    this.setState({ traceEntry: newData });
  }

  handleEditEntry = (id) => {
    const newData = [...this.state.traceEntry];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ traceEntry: newData });
    }
  }

  handleSaveEntry = (id) => {
    const { cid, dispatch, handleChangePhase } = this.props;
    const newData = [...this.state.traceEntry];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.candidateId = cid;
      dispatch({ type: 'recruit/saveEntry', payload: target }).then(() => {
        target.editable = false;
        this.setState({ traceEntry: newData });
        this.fetchEntry();
        handleChangePhase(1080);
      });
    }
  }

  handleCancelEntry = (id) => {
    const newData = [...this.state.traceEntry];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      if (target.id !== 0) {
        target.editable = false;
        this.setState({ traceEntry: newData });
      } else {
        this.setState({ traceEntry: newData.filter(item => id !== item.id) });
      }
    }
  }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'recruit/deleteEntry', payload: id }).then(() => {
      this.fetchEntry();
    });
  }

  render() {
    const { cid, datum: { options }, organ, loading } = this.props;
    const { traceEntry } = this.state;

    const entryColumns = [
      {
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
        title: '入职日期',
        dataIndex: 'entryDate',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellDate
              editable={editable}
              value={text}
              onChange={value => this.handleChangeEntry(value, id, 'entryDate')}
            />);
        },
      }, {
        title: '是否到岗',
        dataIndex: 'isEntry',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options2yesno}
              onChange={value => this.handleChangeEntry(value, id, 'isEntry')}
            />);
        },
      }, {
        title: '是否体检合格',
        dataIndex: 'isMedically',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options2yesno}
              onChange={value => this.handleChangeEntry(value, id, 'isMedically')}
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
              onChange={value => this.handleChangeEntry(value, id, 'deptId')}
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
              onChange={value => this.handleChangeEntry(value, id, 'position')}
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
              onChange={value => this.handleChangeEntry(value, id, 'memo')}
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
                    <a onClick={() => this.handleSaveEntry(id)}>保存</a>
                    <Divider type="vertical" />
                    <Popconfirm title="取消保存?" onConfirm={() => this.handleCancelEntry(id)}>
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <span>
                    <a onClick={() => this.handleEditEntry(id)}>编辑</a>
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
          title="到岗记录"
          hoverable
          extra={<Button icon="plus" onClick={this.handleAddEntry}>添加</Button>}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            pagination={false}
            loading={loading}
            rowKey={record => record.id}
            columns={entryColumns}
            dataSource={traceEntry}
          />
        </Card>
      </Fragment>
    );
  }
}
