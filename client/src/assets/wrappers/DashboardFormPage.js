import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
    font-weight: 500;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .color-input {
    width: 30%;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .customer-title {
    margin-top: 2rem;
  }

  #new-customer-check,
  #new-tag-check {
    margin-right: 0.5rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .customers-select,
    .form-check {
      grid-column: span 2;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .customer-form,
    .tag-form {
      grid-template-columns: 1fr 1fr;
    }
    .customers-select,
    .form-check {
      grid-column: span 2;
    }
  }
`;

export default Wrapper;
