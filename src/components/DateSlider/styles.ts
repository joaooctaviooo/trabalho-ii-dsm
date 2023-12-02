import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  background: ${({ theme }) => theme.colors.light};

  border-radius: 4px;
  padding: 8px 12px;

  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};

  text-transform: capitalize;
`;
