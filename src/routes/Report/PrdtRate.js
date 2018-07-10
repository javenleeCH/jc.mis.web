import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tabs, Select, Button, Table } from 'antd';
import { yuan, Pie } from '../../components/Charts';


const TabPane = Tabs.TabPane;
const Option = Select.Option;

@connect(({ report, loading }) => ({ report, loading: loading.effects['report/prdtrate'] }))
export default class PrdtRate extends Component {
  state = {
    activeTab: '1',
    selectedKeys: [],
    columns: [{ title: '客户编号', dataIndex: 'custno' }],
  }

  componentDidMount() {
    this.fetchPrdtRate();
    // this.fetchPrdtDest();
  }

  onTabChange=(activeTab) => {
    this.setState({ activeTab });
    if (activeTab === '2') {
      this.fetchDest();
    }
  }
  onSelectChange=(value) => {
    this.setState({ selectedKeys: value });
  }

  fetchPrdtRate=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'report/prdtrate' });
  }

  fetchDest=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'report/destinine' });
  }

  fetchPrdtDest=() => {
    const { dispatch } = this.props;
    const { selectedKeys } = this.state;
    const newColumns = [{ title: '客户编号', dataIndex: 'custno' }];
    selectedKeys.forEach((item) => {
      newColumns.push({ title: item, dataIndex: item, render: (text) => { return (text === '0' ? '' : text); } });
    });
    this.setState({ columns: newColumns });
    dispatch({ type: 'report/prdtdest', payload: selectedKeys });
  }

  render() {
    const { report: { prdtRate, destinine, prdtDest }, loading } = this.props;
    const { selectedKeys, columns } = this.state;

    const pWidth = document.querySelector('body').offsetWidth * 0.8;
    const pHeight = document.querySelector('body').offsetHeight * 0.8;
    return (
      <Tabs activeKey={this.state.activeTab} onChange={this.onTabChange}>
        <TabPane key="1" tab="产品客户存续占比">
          <Card
            loading={loading}
            bordered={false}
            bodyStyle={{ padding: 10 }}
          >
            <Pie
              hasLegend
              subTitle="产品客户存续（万）"
              total={yuan(prdtRate.reduce((pre, now) => now.y + pre, 0))}
              data={prdtRate}
              lineWidth={4}
              height={pWidth > pHeight ? pHeight : pWidth}
              padding={20}
              valueFormat={val => yuan(val)}
            />
          </Card>
        </TabPane>
        <TabPane key="2" tab="客户产品归属地" >
          <Card
            loading={loading}
            bordered={false}
            bodyStyle={{ padding: 10 }}
          >
            <Row gutter={16}>
              <Col xs={24} sm={24} lg={20}>
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  value={selectedKeys}
                  tokenSeparators={[',', '，', ';']}
                  onChange={value => this.onSelectChange(value)}
                  onDeselect={value => this.onSelectChange(value)}
                  placeholder="请选择要查看的目的地"
                >
                  {destinine && destinine.map(d => (
                    <Option
                      key={d.value}
                      value={d.value}
                    >{d.title}
                    </Option>))}
                </Select>
              </Col>
              <Col xs={24} sm={24} lg={4}>
                <Button
                  style={{ width: '100%' }}
                  icon="search"
                  type="primary"
                  onClick={() => this.fetchPrdtDest()}
                >查询
                </Button>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24}>
                <Table
                  bordered
                  style={{ marginTop: 15 }}
                  loading={loading}
                  rowKey={record => record.custno}
                  columns={columns}
                  dataSource={prdtDest}
                />
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>
    );
  }
}
