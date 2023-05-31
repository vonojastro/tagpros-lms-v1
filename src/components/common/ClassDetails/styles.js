import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const padding = '1rem';
export const ActionButton = styled(NavLink)`
  /* background-color: ${({ theme }) => theme.primary3};
  outline: none !important;
  border: none !important; */
  border: ${({ theme }) => theme.primary3} 1px solid !important;
  color: ${({ theme }) => theme.primary3} !important;
  :hover,
  :focus,
  :active {
    background-color: ${({ theme }) => theme.primary3};
    color: white !important;
  }
`;
export const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  > * {
    height: 100%;
  }
  .loading-indicator {
    grid-column: 1 / -1;
  }
`;
export const Container = styled(Link)`
  .teacher-thumbnail {
    height: 10rem;
    img {
      object-fit: contain;

    }
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
  align-items: flex-start;
  --newageprimary: var(--dark) !important;
  .title {
    color: ${({ theme: { primary1 } }) => primary1} !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show before ellipsis*/
    line-clamp: 2;         /* number of lines to show before ellipsis*/
    -webkit-box-orient: vertical;
  }
  .price {
    color: ${({ theme: { primary2 } }) => primary2} !important;
    margin-top: auto;
      align-self: flex-end;
  }
  .class-action {
      height: min-content;
      margin-top: auto;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0 !important;
    margin: 0 !important;
  }
  display: grid;
  gap: 1rem;
  grid-template-rows: min-content min-content;
  padding: ${padding};
  :hover {
    background-color: #fafafa;
    box-shadow: 0px 3px 4px #eee;
  }
  .teacher-info {
    display: grid;
    grid-template-columns: 2rem 1fr;
    align-items: center;
    gap: 1rem;
    > div:first-child {
      height: 2rem;
      width: 2rem;
    }
    img:first-child {
      border-radius: 50%;
    }
  }
  .main-info {
    display: grid;
    gap: 0.5rem;
    > * {
      display: grid;
      grid-template-columns: min-content 1fr;
      gap: 1rem;
      align-items: center;
    }
  }
`;
