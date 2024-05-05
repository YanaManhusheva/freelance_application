import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  row-gap: 2rem;

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  .header {
    font-weight: bold;
    color: var(--primary-color);
    text-transform: uppercase;
  }
  .data {
    padding: 5px 10px;
    border-radius: var(--border-radius);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .section-text {
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .tasks {
    display: grid;
    row-gap: 2rem;
  }
  .add-btn {
    font-size: 0.9rem;
  }

  @media (min-width: 1120px) {
    .btn {
      text-align: center;
      font-size: 1.1rem;
    }
    .section-text {
      font-size: 1.7rem;
    }
  }
`;

export default Wrapper;
