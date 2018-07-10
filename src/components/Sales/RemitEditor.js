import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment, { now } from 'moment';
import { Form, Input, DatePicker, Button, Select, InputNumber } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const options2yesno = [{ key: '0', value: '0', title: '否' }, { key: '1', value: '1', title: '是' }];

@connect(({ sales, user, datum }) => ({ sales, user, datum }))
class RemitEditor extends PureComponent {
  state={
    showIsReferral: false,
    showIsExpired: false,
    showIncrease: false,
  }
  componentDidMount() {
    const { id, dispatch } = this.props;
    this.fetchProd();
    this.fetchUserOptions();
    const types = 'custChannel';
    this.fetchOptions(types);
    this.fetchUser();
    if (id) {
      dispatch({ type: 'sales/remitDtl', payload: id });
    }
  }

  onIsNewChange=(value) => {
    this.setState({
      showIsReferral: value !== '0',
      showIsExpired: value === '0',
    });
  }

  onIsExpiredChange=(value) => {
    this.setState({
      showIncrease: value !== '0',
    });
  }

  fetchOptions = (types) => {
    const { dispatch } = this.props;
    dispatch({ type: 'datum/types', payload: types });
  }

  fetchProd=() => {
    const { dispatch } = this.props;
    dispatch({ type: 'sales/prodOptions' });
  }

  fetchUserOptions = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/options',
      payload: {
        type: 2, ctl: 'sales', act: 'remit',
      } });
  }

  fetchUser = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchCurrent' });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { sales: { remitDtl }, dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fields = values;
        if (remitDtl) {
          fields = { ...fields, id: remitDtl.id };
        }
        dispatch({
          type: 'sales/remitSave',
          payload: fields,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { sales: { remitDtl, prodOptions },
      user: { userOptions, currentUser },
      datum: { options } } = this.props;
    const { showIsReferral, showIsExpired, showIncrease } = this.state;
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
        <FormItem {...formItemLayout} label="理财师">
          {getFieldDecorator('userId', {
            initialValue: remitDtl ? remitDtl.userId + '' : currentUser.id + '',
            rules: [{ required: true }],
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
        <FormItem {...formItemLayout} label="打款时间">
          {getFieldDecorator('remitOn', {
            initialValue: moment(remitDtl ? remitDtl.remitOn : now()),
            rules: [{ required: true, message: '请输入打款时间' }],
          })(<DatePicker type="date" format="YYYY-MM-DD" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="客户姓氏">
          {getFieldDecorator('customer', {
            initialValue: remitDtl && remitDtl.customer,
          })(<Input placeholder="请输入客户姓氏" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="购买项目">
          {getFieldDecorator('productId', {
            initialValue: remitDtl && remitDtl.productId,
            rules: [{ required: true, message: '请选择购买项目' }],
          })(
            <Select
              placeholder="--购买项目--"
              showSearch
              optionFilterProp="children"
            >
              {prodOptions && prodOptions.map(d => (
                <Option
                  key={d.id}
                  value={d.id}
                >[{d.code}] {d.name}
                </Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="成交金额(万)">
          {getFieldDecorator('amount', {
              initialValue: remitDtl ? remitDtl.amount : 0,
              rules: [{ required: true, message: '请输入成交金额' }],
            })(
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入成交金额"
                min={0}
              />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否新客户">
          {getFieldDecorator('isNew', {
            initialValue: remitDtl && remitDtl.isNew + '',
            rules: [{ required: true, message: '是否新客户' }],
          })(
            <Select
              style={{ display: 'block' }}
              onChange={value => this.onIsNewChange(value)}
            >
              {options2yesno && options2yesno.map(d => (
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
          label="客户渠道"
          style={{ display: showIsReferral ? 'inherit' : 'none' }}
        >
          {getFieldDecorator('custChannel', {
              initialValue: remitDtl ? remitDtl.custChannel + '' : '1010',
            })(
              <Select placeholder="--客户渠道--" style={{ display: 'block' }}>
                {options.custChannel !== undefined && options.custChannel.map(d => (
                  <Option
                    key={d.key}
                    value={d.value}
                    disabled={d.disabled}
                  >{d.title}
                  </Option>))}
              </Select>
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="是否存续期产品到期打款"
          style={{ display: showIsExpired ? 'inherit' : 'none' }}
        >
          {getFieldDecorator('isExpired', {
            initialValue: remitDtl ? remitDtl.isExpired + '' : '0',
          })(
            <Select
              style={{ display: 'block' }}
              onChange={value => this.onIsExpiredChange(value)}
            >
              {options2yesno && options2yesno.map(d => (
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
          label="存续金额新增部分(万)"
          style={{ display: showIncrease ? 'inherit' : 'none' }}
        >
          {getFieldDecorator('increase', {
              initialValue: remitDtl ? remitDtl.increase : 0,
            })(
              <InputNumber
                style={{ width: '100%' }}
                placeholder="请输入存续金额新增部分"
                min={0}
              />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label="助理理财师">
          {getFieldDecorator('cooperate', {
            initialValue: remitDtl ? remitDtl.cooperate + '' : '-1',
          })(
            <Select
              placeholder="--助理理财师--"
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
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('memo', {
            initialValue: remitDtl && remitDtl.memo,
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

export default RemitEditor = Form.create()(RemitEditor);
