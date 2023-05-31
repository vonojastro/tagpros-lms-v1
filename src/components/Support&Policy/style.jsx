import styled from 'styled-components';
import OverflowSection from 'components/Page/OverflowSection';
import Section from 'components/Page/Section';

export const FirstOverflowSection = styled(OverflowSection)`
  background-size: cover !important;
  background-position: 50% !important;
  background-image: linear-gradient(#1f90e0, rgba(123, 151, 170, 0.705)),
    url(/static/media/teacher.11d79af4.png) !important;
  > * {
    color: white !important;
  }

  .single-page {
    padding: 40px 0;

    h1 {
      font-size: 35px;
    }
  }

  @media .search-page {
    padding: 140px 0 0 0 !important;
  }
`;

export const FirstSection = styled(Section)`
  display: grid;
  grid-template-rows: auto auto;
  align-items: center;
  gap: 1rem;
  padding: 50px 0;
  margin: 0 auto !important;

  h1 {
    margin: 0;
    color: white !important;
    font-size: 28px;
  }

  div {
    position: relative;

    svg {
      position: absolute;
      top: 25%;
      left: 5%;
      height: 1.5rem;
      width: 1.5rem;
    }

    input {
      outline: none;
      border: none;
      padding-left: 50px;
      font-size: 18px;
      height: 49px;
      width: 100%;
      border-radius: 5px;
    }
  }

  @media (min-width: 480px) {
    padding: 60px 0;

    h1 {
      font-size: 32px;
    }

    svg {
      left: 3% !important;
    }
  }

  @media (min-width: 600px) {
    gap: 1.5rem;
    padding: 80px 0;

    h1 {
      font-size: 36px;
    }

    input {
      font-size: 22px !important;
      height: 52px !important;
    }

    svg {
      left: 2% !important;
      height: 1.75rem !important;
      width: 1.75rem !important;
    }
  }

  @media (min-width: 801px) {
    gap: 2rem;
    padding: 100px 0px;

    input {
      font-size: 24px !important;
      width: 700px !important;
      height: 59px !important;
      padding-left: 60px !important;
    }

    svg {
      left: 2% !important;
      height: 2rem !important;
      width: 2rem !important;
    }
  }

  @media (min-width: 1281px) {
    padding: 100px 80px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 450px);

  aside {
    flex: 1;
    padding: 25px 0;
    border-right: 1px solid #b3b3b3;

    ul {
      padding: 0 !important;

      .children-ul {
        list-style: none;

        .active {
          background-color: #e1f0ff !important;

          a {
            color: #1976d2;
          }
        }

        svg {
          margin-right: 10px;
        }

        li,
        a {
          font-size: 14px;
          padding-left: 40px;
        }
      }

      & > li {
        padding: 16px 48px;
        font-weight: 500;
        font-size: 16px;
        pointer-events: all;
        transition: all 0.3s ease in;

        a {
          color: #1976d2;
          font-size: 16px;
        }

        &.active {
          background-color: #1976d2;
          li {
            background-color: white;
          }

          a {
            color: white;
          }
        }

        &:hover:not(.active) {
          background-color: #ececec;
        }
      }
    }
  }

  main {
    flex: 3;
    padding: 50px 10px;
  }

  //  padding: 50px 130px;

  @media (min-width: 600px) {
    ul {
      & > li {
        padding: 16px 44px !important;
      }
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;

    aside {
      flex: 1.5;

      .children-ul {
        a {
          padding-left: 20px !important;
        }
      }

      ul {
        & > li {
          padding: 16px 20px !important;
        }
      }
    }

      main {
        padding: 50px 40px;
      }
    }

    @media (min-width: 1281px) {
      aside {
        flex: 1 !important;
      }
      main {
        padding: 50px 130px;
      }
    }
  }
`;

export const Wrapper2 = styled.div`
  h1 {
    font-weight: 700;
    font-size: 30px;
    color: #000;
    text-align: center;

    span {
      font-weight: 500;
    }
  }

  div.container {
    margin-top: 50px;
    margin-left: 0;
    padding: 0;
  }

  div {
    padding: 0 !important;
    margin-top: 20px;

    svg {
      margin-right: 10px;
    }

    a {
      font-size: 14px;
      text-decoration: underline;
      color: #1976d2;
      font-weight: 400;
    }
  }

  @media (min-width: 600px) {
    h1 {
      font-size: 34px !important;
    }

    div {
      svg {
        margin-right: 30px;
      }
    }
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 36px !important;
      text-align: start;
    }
    div.container {
      margin-top: 70px !important;
    }
    div {
      margin-top: 40px;

      a {
        font-size: 18px !important;
      }
    }
  }

  @media (min-width: 1281px) {
    div {
      svg {
        margin-right: 50px;
      }
    }
  }
`;

export const Container = styled.div`
  padding: 50px 0;

  img {
    width: 100%;

    @media (min-width: 801px) {
      width: unset;
    }
  }

  h3 {
    font-weight: 600;
    font-size: 22px;
  }

  p,
  li {
    font-size: 18px;
  }

  b {
    font-weight: 600;
  }

  table {
    width: 100%;
    text-align: center;
    border: 1px solid #000;

    tr,
    td {
      border: 1px solid #000;
      font-size: 18px;
      padding: 10px;
    }

    td {
      width: 50%;
    }
  }

  .indent {
    padding-left: 30px;
  }
`;

export const SearchDiv = styled.div`
  padding: 30px 0;

  form {
    position: relative;
    display: flex;
    gap: 5px;
    margin-bottom: 50px;
  }

  form > svg {
    position: absolute;
    left: 3%;
    top: 30%;
    width: 16px;
    height: 16px;
  }

  form > input {
    border-radius: 5px;
  }

  form > input[type='text'] {
    width: 70%;
    height: 40px;
    padding-left: 30px;
    font-size: 14px;
  }

  form > input[type='submit'] {
    background-color: #1976d2;
    border: none;
    outline: none;
    color: #fff;
    height: 40px;
    font-size: 14px;
    width: 30%;
  }

  @media (min-width: 768px) {
    form > input[type='text'] {
      width: 700px;
    }
    form > svg {
      left: 1.5%;
    }
  }

  @media (min-width: 801px) {
    form > input[type='submit'] {
      width: 150px;
    }
  }

  @media (min-width: 1030px) {
    form > svg {
      top: 35%;
    }
    form > input[type='text'] {
      height: 50px;
      font-size: 16px;
      padding-left: 35px;
    }
    form > input[type='submit'] {
      height: 50px;
      font-size: 18px;
    }
  }
`;
