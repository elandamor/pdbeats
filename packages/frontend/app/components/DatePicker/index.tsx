import React, { FC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';

// import { makeDebugger } from '../../utils';
// const debug = makeDebugger('DatePicker');

interface IProps {
  className?: string;
};

/**
 * @render react
 * @name DatePicker component
 * @description DatePicker component.
 * @example
 * <DatePicker />
 */

const DatePicker: FC<IProps> = ({ className }) => (
  <Wrapper className={classNames('', className)} />
);

export default DatePicker;
