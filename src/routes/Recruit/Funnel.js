// 岗位漏斗模型
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Table, Select, DatePicker, Button, Alert } from 'antd';
import { enquireScreen } from 'enquire-js';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Funnel } from '../../components/Charts';

const Option = Select.Option;
const { RangePicker } = DatePicker;

@connect(({ user, datum, funnel, loading }) => ({ user, datum, funnel, loading: loading.models.funnel }))
export default class FunnelReport extends PureComponent {
  state = {
    isMobile: false,
    queryValue: {
      users: [],
      positions: [],
      dates: [],
    },
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    const types = 'position,applyPosition';
    this.fetchOptions(types);
    this.fetchUserOptions();
    enquireScreen((mobile) => {
      this.setState({
        isMobile: mobile,
      });
    });
    dispatch({ type: 'funnel/list', payload: queryValue });
  }

  onDateSelect = (dates, dateStrings) => {
    const { queryValue } = this.state;
    this.setState({
      queryValue: {
        ...queryValue,
        dates: dateStrings,
      },
    });
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

  onSelectedPosition = (value) => {
    const { queryValue } = this.state;
    this.setState({
      queryValue: {
        ...queryValue,
        positions: value,
      },
    });
  }

  fetchFunnel = () => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'funnel/list', payload: queryValue });
  }

  fetchOptions = (types) => {
    const { dispatch } = this.props;
    dispatch({ type: 'datum/types', payload: types });
  }

  fetchUserOptions = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/options',
      payload: {
        type: 1, ctl: 'funnel', act: 'query',
      } });
  }
  render() {
    const { user, datum, funnel, loading } = this.props;
    const { options } = datum;
    const { userOptions } = user;
    const { list } = funnel;

    const columns = [
      {
        title: '步骤',
        dataIndex: 'step',
      }, {
        title: '环节',
        dataIndex: 'subject',
      }, {
        title: '计数',
        dataIndex: 'total',
      }, {
        title: '环节转化率',
        dataIndex: 'linkRate',
        render: (text) => {
          return (text + '%');
        },
      }, {
        title: '整体转化率',
        dataIndex: 'integralRate',
        render: (text) => {
          return (text + '%');
        },
      },
    ];
    let pWidth = document.querySelector('body').offsetWidth;
    let pHeight = document.querySelector('body').offsetHeight * 0.6;
    let padding = [20, 180, 95, 20];
    if (this.state.isMobile) {
      pHeight = pWidth;
      padding = [0, 80, 80, 0];
    } else { pWidth /= 2; }

    return (
      <Fragment>
        <PageHeaderLayout>
          <Card>
            <Row gutter={10}>
              <Col xs={24} sm={6}>
                <Select
                  allowClear
                  optionFilterProp="children"
                  mode="multiple"
                  placeholder="--用户--"
                  style={{ width: '100%' }}
                  onChange={this.onSelectedUsers}
                >
                  {userOptions && userOptions.map(d => (
                    <Option key={d.key} value={d.value} disabled={d.disabled}>{d.title}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={6}>
                <Select
                  allowClear
                  optionFilterProp="children"
                  mode="multiple"
                  placeholder="--岗位--"
                  style={{ width: '100%' }}
                  onChange={this.onSelectedPosition}
                >
                  {options && options.applyPosition && options
                    .applyPosition
                    .map(d => (
                      <Option key={d.key} value={d.value} disabled={d.disabled}>{d.title}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col xs={24} sm={6}>
                <RangePicker
                  onChange={this.onDateSelect}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col xs={24} sm={6}>
                <Button
                  style={{ width: this.state.isMobile ? '100%' : '100' }}
                  type="primary"
                  icon="search"
                  onClick={this.fetchFunnel}
                >查询
                </Button>
              </Col>
            </Row>
          </Card>
          <Card style={{
            marginTop: 10,
          }}
          >
            <Row gutter={8}>
              <Col xs={24} sm={12}>
                <Table
                  style={{ marginBottom: 10 }}
                  size="small"
                  loading={loading}
                  rowKey={record => record.step}
                  pagination={false}
                  columns={columns}
                  dataSource={list && list}
                />
                {this.state.isMobile ? '' : (
                  <Alert
                    message={(
                      <p>1.整体转化率=该环节漏斗流量/拿到的联系方式总数；<br />&nbsp;&nbsp;代表该环节所剩意向者占最初总数的比例；指标越大，招聘效率越高；<br />
                  2.环节转化率=该环节漏斗流量/上一环节漏斗流量；<br />&nbsp;&nbsp;代表该环节相比上一环节的意向者留存率；可反映该环节的效率及问题；<br />
                  3.样本数量越大，漏斗模型反映的情况越客观有效；<br />4.在实际操作中，可根据工作需要加入更多细化指标，以便更好分析数据，增强针对性。
                      </p>)}
                    type="info"
                  />
                )}
              </Col>
              <Col xs={24} sm={12}>
                <Funnel
                  padding={padding}
                  height={pWidth > pHeight ? pHeight : pWidth}
                  data={list && list}
                />
              </Col>
            </Row>
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
