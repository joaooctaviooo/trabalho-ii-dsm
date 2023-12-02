import styled from "styled-components/native";

export const Button = styled.TouchableOpacity<{
  backgroundColor: string;
  width: string;
}>`
  width: ${({ width }) => width};
  background-color: ${({ backgroundColor }) => backgroundColor};

  justify-content: center;
  align-items: center;

  padding: 12px;
  border-radius: 4px;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.light};
`;
