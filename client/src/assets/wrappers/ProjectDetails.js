// import styled from "styled-components";

// const Wrapper = styled.article`
//   background: var(--background-secondary-color);
//   border-radius: var(--border-radius);
//   display: grid;
//   grid-template-rows: 1fr auto;
//   box-shadow: var(--shadow-2);
//   min-height: 20rem;

//   header {
//     padding: 1rem 1.5rem;
//     border-bottom: 1px solid var(--grey-100);
//     display: grid;
//     grid-template-columns: auto 1fr;
//     align-items: center;
//   }
//   .main-icon {
//     width: 60px;
//     height: 60px;
//     display: grid;
//     place-items: center;
//     background: var(--primary-500);
//     border-radius: var(--border-radius);
//     font-size: 1.5rem;
//     font-weight: 700;
//     text-transform: uppercase;
//     color: var(--white);
//     margin-right: 2rem;
//   }
//   .info {
//     h5 {
//       margin-bottom: 0.5rem;
//     }
//     p {
//       margin: 0;
//       text-transform: capitalize;
//       color: var(--text-secondary-color);
//       letter-spacing: var(--letter-spacing);
//     }
//   }

//   .content {
//     padding: 1rem 1.5rem;
//   }
//   .content-center {
//     display: grid;
//     margin-top: 1rem;
//     margin-bottom: 1.5rem;
//     grid-template-columns: 1fr;
//     row-gap: 1rem;

//     align-items: center;
//     @media (min-width: 576px) {
//       grid-template-columns: 0.6fr 1fr;
//       column-gap: 0.2rem;
//     }
//   }

//   .actions {
//     margin-top: 1rem;
//     display: flex;
//     align-items: center;
//   }
//   .edit-btn,
//   .delete-btn,
//   .details-btn {
//     height: 30px;
//     font-size: 0.85rem;
//     display: flex;
//     align-items: center;
//   }
//   .details-btn,
//   .edit-btn {
//     margin-right: 0.5rem;
//   }
// `;

// export default Wrapper;

import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  row-gap: 2rem;
  .details-section {
    background: var(--white);
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
    grid-template-columns: repeat(5, 1fr);
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
    width: 50%;
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
  .add-btn {
    font-size: 0.9rem;
  }

  @media (min-width: 1120px) {
    .payslips {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }
  }
`;

export default Wrapper;
