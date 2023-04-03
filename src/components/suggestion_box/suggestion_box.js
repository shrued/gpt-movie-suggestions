import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const Response = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: red;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
