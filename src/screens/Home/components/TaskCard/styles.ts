import styled from "styled-components/native";

export const Card = styled.View`
  flex-direction: row;
  background: ${({ theme }) => theme.colors.light};

  border-radius: 4px;

  padding-right: 12px;
  margin-bottom: 12px;
`;

export const CardMarker = styled.View<{ color: string }>`
  height: 100%;
  width: 3px;
  background: ${({ color }) => color};
`;

export const CardContent = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  margin: 10px 8px;
  padding-right: 8px;
`;

export const CardInfo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};

  margin-left: 10px;
  width: 80%;


  line-height: 20px;
`;
