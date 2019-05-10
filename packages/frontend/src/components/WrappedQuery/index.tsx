import React, { FC } from 'react';
import { Query } from 'react-apollo';
import { DocumentNode } from 'graphql';

import LoadingBar from '../LoadingBar';

interface IWrappedQueryProps {
  children: React.ReactNode;
  fetchPolicy?: string;
  query: DocumentNode;
  variables?: object;
};

export const QueryContext = React.createContext({ data: {} });

/**
 * @render react
 * @name WrappedQuery component
 * @description WrappedQuery component.
 * @example
 * <WrappedQuery />
 */

const WrappedQuery: FC<IWrappedQueryProps> = ({ children, ...rest }) => (
  // @ts-ignore
  <Query {...rest}>
    {({ data, error, loading }) => {
      if (loading) return <LoadingBar loading />;
      if (error) return <span>{`Error!: ${error}`}</span>;

      return (
        <QueryContext.Provider value={data}>
          {
            React.Children.map(children,
              (child: React.ReactChild, index: number) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    ...data, key: `query_data_${index}`
                  });
                }

                return child;
              }
            )
          }
        </QueryContext.Provider>
      )
    }}
  </Query>
);

export default WrappedQuery;
