import React, { FC } from 'react';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';

/**
 * @render react
 * @name Grid component
 * @description Grid component.
 * @example
 * <Grid
 *  columns={2}
 *  gap={20}
 * >
 *  <Component />
 *  <Component />
 * </Grid>
 */

export interface Props {
  children: any;
  className?: string;
  columns: number | (number|null)[];
  gap?: number;
}

const Grid: FC<Props> = ({ children, className, columns, gap }) => (
  <Wrapper
    className={classNames('c-grid', className)}
    columns={columns}
    gridGap={gap}
    rows={columns}
  >
    {children}
  </Wrapper>
);

export default Grid;
