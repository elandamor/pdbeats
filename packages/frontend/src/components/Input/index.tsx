import React, { FC } from 'react';
import classNames from 'classnames';
import { FieldProps } from 'formik';
// Styles
import Wrapper, { HelperText } from './styles';
import Dropzone from '../Dropzone/Loadable';
import Spacer from '../Spacer';
import Select from '../Select/Loadable';
import { StyledSystemProps } from 'styled-system';

export interface IInputProps extends FieldProps, StyledSystemProps {
  toggle?: boolean;
  className?: string;
  checked?: boolean;
  helperText?: string;
  id?: string;
  label: string;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
  options?: any;
  placeholder?: string;
  readonly?: boolean;
  isMulti?: boolean;
  rows?: number;
  sronly?: boolean;
  type:
    | 'text'
    | 'email'
    | 'file'
    | 'date'
    | 'password'
    | 'textarea'
    | 'checkbox'
    | 'radio'
    | 'number'
    | 'time'
    | 'select';
  value?: any;
}

/**
 * @render react
 * @name Input component
 * @description Input component.
 * @example
 * <Input
 *  id="text"
 *  label="Text"
 *  name="text"
 *  type="text"
 * />
 */

const Input: FC<IInputProps> = ({
  className,
  helperText,
  id,
  field,
  label,
  name,
  sronly,
  ...rest
}) => {
  const renderLabel = () => (
    <span
      className={classNames('a-label', {
        'sr-only': sronly,
      })}
    >
      {label}
    </span>
  );

  const renderInput = () => {
    const inputProps = {
      ...rest,
      id: id || field.name,
      name: name || field.name,
    };

    switch (rest.type) {
      case 'file':
        return <Dropzone {...inputProps} />;
      case 'select':
        return <Select {...inputProps} />;
      case 'textarea':
        return <textarea {...inputProps} />;
      default:
        return <input {...inputProps} />;
    }
  };

  return (
    <Wrapper
      className={classNames('c-input__wrapper', className, {
        '-active': rest.checked,
      })}
      {...rest}
    >
      <label htmlFor={id || field.name}>
        {
          (rest.type !== 'checkbox' && rest.type !== 'radio')
          && (
            <React.Fragment>
              {renderLabel()}
              {!sronly && <Spacer spacing={8} />}
            </React.Fragment>
          )
        }
        { renderInput() }
        {
          (rest.type === 'checkbox' || rest.type === 'radio')
          && (
            <React.Fragment>
              <span className={`a-${rest.type}`} />
              {renderLabel()}
            </React.Fragment>
          )
        }
        { helperText && <HelperText>{helperText}</HelperText>}
      </label>
    </Wrapper>
  );
};

Input.defaultProps = {
  mb: 2,
}

export default Input;
