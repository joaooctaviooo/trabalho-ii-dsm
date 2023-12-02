import { Dimensions } from "react-native";
import styled from "styled-components/native";

const CONTAINER_SIZE = Dimensions.get("window").width * 0.45;

export const Container = styled.View<{ background: string }>`
  flex-direction: row;
  align-items: center;
  width: ${CONTAINER_SIZE}px;

  border-radius: 6px;
  padding: 12px;

  background: ${({ background }) => background};
`;

export const ContentContainer = styled.View`
  margin-left: 8px;
`;

export const Label = styled.Text<{ color: string }>`
  font-size: 12px;
  font-weight: 500;

  color: ${({ color }) => color};
`;

export const TaskTotal = styled.Text<{ color: string }>`
  font-size: 20px;
  font-weight: 700;

  color: ${({ color }) => color};
`;
