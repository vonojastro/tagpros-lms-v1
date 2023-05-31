import { getAllEmailThreadsByUser } from 'api/emailMessaging';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Outlet, useMatch, useNavigate, useParams, useLocation } from 'react-router';
import {
  setActiveDraft,
  toggleEmailComposer,
  toggleSidebar
} from 'redux/actions/mailView';
import styled, { ThemeContext } from 'styled-components';

import Content from './Content';
import ContentHeader from './Content/ContentHeader';
import MainContent from './Content/ContentHeader/MainContent';
import EmailComposer from './EmailComposer';
import { fields } from './EmailComposer/fields';
import {
  Message as EmailContentViewMessage,
  Subject as EmailContentViewSubject
} from './EmailContentView';
import IconButton from './IconButton';
import ModalOverlay from './ModalOverlay';
import Sidebar from './Sidebar';
import SidebarButton from './Sidebar/SidebarButton';
import SidebarExpandButton from './Sidebar/SidebarExpandButton';
import WriteMailActionButton from './Sidebar/WriteMailActionButton';
import Topbar from './Topbar';
import SearchInput from './Topbar/SearchInput';
import TopbarLeft from './Topbar/TopbarLeft';

const SearchInputContainer = styled.div``;
const MobileSearchInputContainer = styled.div``;
const RefreshIconButtonContainer = styled.div``;
const BarIconButtonContainer = styled.div``;
const MobileLogoContainer = styled.div`
  height: 2rem;
  margin: 1rem;
`;
const WriteMailActionButtonContainer = styled.div``;
const SidebarButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Logo = styled.div`
  background-image: url(${props => props.theme.custom.logoSrc});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const Container = styled.div`
  .btn:focus,
  .btn:active {
    outline: none !important;
  }

  transition-timing-function: ease-in-out;
  transition-property: grid-template-columns;
  transition-duration: 100ms;
  -webkit-transition-duration: 100ms;
  display: grid;

  grid-template-columns: 0 1fr;

  grid-template-rows: auto 1fr;
  grid-template-areas:
    'topbar topbar'
    'sidebar content';
  gap: ${props => props.theme.custom.mainGap};
  color: black;
  align-items: flex-start;
  height: 100vh;
  position: relative;

  & ${RefreshIconButtonContainer} {
    display: none;
  }
  & ${WriteMailActionButtonContainer} {
    display: none;
  }
  & ${Topbar} {
    display: none;
  }
  & ${SidebarButtonsContainer} {
    display: ${props => (props.isSidebarExpanded ? 'grid' : 'none')};
  }

  @media (min-width: ${props => props.theme.custom.laptopMinWidth}) {
    grid-template-columns: ${props =>
        !props.isSidebarExpanded
          ? props.theme.custom.sidebarWidthCollapsed
          : props.theme.custom.sidebarWidth} 1fr;
    & ${Sidebar} {
      grid-area: sidebar;
      position: static;
      width: auto;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    & ${WriteMailActionButtonContainer} {
      display: block;
    }
    & ${SidebarButtonsContainer} {
      display: grid;
    }
    & ${Topbar} {
      display: grid;
    }
    & ${MobileLogoContainer} {
      display: none;
    }
    & ${RefreshIconButtonContainer} {
      display: block;
    }
    & ${BarIconButtonContainer} {
      display: none;
    }
    & ${MobileSearchInputContainer} {
      display: none;
    }
    & ${SearchInputContainer} {
      max-width: ${props => props.theme.custom.searchInputMaxWidth};
    }
    & ${EmailContentViewMessage} {
      padding-left: 4rem;
    }
    & ${EmailContentViewSubject} {
      padding-left: 4rem;
    }
    & ${ModalOverlay} {
      background: red;
      display: none;
    }
  }
`;

const Statusbar = styled.div`
  background: black;
  align-items: center;
  color: white;
  font-size: 15px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto auto;
  gap: 10px;
  width: 100%;
  flex-grow: 0;
`;

const ContainerBottomRight = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 100;
  width: 600px;
  height: 700px;
  background: white;
  transition: opacity 500ms;
  opacity: ${({ show }) => (show ? 1 : 0)};
  pointer-events: ${({ show }) => (show ? 'all' : 'none')};
  & ${Statusbar} {
    padding: 0 20px;
  }
  & form {
    padding: 10px 20px;
  }
`;

const WriteMailActionButtonMobileContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 50;
`;
// todo Store UI states in Redux
// todo Next, Previous page buttons
function MailView() {
  const isSidebarExpanded = useSelector(state => state.mailView.isSidebarExpanded);
  const params = useParams();
  const type = params.type;

  const showEmailComposer = useSelector(state => state.mailView.showEmailComposer);
  const activeDraft = useSelector(state => state.mailView.activeDraft);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickComposeMail = () => dispatch(toggleEmailComposer());
  const handleMobileClickComposeMail = () => navigate('writer');
  const handleClickToggleCollapseSidebar = () => dispatch(toggleSidebar());
  const handleClickRefreshButton = () => {
    getAllEmailThreadsByUser(dispatch);
  };
  const handleClickBackButton = () => navigate('/mail');
  const handleClickCloseWindow = () => dispatch(toggleEmailComposer());
  const atWriterPath = useMatch('/mail/writer');

  const themeContext = useContext(ThemeContext);
  const isDesktopOrLaptop = useMediaQuery({
    query: `(min-width: ${themeContext.custom.laptopMinWidth})`
  });
  const sidebarButtons = [
    {
      icon: <i className='fas fa-inbox' />,
      label: <div>Inbox</div>,
      path: ''
    },
    {
      icon: <i className='fas fa-file' />,
      label: <div>Drafts</div>,
      path: 'drafts'
    },
    {
      icon: <i className='fas fa-home' />,
      label: <div>Home</div>,
      path: '/'
    }
  ];
  const showMobileWriteMailActionButton = !atWriterPath;

  const handleSendNewEmailSuccess = () => {
    handleClickComposeMail();
  };

  const gotoDashboard = () => navigate('/');
  const location = useLocation();
  const { draft } = location.state || {};

  useEffect(() => {
    if (draft) {
      dispatch(setActiveDraft(draft));
      dispatch(toggleEmailComposer(true));
      if (!isDesktopOrLaptop) navigate('/mail/writer');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft?.blocks?.length]);

  return (
    <Container isSidebarExpanded={isSidebarExpanded}>
      {!isDesktopOrLaptop && (
        <ModalOverlay
          show={isSidebarExpanded}
          onClick={handleClickToggleCollapseSidebar}
        />
      )}
      {(isDesktopOrLaptop && (
        <ContainerBottomRight className='shadow-lg' show={showEmailComposer}>
          <Statusbar>
            <div>New Message</div>
            <IconButton
              fa='fas fa-times'
              background='transparent'
              color='white'
              onClick={handleClickCloseWindow}
            />
          </Statusbar>
          <div style={{ flexGrow: 1 }}>
            <EmailComposer
              show={showEmailComposer}
              initialValues={
                activeDraft
                  ? activeDraft
                  : {
                      [fields.mailSubject.name]: '',
                      [fields.mailReceiver.name]: [],
                      [fields.carbonCopy.name]: [],
                      [fields.blindCarbonCopy.name]: [],
                      [fields.mailAttachments.name]: []
                    }
              }
              handleSuccess={handleSendNewEmailSuccess}
            />
          </div>
        </ContainerBottomRight>
      )) ||
        (showMobileWriteMailActionButton && (
          <WriteMailActionButtonMobileContainer>
            <WriteMailActionButton
              onClick={handleMobileClickComposeMail}
              isMobile={false}
            />
          </WriteMailActionButtonMobileContainer>
        ))}

      <Topbar>
        <TopbarLeft>
          <SidebarExpandButton
            className='btn waves-effect waves-circle form-material'
            onClick={handleClickToggleCollapseSidebar}
          >
            <i className='fas fa-bars' />
          </SidebarExpandButton>
          <Logo onClick={gotoDashboard} />
        </TopbarLeft>
        <SearchInputContainer>
          <SearchInput
            left={ !isDesktopOrLaptop &&
              <IconButton
                fa='fas fa-bars'
                background='transparent'
                color='black'
                onClick={handleClickToggleCollapseSidebar}
              />
            }
          />
        </SearchInputContainer>
      </Topbar>
      <Sidebar expanded={isSidebarExpanded}>
        <MobileLogoContainer>
          <Logo onClick={gotoDashboard} style={{ backgroundPosition: 'left' }} />
        </MobileLogoContainer>
        <WriteMailActionButtonContainer>
          <WriteMailActionButton
            onClick={handleClickComposeMail}
            isMobile={!isSidebarExpanded}
          />
        </WriteMailActionButtonContainer>
        <SidebarButtonsContainer>
          {sidebarButtons.map(({ path, label, icon }) => (
            <SidebarButton key={path} isSidebarExpanded={isSidebarExpanded} to={path}>
              {icon}
              {label}
            </SidebarButton>
          ))}
        </SidebarButtonsContainer>
      </Sidebar>
      <Content>
        <ContentHeader>
          {type ? (
            <IconButton
              fa='fas fa-arrow-left'
              background='transparent'
              color='black'
              onClick={handleClickBackButton}
            />
          ) : (
            <div>
              <RefreshIconButtonContainer>
                <IconButton
                  fa='fas fa-redo-alt'
                  background='transparent'
                  color='black'
                  onClick={handleClickRefreshButton}
                />
              </RefreshIconButtonContainer>
            </div>
          )}

          <MobileSearchInputContainer>
            <SearchInput
              left={
                <IconButton
                  fa='fas fa-bars'
                  background='transparent'
                  color='black'
                  onClick={handleClickToggleCollapseSidebar}
                />
              }
            />
          </MobileSearchInputContainer>
        </ContentHeader>
        <MainContent>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'auto',
              paddingTop: 20
            }}
          >
            <Outlet />
          </div>
        </MainContent>
      </Content>
    </Container>
  );
}
MailView.propTypes = {
  handleSearchInputChange: PropTypes.func.isRequired
};
export default MailView;