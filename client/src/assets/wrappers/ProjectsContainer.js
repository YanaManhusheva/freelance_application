import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
    text-align: center;
    font-size: 25px;
  }
  .add-btn {
    display: block;
    margin: 10rem auto;
    min-height: 3rem;
    width: 12rem;
    font-size: 1.1rem;
  }

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .projects {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  @media (min-width: 1120px) {
    .projects {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
export default Wrapper;
