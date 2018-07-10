import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment, { now } from 'moment';
import { DatePicker } from 'antd';

export default class EditTableCellDate extends PureComponent {
  static defaultProps = {
    editable: false,
    value: moment(now()).format('YYYY-MM-DD'),
    onChange: () => {},
  }
  static propTypes = {
    editable: PropTypes.bool,
    value: PropTypes.any,
    onChange: PropTypes.func,
  }
  render() {
    const { editable, value, onChange } = this.props;
    return (
      <div>
        {editable ? (
          <DatePicker
            style={{ width: '120px' }}
            type="date"
            format="YYYY-MM-DD"
            value={moment(value)}
            onChange={(date, dateString) => onChange(dateString)}
          />
        ) : (moment(value).format('YYYY-MM-DD')) }
      </div>
    );
  }
}
