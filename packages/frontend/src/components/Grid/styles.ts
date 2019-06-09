import styled from 'styled-components';
import {
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateAreas,
  gridArea,
  SSGridProps
} from 'styled-system';
import { style } from 'styled-system'

interface IGridProps extends SSGridProps {
  columns?: number | (number|null)[];
};

const columns = style({
  // React prop name and CSS property
  prop: 'columns',
  // CSS property (if different from prop argument)
  cssProperty: 'gridTemplateColumns',
  // key for theme values
  key: 'columns',
  // accessor function for transforming the value
  transformValue: (n) => `repeat(${n}, 1fr)`,
  // add a fallback scale object or array, if theme is not present
  scale: [ 1, 2, 4, 6, 8, 10, 12 ],
  // Optional prop alias
  alias: 'gc',
});

const rows = style({
  // React prop name and CSS property
  prop: 'rows',
  // CSS property (if different from prop argument)
  cssProperty: 'gridAutoRows',
  // key for theme values
  key: 'rows',
  // accessor function for transforming the value
  transformValue: (n) => `max-content`,
  // add a fallback scale object or array, if theme is not present
  scale: [ '100%' ],
  // Optional prop alias
  alias: 'gr',
});

const Wrapper = styled.div<IGridProps>`
  display: grid;

  ${gridGap};
  ${gridTemplateColumns};

  ${columns};
  ${rows};
`;

Wrapper.defaultProps = {
  gridGap: 2,
};

export default Wrapper;
