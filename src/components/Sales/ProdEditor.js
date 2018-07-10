import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form, Input, DatePicker, Button } from 'antd';

const FormItem = Form.Item;

@connect(({ sales }) => ({ sales }))
class ProdEditor extends PureComponent {
  componentDidMount() {
    const { id, dispatch } = this.props;
    if (id) {
      dispatch({ type: 'sales/prodDtl', payload: id });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { sales: { prodDtl }, dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let fields = values;
        if (prodDtl) {
          fields = { ...fields, id: prodDtl.id };
        }
        dispatch({
          type: 'sales/prodSave',
          payload: fields,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { sales: { prodDtl } } = this.props;
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
        <FormItem {...formItemLayout} label="产品编码">
          {getFieldDecorator('code', {
            initialValue: prodDtl && prodDtl.code,
            rules: [{ required: true, message: '请输入编码' }],
          })(<Input placeholder="请输入编码" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="名称">
          {getFieldDecorator('name', {
            initialValue: prodDtl && prodDtl.name,
            rules: [{ required: true, message: '请输入名称' }],
          })(<Input placeholder="请输入名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="简称">
          {getFieldDecorator('shortName', {
            initialValue: prodDtl && prodDtl.shortName,
            rules: [{ required: true, message: '请输入简称' }],
          })(<Input placeholder="请输入简称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="业绩折算系数">
          {getFieldDecorator('ratio', {
            initialValue: prodDtl && prodDtl.ratio,
            rules: [{ required: true, message: '请输入业绩折算系数' }],
          })(<Input placeholder="请输入业绩折算系数" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="期限（月）">
          {getFieldDecorator('expires', {
            initialValue: prodDtl && prodDtl.expires,
          })(<Input placeholder="请输入期限（月）" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="上线时间">
          {getFieldDecorator('onlineDate', {
            initialValue: prodDtl && moment(prodDtl.onlineDate),
          })(<DatePicker type="date" format="YYYY-MM-DD" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="下线时间">
          {getFieldDecorator('offlineDate', {
            initialValue: prodDtl && moment(prodDtl.offlineDate),
          })(<DatePicker type="date" format="YYYY-MM-DD" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="产品收益率">
          {getFieldDecorator('yieldRate', {
            initialValue: prodDtl && prodDtl.yieldRate,
          })(<Input placeholder="请输入产品收益率" />)}
        </FormItem>
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">保 存</Button>
        </FormItem>
      </Form>
    );
  }
}

export default ProdEditor = Form.create()(ProdEditor);
