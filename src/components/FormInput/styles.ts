import styled from "styled-components/native";

export const Input = styled.TextInput<{ minHeight?: number }>`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.dark};
  background: ${({ theme }) => theme.colors.light};

  padding: 8px 12px;
  border-radius: 4px;

  line-height: 20px;
  min-height: ${({ minHeight }) => minHeight}px;
`;
