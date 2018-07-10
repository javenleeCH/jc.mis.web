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
export default class TraceInterviewEditor extends PureComponent {
  state = {
    traceInterview: [],
  }

  componentDidMount() {
    this.fetchInterview();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ traceInterview: nextProps.recruit.traceInterview });
  }

  fetchInterview=() => {
    const { cid, dispatch } = this.props;
    if (cid !== '0') {
      dispatch({ type: 'recruit/traceInterview', payload: cid });
    }
  }

  handleChangeIntv = (value, key, column) => {
    const newData = [...this.state.traceInterview];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ traceInterview: newData });
    }
  }

  handleAddIntv = () => {
    const { user: { currentUser } } = this.props;
    const newData = [...this.state.traceInterview];
    newData.push({
      id: 0,
      traceOn: moment(now()).format('YYYY-MM-DD'),
      traceBy: currentUser.id,
      traceByName: currentUser.name,
      interviewType: 1010,
      isAttend: 0,
      interviewResult: 1010,
      memo: '',
      editable: true,
    });
    this.setState({ traceInterview: newData });
  }

  handleEditIntv = (id) => {
    const newData = [...this.state.traceInterview];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ traceInterview: newData });
    }
  }

  handleSaveIntv = (id) => {
    const { cid, dispatch, handleChangePhase } = this.props;
    const newData = [...this.state.traceInterview];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.candidateId = cid;
      dispatch({ type: 'recruit/saveInterview', payload: target }).then(() => {
        target.editable = false;
        this.setState({ traceInterview: newData });
        this.fetchInterview();
        handleChangePhase(target.interviewType === '1010' ? 1040 : 1050);
      });
    }
  }

  handleCancelIntv = (id) => {
    const newData = [...this.state.traceInterview];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      if (target.id !== 0) {
        target.editable = false;
        this.setState({ traceInterview: newData });
      } else {
        this.setState({ traceInterview: newData.filter(item => id !== item.id) });
      }
    }
  }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'recruit/deleteInterview', payload: id }).then(() => {
      this.fetchInterview();
    });
  }

  render() {
    const { cid, datum: { options }, loading } = this.props;
    const { traceInterview } = this.state;

    const interviewColumns = [
      {
        title: '跟进日期',
        dataIndex: 'traceOn',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellDate
              editable={editable}
              value={text}
              onChange={value => this.handleChangeIntv(value, id, 'traceOn')}
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
        title: '面试轮次',
        dataIndex: 'interviewType',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options.interviewType}
              onChange={value => this.handleChangeIntv(value, id, 'interviewType')}
            />);
        },
      }, {
        title: '是否出席',
        dataIndex: 'isAttend',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options2yesno}
              onChange={value => this.handleChangeIntv(value, id, 'isAttend')}
            />);
        },
      }, {
        title: '面试结果',
        dataIndex: 'interviewResult',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={options.interviewResult}
              onChange={value => this.handleChangeIntv(value, id, 'interviewResult')}
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
              onChange={value => this.handleChangeIntv(value, id, 'memo')}
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
                    <a onClick={() => this.handleSaveIntv(id)}>保存</a>
                    <Divider type="vertical" />
                    <Popconfirm title="取消保存?" onConfirm={() => this.handleCancelIntv(id)}>
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <span>
                    <a onClick={() => this.handleEditIntv(id)}>编辑</a>
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
          title="面试记录"
          hoverable
          extra={<Button icon="plus" onClick={this.handleAddIntv}>添加</Button>}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            pagination={false}
            loading={loading}
            rowKey={record => record.id}
            columns={interviewColumns}
            dataSource={traceInterview}
          />
        </Card>
      </Fragment>
    );
  }
}
