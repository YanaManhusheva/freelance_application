import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  border: 4px solid
    ${({ color }) => color || "var(--background-secondary-color)"};
  display: grid;
  padding: 1rem 2.5rem;
  grid-template-columns: 0.5fr 1.5fr;
  box-shadow: var(--shadow-2);
  min-height: 20rem;
  align-items: center;
  .header {
    font-size: 0.9rem;
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
    margin: 0;
    display: grid;
    align-items: center;
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
    font-size: 1.3rem;
  }
  .details-btn,
  .edit-btn {
    margin-right: 0.5rem;
  }
`;

export default Wrapper;
