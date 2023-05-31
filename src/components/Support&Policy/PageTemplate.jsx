import Page from 'components/Page';
import React, { Fragment } from 'react';
import { Outlet, useLocation } from 'react-router';
import { FirstOverflowSection, FirstSection } from './style';

const PageTemplate = () => {
  const pathname = useLocation().pathname;

  const paths = pathname.split('/');

  const last = paths.length - 1;

  const label = paths[last].split('-').join(' ');

  return (
    <Fragment>
      <FirstOverflowSection pageProps={{ withNavBar: true, isNew: true }}>
        <FirstSection className='single-page'>
          <h1>
            <b style={{ textTransform: 'capitalize' }}>{label}</b>
          </h1>
        </FirstSection>
      </FirstOverflowSection>
      <Page>
        <Outlet />
      </Page>
    </Fragment>
  );
};

export default PageTemplate;
