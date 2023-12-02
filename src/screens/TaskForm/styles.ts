import styled from "styled-components/native";

export const Container = styled.View`
  padding: 18px 12px;
`;

export const FormFooter = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const SelectedDateContainer = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.light};
  border-radius: 4px;

  padding: 12px 12px;
`;

export const SelectedDate = styled.Text`
  font-size: 15px;

  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.light};
  font-weight: 500;

  line-height: 20px;
`;
