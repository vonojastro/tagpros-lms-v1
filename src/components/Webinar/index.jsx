import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

import { getActiveWebinars } from 'api/webinar';

import React, { Fragment } from 'react';
import 'css/new-age.scoped.css';
import useFreshdeskHelpWidget from 'hooks/use-freshdesk-help-widget';
import moment from 'moment';

// import './index.css';
import Page from 'components/Page';
import { Chat, FirstSection, HighlightWebinar, IFrame } from './styles';
import { AvailableClasses } from 'components/Landing';
import Section from 'components/Page/Section';
import ReactLinkify from 'react-linkify';

export default function Webinar() {
  useFreshdeskHelpWidget();
  const dispatch = useDispatch();

  const webinars = useSelector(state =>
    state.webinar ? state.webinar.getIn(['data', 'webinar']) : []
  );
  const webinar = webinars[0];
  React.useEffect(() => {
    getActiveWebinars(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getYoutubeParam = link => {
    var url = new URL(link);
    var v = url.searchParams.get('v');

    return v;
  };

  const renderChat = () => {
    if (webinar)
      return (
        <Chat>
          <IFrame
            title='youtube-chat'
            src={
              'https://www.youtube.com/live_chat?v=' +
              getYoutubeParam(webinar.youtubeLink) +
              '&embed_domain=' +
              window.location.hostname
            }
            ratio='1:2'
          />
        </Chat>
      );
  };
  const renderPreviousWebinars = () => {
    if(webinar)
    return (

<Fragment>
        <h3 className='mb-4'>Previous Webinars</h3>
      <AvailableClasses>
        {webinars.slice(1, 4).map(({ youtubeLink, title }) => (
          <a
            target='_blank'
            rel='noreferrer'
            href={youtubeLink}
            className='shadow-sm text-dark'
            key={youtubeLink}
          >
            <div>
              <img
                src={
                  'http://i3.ytimg.com/vi/' +
                  getYoutubeParam(youtubeLink) +
                  '/hqdefault.jpg'
                }
                alt={title}
              />
            </div>
            <div>
              <h5>{title}</h5>
            </div>
          </a>
        ))}
      </AvailableClasses>
</Fragment>
    );
  };
  function renderHighlightWebinar() {
    if (webinar)
      return (
        <HighlightWebinar>
          <IFrame
            title='youtube'
            src={
              'https:www.youtube.com/embed/' +
              getYoutubeParam(webinar.youtubeLink) +
              '?rel=0'
            }
            allowFullScreen
          />

          <h5>{webinar.title}</h5>
          <p>
            <i>{moment(webinar.startDate).format('MMM DD, YYYY hh:mm a')}</i>
          </p>
          <p>
            <ReactLinkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a target='blank' href={decoratedHref} key={key}>
                  {decoratedText}
                </a>
              )}
            >
              {webinar.description}
            </ReactLinkify>
          </p>
        </HighlightWebinar>
      );
  }
  return (
    <Page withNavBar withFooter withSubscribeToYoutubeBanner className="min-vh-100">
      <FirstSection className='pt-0'>
        {renderHighlightWebinar()}
        {renderChat()}
      </FirstSection>
      <Section>
        {renderPreviousWebinars()}
      </Section>
    </Page>
  );
}
