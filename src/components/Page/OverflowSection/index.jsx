import NavBarNew from 'components/NavBarNew';
import { Fragment } from 'react';
import Page from '../index';

const OverflowSection = ({ wrapperProps, children, className, pageProps, navBarProps }) => {
  const wPropsStyle = { ...wrapperProps?.style, width: '100vw' };
  const wProps = {
    style: wPropsStyle,
    ...wrapperProps,
    ...(!!className && { className })
  };
  return (
    <Fragment>
      {pageProps?.withNavBar && <NavBarNew {...navBarProps} />}
      <div {...wProps}>
        <Page
          {...pageProps}
          // Can't just pass withNavBar here from pageProps:
          // since NavBarNew is already rendered above,
          // and navbar position is sticky (so as to always show navbar)
          withNavBar={pageProps?.withNavBar === true ? false : false}
          hasNavBar={pageProps?.withNavBar === true ? true : false}
          navBarProps={navBarProps}
        >
          {children}
        </Page>
      </div>
    </Fragment>
  );
};
export default OverflowSection;
