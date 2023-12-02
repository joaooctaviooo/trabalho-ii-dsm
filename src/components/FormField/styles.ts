import styled from "styled-components/native";

export const FormField = styled.View<{ width?: string }>`
  width: ${({ width }) => (width ? width : "100%")};
  margin-bottom: 24px;
`;

export const FormFieldLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;

  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.text};
`;
