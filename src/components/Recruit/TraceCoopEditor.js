import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Button, Divider, Popconfirm } from 'antd';
import EditTableCellText from '../../components/EditTableCellText';
import EditTableCellSelect from '../../components/EditTableCellSelect';

@connect(({ user, recruit, datum, loading }) =>
  ({ user, recruit, datum, loading: loading.models.recruit }))
export default class TraceCoopEditor extends PureComponent {
  state = {
    traceCoop: [],
  }

  componentDidMount() {
    this.fetchCooperate();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ traceCoop: nextProps.recruit.traceCoop });
  }

  fetchCooperate=() => {
    const { cid, dispatch } = this.props;
    if (cid !== '0') {
      dispatch({ type: 'recruit/cooperate', payload: cid });
    }
  }

  handleAddCoop = () => {
    const { cid } = this.props;
    const newData = [...this.state.traceCoop];
    newData.push({
      id: 0,
      candidateId: cid,
      cooperateBy: '',
      memo: '',
      editable: true,
    });
    this.setState({ traceCoop: newData });
  }

  handleEditCoop = (id) => {
    const newData = [...this.state.traceCoop];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.editable = true;
      this.setState({ traceCoop: newData });
    }
  }

  handleChangeCoop = (value, key, column) => {
    const newData = [...this.state.traceCoop];
    const target = newData.filter(item => key === item.id)[0];
    if (target) {
      target[column] = value;
      this.setState({ traceCoop: newData });
    }
  }

  handleSaveCoop = (id) => {
    const { cid, dispatch } = this.props;
    const newData = [...this.state.traceCoop];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      target.candidateId = cid;
      dispatch({ type: 'recruit/saveCoop', payload: target }).then(() => {
        target.editable = false;
        this.setState({ traceCoop: newData });
        this.fetchCooperate();
      });
    }
  }

  handleCancelCoop = (id) => {
    const newData = [...this.state.traceCoop];
    const target = newData.filter(item => id === item.id)[0];
    if (target) {
      if (target.id !== 0) {
        target.editable = false;
        this.setState({ traceCoop: newData });
      } else {
        this.setState({ traceCoop: newData.filter(item => id !== item.id) });
      }
    }
  }

  handleDeleteCoop = (id) => {
    const { dispatch } = this.props;
    dispatch({ type: 'recruit/deleteCoop', payload: id }).then(() => {
      this.fetchCooperate();
    });
  }

  render() {
    const { cid, user, loading } = this.props;
    const { userOptions } = user;
    const { traceCoop } = this.state;

    const coopColumns = [
      {
        title: '协作跟进人',
        dataIndex: 'cooperateBy',
        render: (text, record) => {
          const { editable, id } = record;
          return (
            <EditTableCellSelect
              editable={editable}
              selectValue={text}
              options={userOptions}
              onChange={value => this.handleChangeCoop(value, id, 'cooperateBy')}
            />
          );
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
              onChange={value => this.handleChangeCoop(value, id, 'memo')}
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
                    <a onClick={() => this.handleSaveCoop(id)}>保存</a>
                    <Divider type="vertical" />
                    <Popconfirm title="取消保存?" onConfirm={() => this.handleCancelCoop(id)}>
                      <a>取消</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <span>
                    <a onClick={() => this.handleEditCoop(id)}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm title="确定删除？" onConfirm={() => this.handleDeleteCoop(id)}>
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
        <Table
          style={{ marginTop: 10, display: cid !== '0' ? 'inherit' : 'none' }}
          size="small"
          pagination={false}
          loading={loading}
          rowKey={record => record.id}
          columns={coopColumns}
          dataSource={traceCoop}
        />
        <Button
          type="dashed"
          style={{ width: '100%',
            marginBottom: 8,
            borderColor: '#1890ff',
            backgroundColor: '#1890ff11',
            display: cid !== '0' ? 'inherit' : 'none' }}
          icon="plus"
          onClick={() => this.handleAddCoop()}
        >添加协作跟进人
        </Button>
      </Fragment>
    );
  }
}
