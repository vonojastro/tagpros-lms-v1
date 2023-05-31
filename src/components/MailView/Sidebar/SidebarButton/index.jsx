import { colord } from 'colord';
import React from 'react';
import { useMatch, useResolvedPath } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  margin: 0 1.4rem;
  padding: 0.5rem 0;
  display: grid;
  grid: 1fr / auto-flow auto 1fr;
  align-items: center;
  border-radius: 0.25rem;
  color: ${props => props.active && props.theme.colors.primary};
  background-color: ${props =>
    props.isActive &&
    colord(props.theme.colors.primary)
      .lighten(0.4)
      .toHex()};
  /* font-weight: ${props => props.isActive && 'bold'}; */
  *:first-child {
    margin: 0 1rem;
    width:1rem;
  }
  *:nth-child(2) {
    display: ${props => !props.isSidebarExpanded && 'none'};
  }
  @media (min-width: ${props => props.theme.custom.laptopMinWidth}) {
    margin: 0 1.4rem;
  }
`;
const SidebarButton = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <StyledLink isActive={match} to={to} {...props}>
      {children}
    </StyledLink>
  );
};


export default SidebarButton