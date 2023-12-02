import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.View`
  justify-content: center;
  align-items: center;

  width: 80%;
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;

  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 26px;
`;

export const TextInput = styled.TextInput`
  width: 100%;

  border: 1px solid ${({ theme }) => theme.colors.accentText};
  border-radius: 4px;

  padding: 6px 12px;
`;
