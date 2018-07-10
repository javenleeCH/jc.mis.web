import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const Option = Select.Option;

export default class EditTableCellSelect extends PureComponent {
  static defaultProps = {
    editable: false,
    options: [],
    selectValue: '',
    onChange: () => {},
  }
  static propTypes = {
    editable: PropTypes.bool,
    options: PropTypes.array,
    selectValue: PropTypes.any,
    onChange: PropTypes.func,
  }
  render() {
    const { editable, selectValue, options, onChange } = this.props;
    return (
      <div>
        {
          <Select
            style={{ display: 'block' }}
            dropdownStyle={{ minWidth: 200 }}
            value={selectValue + ''}
            disabled={!editable}
            onChange={value => onChange(value)}
          >
            {options && options.map(d => (
              <Option
                key={d.key}
                value={d.value}
                disabled={d.disabled}
              >{d.title}
              </Option>))}
          </Select>
        }
      </div>
    );
  }
}
