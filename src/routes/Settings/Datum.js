import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, List, Card, Table, Input, Form, TreeSelect, Button, message, Divider, Modal, Popconfirm } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import s from './Datum.less';

@connect(({ datum, loading }) => ({ datum, loading: loading.models.datum }))
@Form.create()
export default class RecruitList extends PureComponent {
  state = {
    selectedType: {},
    modalVisible: false,
    queryValue: {
      page: 1,
      size: 20,
      keyword: '',
      sorter: 'CreatedOn',
      asc: false,
    },
  }
  componentDidMount() {
    this.fetchTypes();
  }

  fetchTypes = () => {
    const { dispatch } = this.props;
    const { queryValue } = this.state;
    dispatch({ type: 'datum/typeList', payload: queryValue });
  }

  handleSelectedType=(item) => {
    const { dispatch } = this.props;
    this.setState({ selectedType: item });
    dispatch({ type: 'datum/datumList', payload: item.code });
  }

  render() {
    const { datum, loading } = this.props;
    const { typeList, datumList } = datum;
    const { selectedType, selectedRows, modalVisible } = this.state;
    const datumTypeList = {
      list: typeList && typeList.data,
      pagination: {
        current: typeList && typeList.page,
        pageSize: typeList && typeList.size,
        total: typeList && typeList.totals,
      },
    };

    const columns = [
      {
        title: '选项值',
        dataIndex: 'code',
      }, {
        title: '选项名',
        dataIndex: 'name',
      }, {
        title: '操作',
      },
    ];

    return (
      <Fragment>
        <PageHeaderLayout>
          <Row gutter={8}>
            <Col xl={6} lg={24} md={12} sm={12} xs={12}>
              <div className={s.standardList}>
                <Card
                  className={s.listCard}
                  bordered={false}
                >
                  <Button
                    type="dashed"
                    style={{ width: '100%', marginBottom: 8, borderColor: '#1890ff', backgroundColor: '#1890ff11' }}
                    icon="plus"
                    onClick={() => this.handleModalVisible(true)}
                  >添加
                  </Button>
                  <List
                    size="middle"
                    rowKey="id"
                    loading={loading}
                    dataSource={datumTypeList.list}
                    pagination={datumTypeList.pagination}
                    renderItem={item => (
                      <List.Item key={item.id}>
                        <List.Item.Meta
                          title={<a onClick={() => { this.handleSelectedType(item); }}>{item.name} [{item.code}]</a>}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </div>
            </Col>
            <Col xl={18} lg={24} md={12} sm={12} xs={12}>
              <Card
                title="选项集信息"
                className={s.typeDetails}
              >
                <Row>
                  <Col sm={8} xs={24}>{selectedType.name}</Col>
                  <Col sm={8} xs={24}>{selectedType.code}</Col>
                </Row>
              </Card>
              <Table
                className={s.datumList}
                size="middle"
                rowKey="id"
                loading={loading}
                columns={columns}
                dataSource={datumList}
              />
              <Button
                type="dashed"
                style={{ width: '100%', marginBottom: 8, borderColor: '#1890ff', backgroundColor: '#1890ff11' }}
                icon="plus"
                onClick={() => this.handleModalVisible(true)}
              >添加
              </Button>
            </Col>
          </Row>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
