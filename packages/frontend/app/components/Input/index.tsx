import React, { FC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper, { HelperText } from './styles';
import Dropzone from '../Dropzone/Loadable';
import Spacer from '../Spacer';
import Select from '../Select/Loadable';

export interface IInputProps {
  istoggle?: boolean;
  className?: string;
  checked?: boolean;
  helperText?: string;
  id: string;
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void;
  options?: any;
  placeholder?: string;
  readonly?: boolean;
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
  label,
  sronly,
  ...rest
}) => {
  const renderLabel = (label: string, sronly?: boolean) => (
    <span
      className={classNames('a-label', {
        'sr-only': sronly,
      })}
    >
      {label}
    </span>
  );

  const renderInput = () => {
    switch (rest.type) {
      case 'file':
        return <Dropzone {...rest} />;
      case 'select':
        return <Select {...rest} />;
      case 'textarea':
        return <textarea id={id} className="a-textarea" {...rest} />;
      default:
        return <input id={id} className="a-input" {...rest} />;
    }
  };

  return (
    <Wrapper
      className={classNames('c-input__wrapper', className, {
        '-active': rest.checked,
      })}
      {...rest}
    >
      <label htmlFor={id}>
        {
          (rest.type !== 'checkbox' && rest.type !== 'radio')
          && (
            <React.Fragment>
              {renderLabel(label, sronly)}
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
              {renderLabel(label, sronly)}
            </React.Fragment>
          )
        }
        { helperText && <HelperText>{helperText}</HelperText>}
      </label>
    </Wrapper>
  );
};

export default Input;
