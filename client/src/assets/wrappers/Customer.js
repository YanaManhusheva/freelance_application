import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  min-height: 2rem;

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  h5,
  p {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    font-size: 1.4rem;
  }

  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .customer-projects {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    h5,
    p {
      font-size: 1rem;
    }
    p {
      font-weight: 600;
    }
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .delete-btn,
  .details-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .details-btn,
  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
