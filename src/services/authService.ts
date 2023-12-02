import { UserModel } from "../models";

type LoginInput = {
  email: string;
  password: string;
};

export async function login(data: LoginInput): Promise<UserModel> {
  const { email, password } = data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "joao@email.com" && password === "joao1234") {
        return resolve({ email, name: "João Otávio" });
      }

      return reject(new Error("Crendenciais inválidas"));
    }, 500);
  });
}
