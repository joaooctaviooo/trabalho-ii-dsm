import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail deve ser válido")
    .required("E-mail é obrigatório"),
  password: Yup.string().required("Senha é obrigatória")
});

type ValidateLoginDataInput = {
  email: string;
  password: string;
};

export async function validateLoginData(input: ValidateLoginDataInput) {
  try {
    const { email, password } = input;

    await loginSchema.validate(
      {
        email,
        password
      },
      { abortEarly: false }
    );
  } catch (error) {
    const validationError = error as Yup.ValidationError;
    throw Error(validationError.errors[0]);
  }
}
