import React, { useState } from "react";
import { useTheme } from "styled-components";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Button, FormField } from "../../components";

import { validateLoginData } from "../../validation/auth";
import { ToastType, useToast } from "../../contexts/Toast/Toast.context";

import * as authService from "../../services/authService";
import { login } from "../../redux/auth/auth-slice";

export const LoginScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);

    try {
      await validateFormData();

      const user = await authService.login({
        email,
        password
      });

      dispatch(login({ user }));
    } catch (error) {
      const parsedError = error as Error;

      showToast({
        type: ToastType.ERROR,
        message: "Erro ao fazer login",
        description: parsedError.message
      });
    }

    setLoading(false);
  }

  async function validateFormData() {
    await validateLoginData({
      email,
      password
    });
  }

  return (
    <S.Container>
      <S.FormContainer>
        <S.Title>Login</S.Title>

        <FormField label="E-mail">
          <S.TextInput
            placeholder="Informe o seu e-mail aqui"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </FormField>

        <FormField label="Senha">
          <S.TextInput
            secureTextEntry
            placeholder="Informe o sua senha aqui"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </FormField>

        <Button
          loading={loading}
          label="Entrar"
          color={theme.colors.primary}
          onPress={handleLogin}
        />
      </S.FormContainer>
    </S.Container>
  );
};
