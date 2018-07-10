import React, { PureComponent } from 'react';
import moment, { now } from 'moment';
import { Row, Col, Card, DatePicker, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import CPeriod from '../../components/Sales/Period/CPeriod';
import CChain from '../../components/Sales/Period/CChain';

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
export default class Period extends PureComponent {
 state={
   type: 3,
   date: moment(now()).format(dateFormat),
 }

 onTypeChange=(value) => {
   this.setState({ type: value });
 }

 onDateSelect=(date, dateString) => {
   this.setState({ date: dateString });
 }

 render() {
   return (
     <PageHeaderLayout>
       <Card bordered={false}>
         <Row gutter={10}>
           <Col xs={24} sm={24}>
             <Select
               style={{ marginTop: 5 }}
               defaultValue={this.state.type}
               onChange={this.onTypeChange}
             >
               {/* <Option value={1}>日</Option> */}
               <Option value={2}>周</Option>
               <Option value={3}>月</Option>
               <Option value={4}>季</Option>
               <Option value={5}>年</Option>
             </Select>
             <DatePicker
               style={{ marginTop: 5 }}
               defaultValue={moment(this.state.date, dateFormat)}
               format={dateFormat}
               onChange={this.onDateSelect}
             />
           </Col>
         </Row>
       </Card>
       <CPeriod type={this.state.type} date={this.state.date} />
       <CChain type={this.state.type} date={this.state.date} />
     </PageHeaderLayout>
   );
 }
}
