import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';
import styled from 'styled-components';
const SidebarItems = styled.ul`
  flex-grow: 1;

  display: flex;
  flex-direction: column;

  /* for Firefox */
  min-height: 0;
  overflow-y: scroll;
  padding-bottom: 10px !important;
`;
export default function AdminSidebar() {
  // const userType = useSelector((state) =>
  //   state.auth.accountType
  // );

  const permissions = useSelector(state =>
    state.admin.permissions ? state.admin.permissions : {}
  );

  const sidebarList = [
    {
      name: 'Dashboard',
      to: '/admin',
      icon: 'fa fa-list'
      // role: ['admsa', 'admma', 'admhr', 'admeduc', 'admacctg', 'admmktg', 'admcurator']
    },
    {
      name: 'Teacher Masterlist',
      to: '/admin/teacher-masterlist',
      icon: 'fa fa-address-card'
      // role: ['admsa', 'admma', 'admhr', 'admeduc']
    },
    {
      name: 'Class Masterlist',
      to: '/admin/class-masterlist',
      icon: 'fa fa-book'
      // role: ['admsa', 'admma', 'admeduc', 'admacctg', 'admcurator']
    },
    {
      name: 'Site Contents',
      to: '/admin/site-contents',
      icon: 'fa fa-cogs'
      // role: ['admsa', 'admma', 'admhr', 'admeduc', 'admacctg']
    },
    {
      name: 'Announcements',
      to: '/admin/announcements',
      icon: 'fa fa-bullhorn'
      // role: ['admsa', 'admma', 'admhr', 'admeduc', 'admacctg']
    },
    {
      name: 'Manage Emails',
      to: '/admin/manage-emails',
      icon: 'fa fa-envelope'
      // role: ['admsa']
    },
    {
      name: 'Manage Accounts',
      to: '/admin/manage-accounts',
      icon: 'fa fa-users'
      // role: ['admsa']
    },
    {
      name: 'Manage Admin',
      to: '/admin/manage-adminAccounts',
      icon: 'fa fa-users'
      // role: ['admsa']
    },
    {
      name: 'Payment History',
      to: '/admin/payment-history',
      icon: 'fa fa-credit-card'
      // role: ['admsa', 'admma', 'admacctg']
    },
    // {
    //   name: 'Manage Payouts',
    //   to: "/admin/payouts",
    //   icon: "fa fa-wallet",
    //   role: ['admsa', 'admacctg']
    // },
    {
      name: 'Discounts',
      to: '/admin/discounts',
      icon: 'fas fa-percentage'
      // role: ['admsa', 'admma', 'admacctg', 'admmktg']
    },
    {
      name: 'Pricing',
      to: '/admin/pricing',
      icon: 'fas fa-tags'
      // role: ['admsa', 'admacctg']
    },
    {
      name: 'Webinars',
      to: '/admin/webinars',
      icon: 'fas fa-video'
      // role: ['admsa', 'admeduc']
    },
    {
      name: 'School Leaders',
      to: '/admin/school-leaders',
      icon: 'fas fa-graduation-cap'
      // role: ['admsa', 'admma', 'admhr']
    },
    {
      name: 'Mailbox',
      to: '/admin/mailing',
      icon: 'fa fa-envelope'
      // role: ['admsa', 'admmktg','admeduc', 'admhr', 'admma']
    },
    {
      name: 'Surveillance',
      to: '/admin/surveillance',
      icon: 'fas fa-desktop'
      // role: ['admsa', 'admma']
    },
    {
      name: 'Configuration',
      to: '/admin/config',
      icon: 'fas fa-cogs'
      // role: ['admsa', 'admma']
    }
  ];

  const menuList = sidebarList.filter(menu => {
    return !!permissions[menu.name] && permissions[menu.name] !== 'noaccess';
    // return menu.role.indexOf(userType.toLowerCase()) > -1
  });

  return (
    <SidebarItems id='sidebarnav'>
      <div className='dropdown-divider' />
      <li className='nav-small-cap'>Admin</li>
      {menuList.map((item, key) => (
        <li key={key}>
          <NavLink
          className='label-container'
            activeClassName='active'
            exact='true'
            to={item.to}
            end
            aria-expanded='false'
          >
            <span className='tooltipright'>{item.name}</span>
            <i className={item.icon} />
            <span className='dashboard-label'>{item.name}</span>
          </NavLink>
        </li>
      ))}
    </SidebarItems>
  );
}
