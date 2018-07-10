import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

export default class EditTableCellNumber extends PureComponent {
  static defaultProps = {
    editable: false,
    value: '',
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
        {editable
          ? (
            <InputNumber
              style={{ margin: '-5px 0' }}
              value={value}
              onChange={e => onChange(e.target.value)}
            />) : value
        }
      </div>
    );
  }
}
