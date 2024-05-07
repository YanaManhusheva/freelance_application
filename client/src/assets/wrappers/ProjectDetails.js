import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  row-gap: 2rem;
  .details-section {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    padding: 20px;
    align-items: center;
    font-size: 0.9rem;
  }

  .details-content {
    padding: 20px;
    margin: 20px auto;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    align-items: center;
    column-gap: 0.5rem;
    row-gap: 1rem;
    text-align: center;
    font-size: 1rem;
  }
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      color: var(--text-secondary-color);
      letter-spacing: var(--letter-spacing);
    }
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
  .status {
    border-radius: var(--border-radius);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    margin: 0 auto;

    width: 100%;
    display: grid;
    place-items: center;
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
  .payslips {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .tasks {
    display: grid;
    row-gap: 2rem;
  }
  .add-btn {
    font-size: 0.9rem;
  }
  .actions {
    display: flex;
    gap: 0.7rem;
  }
  @media (min-width: 1120px) {
    .payslips {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }
    .btn {
      /* width: 11rem; */
      text-align: center;
      font-size: 1.1rem;
    }
    .section-text {
      font-size: 1.7rem;
    }
  }
`;

export default Wrapper;
