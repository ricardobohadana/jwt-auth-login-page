import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_URL } from "../../../pages/_app";
import { UserMenu } from "../../components/UserMenu";
import { UserList } from "../../components/UsersList";
import { checkCookie, getCookie } from "../../Helpers/cookies";
import createHeaderWithTokens from "../../Helpers/createHeaders";

export interface IUsers {
  id: string;
  username: string;
  password: string;
}

export const UserPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<IUsers[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const removeUserFromList = (id: string, listUsername: string) => {
    if (listUsername === username) {
      console.error("Você não pode excluir a própria conta");
      return;
    }
    setUsers((prevState) => prevState.filter((prevItem) => prevItem.id !== id));
    const payload = {
      id: id,
    };
    axios
      .post(API_URL + "/delete", payload, {
        headers: createHeaderWithTokens(accessToken, refreshToken),
      })
      .then((resp) => {
        console.log(resp.status);
        console.log(resp.data);
      })
      .catch((err) => console.error(err.response.data.error));
  };

  useEffect(() => {
    if (!checkCookie("accessToken") || !checkCookie("refreshToken")) {
      // cookies expiraram, redirecionar para login
      router.push("/");
      return;
    }

    const Username = getCookie("username");
    const Password = getCookie("password");
    const AccessToken = getCookie("accessToken");
    const RefreshToken = getCookie("refreshToken");
    setUsername(Username);
    setPassword(Password);
    setAccessToken(AccessToken);
    setRefreshToken(RefreshToken);

    // requisitando os dados do usuário
    axios
      .get(API_URL + "/users", {
        headers: {
          Authorization: "Bearer " + AccessToken,
          Authentication: "Refresh " + RefreshToken,
        },
      })
      .then((resp) => resp.data)
      .then((data) => {
        setUsers(data.data);
      })
      .catch((err) => console.log(err.response.data.error));
  }, []);

  return (
    <div className="flex justify-evenly">
      <UserMenu
        username={username}
        password={password}
        accessToken={accessToken}
        refreshToken={refreshToken}
      />
      <div className="max-w-screen-md mt-10">
        <div className="container flex justify-center mx-auto h-full">
          <div className="flex flex-col">
            <div className="w-full">
              <div className="border-b border-gray-200 shadow">
                <table className="divide-y divide-gray-300 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        ID Único
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Nome de Usuário
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Senha Criptografada
                      </th>
                      <th className="px-6 py-2 text-xs text-gray-500">Edit</th>
                      <th className="px-6 py-2 text-xs text-gray-500">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  {users.length > 0 ? (
                    users.map((user, index) => {
                      return (
                        <UserList
                          parentDeleteSelectedUser={removeUserFromList}
                          key={index}
                          username={user.username}
                          id={user.id}
                          password={user.password}
                        />
                      );
                    })
                  ) : (
                    <div>No users</div>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
