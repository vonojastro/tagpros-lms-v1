import Footer from 'components/Footer';
import NavBarNew from 'components/NavBarNew';
import SubscribeToYoutubeBanner from 'components/SubscribeToYoutubeBanner';
import { Fragment } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-inline: auto;
  color: black !important;
  ${({ addPadding, transparentOnTop }) => addPadding && `
      > :first-child {
        padding-top: 100px !important;
        @media (min-width: 1025px) {
          padding-top: ${transparentOnTop ? '120px':'200px'} !important;
          padding-bottom: 100px !important;
        }
      }
  `}
  ${({ isNew }) => isNew ? `
      > * {
        width: min(90%, 1200px) !important;
        color: black !important;
      }
  `:
  `
      width: min(90%, 1200px);
  `
  };
`;

const Page = ({
  className,
  children,
  withNavBar,
  withFooter,
  withSubscribeToYoutubeBanner,
  isNew = false, // !TODO Migrate all "Page"s to use this prop
  navBarProps = {},
  hasNavBar // NavBar was already implemented outside this component (such as in OverflowSection)
}) => {
  const addPadding = withNavBar || hasNavBar;
  return (
    <Fragment>
      {withNavBar && <NavBarNew className='mb-4' {...navBarProps} />}
      <Wrapper transparentOnTop={navBarProps.transparentOnTop} className={className} isNew={isNew} addPadding = { addPadding }>{children}</Wrapper>
      {withSubscribeToYoutubeBanner && <SubscribeToYoutubeBanner />}
      {withFooter && <Footer />}
    </Fragment>
  );
};
export default Page;
