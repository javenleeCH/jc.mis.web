import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Form, Input, DatePicker, Button, Select, TreeSelect } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ organ, user, datum }) => ({ organ, user, datum }))
class UserEditor extends PureComponent {
  componentDidMount() {
    const { id, dispatch } = this.props;
    this.fetchOrgan();
    this.fetchOptions('position');
    if (id) {
      dispatch({ type: 'user/details', payload: id });
    }
  }

  fetchOrgan = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'organ/tree', payload: 0 });
  }

  fetchOptions = (types) => {
    const { dispatch } = this.props;
    dispatch({ type: 'datum/types', payload: types });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { user: { details }, dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fields = values;
        if (details) {
          fields = { ...fields, id: details.id };
        }
        fields = { ...fields, groupId: 1 };
        dispatch({
          type: 'user/save',
          payload: fields,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { organ, user: { details }, datum: { options } } = this.props;
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
      <Form onSubmit={e => this.handleSubmit(e)}>
        <FormItem {...formItemLayout} label="工号">
          {getFieldDecorator('code', {
          initialValue: details && details.code,
          rules: [
            {
              required: true,
              message: '请输入工号',
            },
          ],
        })(<Input placeholder="请输入工号" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
          initialValue: details && details.name,
          rules: [
            {
              required: true,
              message: '请输入姓名',
            },
          ],
        })(<Input placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="用户名">
          {getFieldDecorator('userName', {
          initialValue: details && details.userName,
          rules: [
            {
              required: true,
              message: '请输入用户名',
            },
          ],
        })(<Input placeholder="请输入用户名" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="域用户名">
          {getFieldDecorator('domainName', {
          initialValue: details && details.domainName,
          rules: [
            {
              required: true,
              message: '请输入域用户名',
            },
          ],
        })(<Input placeholder="请输入域用户名" />)}
        </FormItem>
        {/* <FormItem {...formItemLayout} label="所属集团">
          {getFieldDecorator('groupId', {
          initialValue: details ? details.groupId + '' : '1',
          rules: [{ required: true, message: '选择集团' }],
        })(<TreeSelect
          style={{ width: '100%' }}
          treeData={organ.tree}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll
          placeholder="选择集团"
        />)}
        </FormItem> */}
        <FormItem {...formItemLayout} label="所属局">
          {getFieldDecorator('bureauId', {
          initialValue: details && details.bureauId + '',
          rules: [{ required: true, message: '所属局' }],
        })(<TreeSelect
          style={{ width: '100%' }}
          treeData={organ.tree}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll
          placeholder="所属局"
        />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所属分公司">
          {getFieldDecorator('compId', {
          initialValue: details && details.compId + '',
          rules: [{ required: true, message: '选择公公司' }],
        })(<TreeSelect
          style={{ width: '100%' }}
          treeData={organ.tree}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll
          placeholder="选择分公司"
        />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所属部门">
          {getFieldDecorator('deptId', {
          initialValue: details && details.deptId + '',
          rules: [{ required: true, message: '选择部门' }],
        })(<TreeSelect
          style={{ width: '100%' }}
          treeData={organ.tree}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeDefaultExpandAll
          placeholder="选择部门"
        />)}
        </FormItem>
        <FormItem {...formItemLayout} label="入职日期">
          {getFieldDecorator('entryDate', {
          initialValue: moment(details ? details.entryDate : now()),
          rules: [{ required: true }],
        })(<DatePicker type="date" format="YYYY-MM-DD" style={{ width: '100%' }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="职位">
          {getFieldDecorator('position', {
          initialValue: details && details.position + '',
          rules: [{ required: true }],
        })(
          <Select style={{ display: 'block' }} >
            {options && options.position !== undefined && options.position.map(d => (
              <Option
                key={d.key}
                value={d.value}
                disabled={d.disabled}
              >{d.title}
              </Option>))}
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label="邮箱">
          {getFieldDecorator('email', {
          initialValue: details && details.email,
          rules: [
            {
              message: '请输入邮箱',
            },
          ],
        })(<Input placeholder="请输入邮箱" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="手机">
          {getFieldDecorator('mobile', {
          initialValue: details && details.mobile,
          rules: [
            {
              message: '请输入手机',
            },
          ],
        })(<Input placeholder="请输入手机" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="座机">
          {getFieldDecorator('telephone', {
          initialValue: details && details.telephone,
          rules: [
            {
              message: '请输入座机',
            },
          ],
        })(<Input placeholder="请输入座机" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="地址">
          {getFieldDecorator('address', {
          initialValue: details && details.address,
          rules: [
            {
              message: '请输入地址',
            },
          ],
        })(<Input placeholder="请输入地址" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="离职/转岗日期">
          {getFieldDecorator('termDate', {
          initialValue: moment(details ? details.termDate : '2099-12-12'),
          rules: [{ required: true }],
        })(<DatePicker type="date" format="YYYY-MM-DD" style={{ width: '100%' }} />)}
        </FormItem>

        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button
            style={{ width: '100%' }}
            type="primary"
            htmlType="submit"
          >保 存
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default UserEditor = Form.create()(UserEditor);
