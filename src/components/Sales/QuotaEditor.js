import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Form, Input, TreeSelect, Button, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ sales, user, datum, organ }) => ({ sales, user, datum, organ }))
class QuotaEditor extends PureComponent {
  state={
    showComp: false,
    showDept: false,
    showUser: false,
  }
  componentDidMount() {
    const { id, dispatch } = this.props;
    this.fetchUserOptions();
    this.fetchOptions('latitude');
    this.fetchOrganTree();
    if (id) {
      dispatch({ type: 'sales/quotaDtl', payload: id });
    }
  }

  onLatitudeChange=(value) => {
    this.setState({
      showComp: value === '1010',
      showDept: value === '1020',
      showUser: value === '1030',
    });
  }

  fetchUserOptions = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/options',
      payload: {
        type: 2, ctl: 'sales', act: 'quota',
      } });
  }

  fetchOptions = (types) => {
    const { dispatch } = this.props;
    dispatch({ type: 'datum/types', payload: types });
  }

  fetchOrganTree = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'organ/tree', payload: 10 });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { sales: { quotaDtl }, dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fields = values;
        if (quotaDtl) {
          fields = { ...fields, id: quotaDtl.id };
        }
        dispatch({
          type: 'sales/quotaSave',
          payload: fields,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { sales: { quotaDtl }, user: { userOptions }, datum: { options }, organ } = this.props;
    const { showComp, showDept, showUser } = this.state;
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
        <FormItem {...formItemLayout} label="年">
          {getFieldDecorator('quotaYear', {
            initialValue: quotaDtl ? quotaDtl.quotaYear : 2018,
            rules: [{ required: true, message: '年' }],
          })(
            <Select placeholder="--年--">
              <Option key={2018} value={2018} >2018年</Option>
              <Option key={2017} value={2017} >2017年</Option>
              <Option key={2016} value={2016} >2016年</Option>
            </Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="月"
          style={{ display: 'none' }}
        >
          {getFieldDecorator('quotaMonth', {
            initialValue: quotaDtl ? quotaDtl.quotaMonth : 1,
            rules: [{ required: true, message: '月' }],
          })(
            <Select placeholder="--月--">
              <Option key={1} value={1} >一月</Option>
              <Option key={2} value={2} >二月</Option>
              <Option key={4} value={4} >四月</Option>
              <Option key={5} value={5} >五月</Option>
              <Option key={6} value={6} >六月</Option>
              <Option key={7} value={7} >七月</Option>
              <Option key={8} value={8} >八月</Option>
              <Option key={9} value={9} >九月</Option>
              <Option key={10} value={10} >十月</Option>
              <Option key={11} value={11} >十一月</Option>
              <Option key={12} value={12} >十二月</Option>
            </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label="考核维度">
          {getFieldDecorator('latitude', {
            initialValue: quotaDtl && quotaDtl.latitude,
            rules: [{ required: true, message: '考核维度' }],
          })(
            <Select
              style={{ display: 'block' }}
              onChange={value => this.onLatitudeChange(value)}
            >
              {options && options.latitude !== undefined && options.latitude.map(d => (
                <Option
                  key={d.key}
                  value={d.value}
                >{d.title}
                </Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="分公司"
          style={{ display: showComp ? 'inherit' : 'none' }}
        >
          {getFieldDecorator('compId', {
            initialValue: quotaDtl ? quotaDtl.compId + '' : '-1',
          })(<TreeSelect
            showSearch
            treeNodeFilterProp="title"
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, minWidth: 200, overflow: 'auto' }}
            treeDefaultExpandAll
            placeholder="选择分公司"
            treeData={organ.tree}
          />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="部门"
          style={{ display: showDept ? 'inherit' : 'none' }}
        >
          {getFieldDecorator('deptId', {
            initialValue: quotaDtl ? quotaDtl.deptId + '' : '-1',
          })(<TreeSelect
            showSearch
            treeNodeFilterProp="title"
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, minWidth: 200, overflow: 'auto' }}
            treeDefaultExpandAll
            placeholder="部门"
            treeData={organ.tree}
          />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="理财师"
          style={{ display: showUser ? 'inherit' : 'none' }}
        >
          {getFieldDecorator('userId', {
            initialValue: quotaDtl ? quotaDtl.userId + '' : '-1',
          })(
            <Select
              placeholder="--理财师--"
              showSearch
              optionFilterProp="children"
            >
              <Option key="-1" value="-1">无</Option>
              {userOptions && userOptions.map(d => (
                <Option
                  key={d.key}
                  value={d.value}
                  disabled={d.disabled}
                >{d.title}
                </Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="标准目标(万)">
          {getFieldDecorator('standard', {
              initialValue: quotaDtl ? quotaDtl.standard : 0,
              rules: [{ required: true, message: '请输入标准目标' }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入标准目标"
                min={0}
              />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="挑战目标(万)">
          {getFieldDecorator('challenge', {
              initialValue: quotaDtl ? quotaDtl.challenge : 0,
              rules: [{ required: true, message: '请输入挑战目标' }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入挑战目标"
                min={0}
              />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('memo', {
            initialValue: quotaDtl && quotaDtl.memo,
          })(<Input placeholder="备注" />)}
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

export default QuotaEditor = Form.create()(QuotaEditor);
