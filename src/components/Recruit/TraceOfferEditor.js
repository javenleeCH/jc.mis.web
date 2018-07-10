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
export default class TraceOfferEditor extends PureComponent {
  state = {
    traceOffer: [],
  }

  componentDidMount() {
    this.fetchOffer();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ traceOffer: nextProps.recruit.traceOffer });
  }

  fetchOffer=() => {
    const { cid, dispatch } = this.props;
    if (cid !== '0') {
      dispatch({ type: 'recruit/traceOffer', payload: cid });
    }
  }

  handleAddOffer = () => {
    const { user: { currentUser } } = this.props;
    const newData = [...this.state.traceOffer];
    newData.push({
      id: 0,
      traceOn: moment(now()).format('YYYY-MM-DD'),
      traceBy: currentUser.id,
      traceByName: currentUser.name,
      offerDate: moment(now()).format('YYYY-MM-DD'),
      deptId: 0,
      position: 1010,
      memo: '',
      editable: true,
    });
    this.setState({ traceOffer: newData });
  }

  handleEditOffer = (id) => {
    const newData = [...this.state.traceOffer];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ traceOffer: newData });
    }
  }

  handleChangeOffer = (value, key, column) => {
    const newData = [...this.state.traceOffer];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ traceOffer: newData });
    }
  }

  handleSaveOffer = (id) => {
    const { cid, dispatch, handleChangePhase } = this.props;
    const newData = [...this.state.traceOffer];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.candidateId = cid;
      dispatch({ type: 'recruit/saveOffer', payload: target }).then(() => {
        target.editable = false;
        this.setState({ traceOffer: newData });
        this.fetchOffer();
        handleChangePhase(1070);
      });
    }
  }

  handleCancelOffer = (id) => {
    const newData = [...this.state.traceOffer];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      if (target.id !== 0) {
        target.editable = false;
        this.setState({ traceOffer: newData });
      } else {
        this.setState({ traceOffer: newData.filter(item => id !== item.id) });
      }
    }
  }

  handleDelete = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'recruit/deleteOffer', payload: id }).then(() => {
      this.fetchOffer();
    });
  }

  render() {
    const { cid, datum: { options }, organ, loading } = this.props;
    const { traceOffer } = this.state;

    const offerColumns = [
      {
        title: '跟进日期',
        dataIndex: 'traceOn',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellDate
              editable={editable}
              value={text}
              onChange={value => this.handleChangeOffer(value, id, 'traceOn')}
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
        title: '到岗日期',
        dataIndex: 'offerDate',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellDate
              editable={editable}
              value={text}
              onChange={value => this.handleChangeOffer(value, id, 'offerDate')}
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
              onChange={value => this.handleChangeOffer(value, id, 'deptId')}
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
              onChange={value => this.handleChangeOffer(value, id, 'position')}
            />);
        },
      }, {
        title: '推荐人',
        dataIndex: 'referrerName',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellText
              editable={editable}
              value={text}
              onChange={value => this.handleChangeOffer(value, id, 'referrerName')}
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
              onChange={value => this.handleChangeOffer(value, id, 'memo')}
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
                    <a onClick={() => this.handleSaveOffer(id)}>保存</a>
                    <Divider type="vertical" />
                    <Popconfirm title="取消保存?" onConfirm={() => this.handleCancelOffer(id)}>
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <span>
                    <a onClick={() => this.handleEditOffer(id)}>编辑</a>
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
          title="OFFER记录"
          hoverable
          extra={<Button icon="plus" onClick={this.handleAddOffer}>添加</Button>}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            pagination={false}
            loading={loading}
            rowKey={record => record.id}
            columns={offerColumns}
            dataSource={traceOffer}
          />
        </Card>
      </Fragment>
    );
  }
}
