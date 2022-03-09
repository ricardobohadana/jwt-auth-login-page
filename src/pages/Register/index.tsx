import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { API_URL } from "../../../pages/_app";
import { LoadingSpinner } from "../../components/Spinners";
import { useRouter } from "next/router";
import { setCookie } from "../../Helpers/cookies";

export const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameException, setUsernameException] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const setError = (data: string) => {
    setUsernameError(data);
    data === "" ? setUsernameException(false) : setUsernameException(true);
  };

  const resetRegisterData = () => {
    setUsername("");
    setPassword("");
  };

  const checkIfEmpty = () => {
    return username && password;
  };

  function signUpUser() {
    setError("");
    if (!checkIfEmpty()) {
      setError("Username or password cannot be empty");
      return;
    }
    setIsLoading(true);
    axios
      .post(API_URL + "/signup", {
        username: username,
        password: password,
      })
      .then((resp) => {
        setIsLoading(false);
        console.log(resp.data);
        return resp.data;
      })
      .then((data) => {
        Object.entries(data).map(([key, value]) => {
          setCookie(key, value as string, 0.01);
        });
        router.push("/users");
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err.response.data.error);
        setError(err.response.data.error);
      });
    resetRegisterData();
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-32 w-auto"
              src="/secure_login.svg"
              alt="Secure Login"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Faça seu cadastro
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou{" "}
              <Link href="/">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Entre aqui!
                </a>
              </Link>
            </p>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-700 tracking-wide">
              Nome de usuário
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="text"
              placeholder="Cadastre seu nome de usuário"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            {usernameException ? (
              <div className="font-medium text-red-600">{usernameError}</div>
            ) : (
              <></>
            )}
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Senha
              </div>
              {/* <div>
                <a
                  className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                        cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div> */}
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              placeholder="Cadastre sua senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="mt-10">
            {isLoading ? (
              <div className="flex justify-center  mr-10">
                <LoadingSpinner />
              </div>
            ) : (
              <button
                disabled={isLoading}
                className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                onClick={(e) => signUpUser()}
              >
                Cadastrar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
