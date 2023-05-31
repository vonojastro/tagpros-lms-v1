import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';

const SideBarLink = ({ label, to, icon, children, isSuppAndPolicy }) => {
  const pathname = useLocation().pathname;
  const isActive =
    pathname === to || (children && children.find(({ to }) => pathname === to));

  if (isSuppAndPolicy) {
    return (
      <>
        <li className={isActive ? 'active' : ''} style={{ pointerEvents: 'all' }}>
          <Link to={to}>
            {icon}
            {label}
          </Link>
        </li>
        {children && (
          <ul
            className={`collapse ${
              isActive && children.find(c => c.label) ? 'in' : ''
            } children-ul`}
          >
            {children.map(
              item =>
                item.label && (
                  <SideBarLink {...item} key={item.label} isSuppAndPolicy={true} />
                )
            )}
          </ul>
        )}
      </>
    );
  }

  return (
    <li className={isActive ? 'active li' : ''} style={{ pointerEvents: 'all' }}>
      <Link
        to={to}
        className={`label-container ${
          children && children.find(c => c.label) ? 'has-arrow' : ''
        }`}
      >
        <span className='tooltipright'>{label}</span>
        {icon}
        <span className='dashboard-label'>{label}</span>
      </Link>
      {children && (
        <ul
          className={`label-container collapse ${
            isActive && children.find(c => c.label) ? 'in' : ''
          }`}
        >
          {children.map(item => item.label && <SideBarLink {...item} key={item.label} />)}
        </ul>
      )}
    </li>
  );
};
export default SideBarLink;
