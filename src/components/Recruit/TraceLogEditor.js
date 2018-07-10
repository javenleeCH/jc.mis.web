import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Card, Table, Button, Divider, Popconfirm } from 'antd';
import EditTableCellText from '../../components/EditTableCellText';
import EditTableCellSelect from '../../components/EditTableCellSelect';
import EditTableCellDate from '../../components/EditTableCellDate';

const options2yesno = [{ key: '0', value: '0', title: '否' }, { key: '1', value: '1', title: '是' }];

@connect(({ user, recruit, datum, loading }) =>
  ({ user, recruit, datum, loading: loading.models.recruit }))
export default class TraceLogEditor extends PureComponent {
  state = {
    traceLog: [],
  }

  componentDidMount() {
    this.fetchLog();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ traceLog: nextProps.recruit.traceLog });
  }

  fetchLog=() => {
    const { cid, dispatch } = this.props;
    if (cid !== '0') {
      dispatch({ type: 'recruit/traceLog', payload: cid });
    }
  }

  handleAddLog = () => {
    const { user: { currentUser } } = this.props;
    const newData = [...this.state.traceLog];
    newData.push({
      id: 0,
      traceOn: moment(now()).format('YYYY-MM-DD'),
      traceBy: currentUser.id,
      traceByName: currentUser.name,
      traceType: 1010,
      isConnected: 0,
      isFollowUp: 0,
      position: 1010,
      memo: '',
      editable: true,
    });
    this.setState({ traceLog: newData });
  }

  handleEditLog = (id) => {
    const newData = [...this.state.traceLog];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ traceLog: newData });
    }
  }

  handleChangeLog = (value, key, column) => {
    const newData = [...this.state.traceLog];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ traceLog: newData });
    }
  }

  handleSaveLog = (id) => {
    const { cid, dispatch, handleChangePhase } = this.props;
    const newData = [...this.state.traceLog];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.candidateId = cid;
      dispatch({ type: 'recruit/saveLog', payload: target }).then(() => {
        target.editable = false;
        this.setState({ traceLog: newData });
        this.fetchLog();
        handleChangePhase(1030);
      });
    }
  }

  handleCancelLog = (id) => {
    const newData = [...this.state.traceLog];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      if (target.id !== 0) {
        target.editable = false;
        this.setState({ traceLog: newData });
      } else {
        this.setState({ traceLog: newData.filter(item => id !== item.id) });
      }
    }
  }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'recruit/deleteLog', payload: id }).then(() => {
      this.fetchLog();
    });
  }

  render() {
    const { cid, datum: { options }, loading } = this.props;
    const { traceLog } = this.state;

    const logColumns = [
      {
        title: '跟进日期',
        dataIndex: 'traceOn',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellDate
              editable={editable}
              value={text}
              onChange={value => this.handleChangeLog(value, id, 'traceOn')}
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
        title: '跟进方式',
        dataIndex: 'traceType',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options.traceType}
              onChange={value => this.handleChangeLog(value, id, 'traceType')}
            />);
        },
      }, {
        title: '是否接通',
        dataIndex: 'isConnected',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options2yesno}
              onChange={value => this.handleChangeLog(value, id, 'isConnected')}
            />);
        },
      }, {
        title: '是否持续跟进',
        dataIndex: 'isFollowUp',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options2yesno}
              onChange={value => this.handleChangeLog(value, id, 'isFollowUp')}
            />);
        },
      }, {
        title: '推荐职位',
        dataIndex: 'position',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options.position}
              onChange={value => this.handleChangeLog(value, id, 'position')}
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
              onChange={value => this.handleChangeLog(value, id, 'memo')}
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
                    <a onClick={() => this.handleSaveLog(id)}>保存</a>
                    <Divider type="vertical" />
                    <Popconfirm title="取消保存？" onConfirm={() => this.handleCancelLog(id)}>
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <span>
                    <a onClick={() => this.handleEditLog(id)}>编辑</a>
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
          title="跟踪记录"
          hoverable
          extra={<Button icon="plus" onClick={this.handleAddLog}>添加</Button>}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            pagination={false}
            loading={loading}
            rowKey={record => record.id}
            columns={logColumns}
            dataSource={traceLog}
          />
        </Card>
      </Fragment>
    );
  }
}
