import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, List, Icon, Card, Switch, Table, Input, Form, Select, TreeSelect, Button, message, Divider, Modal, Popconfirm } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const CreateForm = Form.create()((props) => {
  const {
    modalVisible,
    form,
    handleSave,
    handleModalVisible,
    moduleList,
    dataItem,
  } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      handleSave(fieldsValue);
    });
  };

  const loopTreeSelect = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode key={item.id} title={item.name} value={item.id + ''}>
          {loopTreeSelect(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.id} title={item.name} value={item.id + ''} />;
  });

  const icons = { direction: ['step-backward', 'step-forward', 'fast-backward', 'fast-forward', 'shrink', 'arrows-alt', 'down', 'up', 'left', 'right', 'caret-up', 'caret-down', 'caret-left', 'caret-right', 'up-circle', 'down-circle', 'left-circle', 'right-circle', 'up-circle-o', 'down-circle-o', 'right-circle-o', 'left-circle-o', 'double-right', 'double-left', 'verticle-left', 'verticle-right', 'forward', 'backward', 'rollback', 'enter', 'retweet', 'swap', 'swap-left', 'swap-right', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'play-circle', 'play-circle-o', 'up-square', 'down-square', 'left-square', 'right-square', 'up-square-o', 'down-square-o', 'left-square-o', 'right-square-o', 'login', 'logout', 'menu-fold', 'menu-unfold'], suggestion: ['question', 'question-circle-o', 'question-circle', 'plus', 'plus-circle-o', 'plus-circle', 'pause', 'pause-circle-o', 'pause-circle', 'minus', 'minus-circle-o', 'minus-circle', 'plus-square', 'plus-square-o', 'minus-square', 'minus-square-o', 'info', 'info-circle-o', 'info-circle', 'exclamation', 'exclamation-circle-o', 'exclamation-circle', 'close', 'close-circle', 'close-circle-o', 'close-square', 'close-square-o', 'check', 'check-circle', 'check-circle-o', 'check-square', 'check-square-o', 'clock-circle-o', 'clock-circle'], logo: ['android', 'android-o', 'apple', 'apple-o', 'windows', 'windows-o', 'ie', 'chrome', 'github', 'aliwangwang', 'aliwangwang-o', 'dingding', 'dingding-o'], other: ['lock', 'unlock', 'area-chart', 'pie-chart', 'bar-chart', 'dot-chart', 'bars', 'book', 'calendar', 'cloud', 'cloud-download', 'code', 'code-o', 'copy', 'credit-card', 'delete', 'desktop', 'download', 'edit', 'ellipsis', 'file', 'file-text', 'file-unknown', 'file-pdf', 'file-excel', 'file-jpg', 'file-ppt', 'file-add', 'folder', 'folder-open', 'folder-add', 'hdd', 'frown', 'frown-o', 'meh', 'meh-o', 'smile', 'smile-o', 'inbox', 'laptop', 'appstore-o', 'appstore', 'line-chart', 'link', 'mail', 'mobile', 'notification', 'paper-clip', 'picture', 'poweroff', 'reload', 'search', 'setting', 'share-alt', 'shopping-cart', 'tablet', 'tag', 'tag-o', 'tags', 'tags-o', 'to-top', 'upload', 'user', 'video-camera', 'home', 'loading', 'loading-3-quarters', 'cloud-upload-o', 'cloud-download-o', 'cloud-upload', 'cloud-o', 'star-o', 'star', 'heart-o', 'heart', 'environment', 'environment-o', 'eye', 'eye-o', 'camera', 'camera-o', 'save', 'team', 'solution', 'phone', 'filter', 'exception', 'export', 'customer-service', 'qrcode', 'scan', 'like', 'like-o', 'dislike', 'dislike-o', 'message', 'pay-circle', 'pay-circle-o', 'calculator', 'pushpin', 'pushpin-o', 'bulb', 'select', 'switcher', 'rocket', 'bell', 'disconnect', 'database', 'compass', 'barcode', 'hourglass', 'key', 'flag', 'layout', 'printer', 'sound', 'usb', 'skin', 'tool', 'sync', 'wifi', 'car', 'schedule', 'user-add', 'user-delete', 'usergroup-add', 'usergroup-delete', 'man', 'woman', 'shop', 'gift', 'idcard', 'medicine-box', 'red-envelope', 'coffee', 'copyright', 'trademark', 'safety', 'wallet', 'bank', 'trophy', 'contacts', 'global', 'shake', 'api'] };
  const iconsList = Object.keys(icons).map(v => icons[v].map(icon => (
    <Option value={icon}>
      <Icon type={icon} style={{ fontSize: 15 }} />
      <span>{icon}</span>
    </Option>
  )));

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
  const options2yesno = [{ key: '0', value: '0', title: '否' }, { key: '1', value: '1', title: '是' }];

  return (
    <Modal
      title="编辑功能模块信息"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...formItemLayout} label="编码">
        {form.getFieldDecorator('code', {
          initialValue: dataItem && dataItem.code,
          rules: [{ required: true, message: '请输入编码' }],
        })(<Input placeholder="请输入编码" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="名称">
        {form.getFieldDecorator('name', {
          initialValue: dataItem && dataItem.name,
          rules: [{ required: true, message: '请输入名称' },
          ],
        })(<Input placeholder="请输入名称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="简称">
        {form.getFieldDecorator('shortName', {
          initialValue: dataItem && dataItem.shortName,
          rules: [{ required: true, message: '请输入简称' },
          ],
        })(<Input placeholder="请输入简称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="上级模块">
        {form.getFieldDecorator('parentId', {
          initialValue: dataItem && dataItem.parentId + '',
          rules: [{ required: true, message: '请选择上级模块' }],
        })(
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeDefaultExpandAll
            placeholder="选择上级模块"
          >
            {loopTreeSelect(moduleList)}
          </TreeSelect>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="控制器/路由">
        {form.getFieldDecorator('controller', {
          initialValue: dataItem && dataItem.controller,
          rules: [{ required: true, message: '请输入控制器/路由' },
          ],
        })(<Input placeholder="请输入控制器/路由" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="事件/方法">
        {form.getFieldDecorator('action', {
          initialValue: dataItem && dataItem.action,
          rules: [{ required: true, message: '请输入事件/方法' },
          ],
        })(<Input placeholder="请输入事件/方法" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="路径">
        {form.getFieldDecorator('path', {
          initialValue: dataItem && dataItem.path,
          rules: [{ required: true, message: '请输入路径' },
          ],
        })(<Input placeholder="请输入路径" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否为分组">
        {form.getFieldDecorator('isGroup', {
          initialValue: dataItem && dataItem.isGroup,
          rules: [{ required: true }],
        })(
          <Select style={{ display: 'block' }} >
            {options2yesno.map(d => (
              <Option key={d.key} value={d.value} >{d.title} </Option>
            ))}
          </Select>
      )}
      </FormItem>
      <FormItem {...formItemLayout} label="是否为菜单">
        {form.getFieldDecorator('isMenu', {
          initialValue: dataItem && dataItem.isMenu,
          rules: [{ required: true }],
        })(
          <Select style={{ display: 'block' }} >
            {options2yesno.map(d => (
              <Option key={d.key} value={d.value} >{d.title} </Option>
            ))}
          </Select>
      )}
      </FormItem>
      <FormItem {...formItemLayout} label="是否显示">
        {form.getFieldDecorator('isShow', {
          initialValue: dataItem && dataItem.isShow,
          rules: [{ required: true }],
        })(
          <Select style={{ display: 'block' }} >
            {options2yesno.map(d => (
              <Option key={d.key} value={d.value} >{d.title} </Option>
            ))}
          </Select>
      )}
      </FormItem>
      <FormItem {...formItemLayout} label="大图标（64x64）">
        {form.getFieldDecorator('icon64', {
          initialValue: dataItem && dataItem.icon64,
        })(
          <Select
            showSearch
            style={{ width: '100%' }}
          >{iconsList}
          </Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="中图标（32x32）">
        {form.getFieldDecorator('icon32', {
          initialValue: dataItem && dataItem.icon32,
        })(
          <Select
            showSearch
            style={{ width: '100%' }}
          >{iconsList}
          </Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="小图标（16x16）">
        {form.getFieldDecorator('icon16', {
          initialValue: dataItem && dataItem.icon16,
        })(
          <Select
            showSearch
            style={{ width: '100%' }}
          >{iconsList}
          </Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="备注">
        {form.getFieldDecorator('memo', {
          initialValue: dataItem && dataItem.memo,
        })(<Input placeholder="请输入备注" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ module, loading }) => ({ module, loading: loading.models.module }))
@Form.create()
export default class ModuleList extends PureComponent {
  state = {
    selectedRecord: {},
    modalVisible: false,
  }
  componentDidMount() {
    this.fetchModule();
  }

  fetchModule = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'module/list' });
  }

  handleEdit = (record) => {
    this.setState({ selectedRecord: record });
    this.setState({ modalVisible: true });
  };

  handleSave = (fields) => {
    const { dispatch, module: { msg } } = this.props;
    const { selectedRecord } = this.state;
    dispatch({ type: 'module/save',
      payload: {
        ...fields,
        id: selectedRecord.id,
      } })
      .then(() => {
        message.success(msg);
        this.setState({ modalVisible: false });
        this.fetchModule();
      });
  }

  handleModalVisible = (flag) => {
    this.setState({ selectedRecord: {
      id: 0, appId: 1, parentId: 1, isShow: 1,
    } });
    this.props.form.resetFields();
    this.setState({ modalVisible: !!flag });
  }

  render() {
    const { module, loading } = this.props;
    const { list } = module;
    const { selectedRecord, modalVisible } = this.state;
    const parentMethods = {
      moduleList: list,
      handleSave: this.handleSave,
      handleModalVisible: this.handleModalVisible,
      dataItem: selectedRecord,
    };

    const columns = [
      { title: '简称',
        dataIndex: 'shortName',
      },
      { title: '控制器',
        dataIndex: 'controller',
      },
      { title: '事件/方法',
        dataIndex: 'action',
      },
      { title: '路径',
        dataIndex: 'path',
      },
      { title: '操作',
        dataIndex: 'operate',
        render: (text, record) => {
          return (
            <Fragment>
              <a onClick={() => this.handleEdit(record)}>编辑</a>
            </Fragment>
          );
        },
      },
    ];

    return (
      <Fragment>
        <PageHeaderLayout>
          <Card>
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8, borderColor: '#1890ff', backgroundColor: '#1890ff11' }}
              icon="plus"
              onClick={() => this.handleModalVisible(true)}
            >添加
            </Button>
            <Table
              size="small"
              loading={loading}
              rowKey={record => record.id}
              columns={columns}
              dataSource={list}
            />
            <CreateForm {...parentMethods} modalVisible={modalVisible} />
          </Card>
        </PageHeaderLayout>
      </Fragment>
    );
  }
}
