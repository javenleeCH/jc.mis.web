import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tree, Input, Form, TreeSelect, Button, message } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

// import s from './List.less';

const { TreeNode } = Tree;
const Search = Input.Search;
const FormItem = Form.Item;

@connect(({ organ, loading }) => ({
  organ,
  loading: loading.models.organ,
}))
@Form.create()
export default class OrganList extends PureComponent {
  state = {
    expandedKeys: [],
    searchValue: '',
  }
  componentDidMount() {
    this.fetchTree();
  }

  fetchTree = () => {
    this.props.dispatch({
      type: 'organ/tree',
      payload: 0,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'organ/save',
          payload: values,
        });
        message.success('保存成功');
        this.fetchTree();
      }
    });
  }

  render() {
    const { organ: { tree, details }, loading, submitting } = this.props;
    const { searchValue, expandedKeys } = this.state;
    const { getFieldDecorator } = this.props.form;
    const dataList = [];
    const loop = data => data.map((item) => {
      dataList.push({ key: item.key, title: item.title });
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span title={item.desc}>
          {beforeStr}
          <span style={{ color: '#f50', background: '#ff0' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children.length > 0) {
        return (
          <TreeNode key={item.key} title={title}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });

    const onExpand = (expanded) => {
      this.setState({
        expandedKeys: expanded,
      });
    };

    const onChange = (e) => {
      const keyword = e.target.value;
      const expanded = dataList.map((item) => {
        if (item.title.indexOf(keyword) > -1) {
          return getParentKey(item.key, tree);
        }
        return null;
      }).filter((item, i, self) => item && self.indexOf(item) === i);
      this.setState({
        expandedKeys: expanded,
        searchValue: keyword,
      });
    };

    const getParentKey = (key, pNode) => {
      let parentKey;
      for (let i = 0; i < pNode.length; i++) {
        const node = pNode[i];
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key;
          } else if (getParentKey(key, node.children)) {
            parentKey = getParentKey(key, node.children);
          }
        }
      }
      return parentKey;
    };

    const onSelect = (key) => {
      this.props.dispatch({
        type: 'organ/get',
        payload: key,
      });
    };

    const onNew2Clear = () => {
      if (details) {
        details.id = 0;
        details.name = '';
        details.shortName = '';
        details.code = '';
        details.parentId = 0;
      }
      this.props.form.resetFields();
    };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <Fragment>
        <PageHeaderLayout>
          <Row gutter={24}>
            <Col xl={6} lg={24} md={24} sm={24} xs={24}>
              <Card bordered={false}>
                <Search style={{ marginBottom: 8 }} placeholder="查找" onChange={onChange} />
                <Tree
                  showLine
                  loading={loading}
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  onSelect={onSelect}
                  defaultExpandAll
                >
                  {loop(tree)}
                </Tree>
              </Card>
            </Col>
            <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
              <Card bordered={false}>
                <Form
                  onSubmit={this.handleSubmit}
                >
                  <FormItem
                    {...formItemLayout}
                    label="id"
                  >
                    <span className="ant-from-text">{details && details.id}</span>
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="编码"
                  >{getFieldDecorator('code', {
                    initialValue: details && details.code,
                    rules: [{
                      required: true, message: '请输入编码',
                    }],
                  })(
                    <Input placeholder="组织编码" />
                  )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="简称"
                  >{getFieldDecorator('shortName', {
                    initialValue: details && details.shortName,
                    rules: [{
                      required: true, message: '请输入简称',
                    }],
                  })(
                    <Input placeholder="简称" />
                  )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="全称"
                  >{getFieldDecorator('name', {
                    initialValue: details && details.name,
                    rules: [{
                      required: true, message: '请输入全称',
                    }],
                  })(
                    <Input placeholder="全称" />
                  )}
                  </FormItem>
                  <FormItem
                    {...formItemLayout}
                    label="上级组织"
                  >{getFieldDecorator('parentId', {
                    initialValue: details && details.parentId + '',
                    rules: [{
                      required: true, message: '选择上级',
                    }],
                  })(
                    <TreeSelect
                      treeData={tree}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeDefaultExpandAll
                      placeholder="选择上级"
                    />
                  )}
                  </FormItem>
                  <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                    <Button type="primary" htmlType="submit" loading={submitting}>
                      保存
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={onNew2Clear}>清空新建</Button>
                  </FormItem>
                </Form>
              </Card>
            </Col>
          </Row>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
