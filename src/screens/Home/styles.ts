import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const ContentContainer = styled.View`
  width: 100%;
  padding: 18px 12px;
`;

export const TaskCounters = styled.View`
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  width: 100%;
  
  justify-content: center;
  align-items: center;
`;