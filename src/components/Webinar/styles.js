import Section from 'components/Page/Section';
import styled from 'styled-components';
import ResponsiveEmbed from 'react-responsive-embed';
export const Chat = styled.div`
  display: grid;
`;
export const HighlightWebinar = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-rows: 1fr auto auto auto;
  > * {
    /* These are technically the same, but use both */
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;
    /* This is the dangerous one in WebKit, as it breaks things wherever */
    word-break: break-all;
    /* Instead use this non-standard one: */
    word-break: break-word;

    /* Adds a hyphen where the word breaks, if supported (No Blink) */
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;
    white-space: pre-line;
  }
`;
export const IFrame = styled(ResponsiveEmbed)``;
export const FirstSection = styled(Section)`
  display: grid;
  gap: 1rem;
  ${HighlightWebinar} {
    grid-column: 1 / -1;
  }
  ${Chat} {
    display: none;
  }
  @media (min-width: 1280px) {
    ${HighlightWebinar} {
      grid-column: 1;
    }
    ${Chat} {
      display: block;
    }
  }
  grid-template-columns: 1fr 20rem;
  grid-template-rows: 1fr auto;
`;
