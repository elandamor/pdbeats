import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
// Styles
import Wrapper from './styles';

// tslint:disable-next-line:interface-over-type-literal
type Link = {
  className?: string,
  exact?: boolean,
  href: string,
  icon?: any,
  label: string,
};

interface IProps {
  className?: string;
  hideLabels?: boolean;
  links: Link[];
}

/**
 * @render react
 * @name Navigation component
 * @description Main navigation for an app.
 * @example
 * <Navigation
 *    links={[
 *      { exact: true, label: 'Home', href: '/' },
 *      { label: 'About', href: '/about' }
 *      { label: 'Contact', href: '/contact' },
 *    ]}
 * />
 */

const Navigation: FC<IProps> = ({ className, hideLabels, links }) => (
  <Wrapper className={classNames('c-nav', className)}>
    <ul>
      {
        links.map((link: Link, index: number) => (
          <li key={index}>
            <NavLink
              exact={link.exact}
              activeClassName="-active"
              className={classNames('a-nav-item', link.className)}
              to={link.href}
            >
              {
                link.icon && (
                  <span className="c-icon">
                    {link.icon}
                  </span>
                )
              }
              {
                !hideLabels && (
                  <span className="a-label">
                    {link.label}
                  </span>
                )
              }
            </NavLink>
          </li>
        ))
      }
    </ul>
  </Wrapper>
);

export default Navigation;
