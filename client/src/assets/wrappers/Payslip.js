import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 0.3fr 1fr;
  box-shadow: var(--shadow-2);
  min-height: 10rem;

  header {
    padding: 1rem;
    font-size: 1.2rem;
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

  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: grid;
    align-items: center;
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
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
  @media (min-width: 1120px) {
    .edit-btn,
    .delete-btn,
    .details-btn {
      font-size: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default Wrapper;
