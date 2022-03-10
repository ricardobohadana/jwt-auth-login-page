import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { API_URL } from "../../../pages/_app";
import { deleteCookie, checkCookie } from "../../Helpers/cookies";
interface UserMenuProps {
  username: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}

const userMenuData = [
  {
    primaryText: "Adicionar usuários",
    secondaryText: "Criação de novos usuários",
    svg: [
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    ],
  },
  {
    primaryText: "Configurações de conta",
    secondaryText: "Alteração de usuário ou senha",
    svg: [
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
      "M15 12a3 3 0 11-6 0 3 3 0 016 0z",
    ],
  },
  {
    primaryText: "Excluir Conta",
    secondaryText: "Deletar conta e sair",
    svg: [
      "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    ],
  },
];
export const UserMenu = (props: UserMenuProps) => {
  const router = useRouter();
  const signOutUser = () => {
    // caso não tenha os dois tokens nos cookies
    if (!checkCookie("refreshToken") || !checkCookie("accessToken")) {
      router.push("/");
      return;
    }

    // falta o axios de logout
    axios
      .get(API_URL + "/logout", {
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
          Authentication: `Refresh ${props.refreshToken}`,
        },
      })
      .then((resp) => {
        deleteCookie("username");
        deleteCookie("password");
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        return resp;
      })
      .then((resp) => resp.status === 200 && router.push("/"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="my-10">
      <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="text-center p-6  border-b max-w-xs">
          <img
            className="h-24 w-24 rounded-full mx-auto"
            src="/avatar.svg"
            alt="Randy Robertson"
          />
          <p className="pt-2 text-lg font-semibold">{props.username}</p>
          <p
            className="text-xs text-gray-600 mt-2"
            style={{ wordWrap: "break-word" }}
          >
            {props.password}
          </p>
          <div className="mt-5">
            <button
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-700"
              onClick={(e) => signOutUser()}
            >
              Encerrar sessão
            </button>
          </div>
        </div>
        <div className="border-b">
          {userMenuData.map((data, key) => {
            return (
              <a
                href="#"
                className="px-4 py-2 hover:bg-gray-100 flex"
                key={key}
              >
                <div className="text-gray-800">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    {data.svg.map((d, innerKey) => {
                      return <path key={innerKey} d={d} />;
                    })}
                  </svg>
                </div>
                <div className="pl-3">
                  <p className="text-sm font-medium text-gray-800 leading-none">
                    {data.primaryText}
                  </p>
                  <p className="text-xs text-gray-500">{data.secondaryText}</p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="">
          <a href="#" className="px-4 py-2 pb-4 hover:bg-gray-100 flex">
            <div className="max-w-sm">
              <p className="text-sm font-medium text-gray-800 leading-none">
                Token de Acesso
              </p>
              <p
                className="text-xs text-gray-500 max-w-xs"
                style={{ wordWrap: "break-word" }}
              >
                {props.accessToken}
              </p>
            </div>
          </a>
          <a href="#" className="px-4 py-2 pb-4 hover:bg-gray-100 flex">
            <div className="max-w-sm">
              <p className="text-sm font-medium text-gray-800 leading-none">
                Token de Atualização
              </p>
              <p
                className="text-xs text-gray-500 max-w-xs"
                style={{ wordWrap: "break-word" }}
              >
                {props.refreshToken}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
