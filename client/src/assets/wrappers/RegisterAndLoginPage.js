import styled from "styled-components";

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
    width: 50px;
  }
  .form {
    max-width: 500px;
  }
  .form-input {
    border-radius: 0px;
    border: 1px solid var(--form-input-color-border);
  }
  h4 {
    text-align: center;
    font-weight: 700;
    font-size: 1.9rem;
    margin-bottom: 1.38rem;
    color: var(--h4-text-color);
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn-container {
    text-align: center;
  }
  .btn {
    margin: 1.3rem 0;
    font-family: inherit;
  }
  .btn-block {
    width: 10rem;
    padding: 0.6rem 1.1rem;
    text-transform: uppercase;
    font-weight: 700;
  }
  .action-container {
    text-align: center;
  }
  .member-btn {
    display: inline-block;
    color: var(--primary-500);
    font-weight: 600;
    margin-top: 0.4rem;
    text-align: center;
  }
`;
export default Wrapper;
