import styled from 'styled-components';

export const Wrapper = styled.section`
  .login-box > .card-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    height: 100% !important;
    grid-template-rows: 1fr min-content;
    justify-content: center;
    align-items: center;
    > form:first-child {
      grid-column: -1 / 1;
      grid-row: 1 / -1;
    }
    .sign-up-info {
      grid-column: -1 / 1;
      display: ${props => props.isAdmin && 'none'};
    }
    .children-photo {
      grid-row: 1/4;
      display: none;
    }
    ${props =>
      !props.isAdmin &&
      `
	@media(min-width: 1280px) {
		> form:first-child, .sign-up-info {
			grid-column: 1 / 2;
		}
		.children-photo {
			display: block;
		}
	}
    `}
  }
  /* > .card-body:first-child > div > div {
      height: 100% !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
    } */
`;
