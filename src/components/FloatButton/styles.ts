import { Dimensions } from "react-native";
import styled from "styled-components/native";

const MAXIMUM_BUTTON_SIZE = Dimensions.get("window").height * 0.1;

export const Button = styled.TouchableOpacity`
  position: absolute;
  bottom: 10%;
  right: 6%;

  border-radius: ${MAXIMUM_BUTTON_SIZE}px;
  elevation: 2;

  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
`;
