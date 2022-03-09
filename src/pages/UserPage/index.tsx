import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../../components/Spinners";
import { UserMenu } from "../../components/UserMenu";
import { UserLists } from "../../components/UsersList";

interface IUsers {
  id: string;
  username: string;
  password: string;
}

export const UserPage = () => {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    const Username = localStorage.getItem("username");
    const Password = localStorage.getItem("password");
    const AccessToken = localStorage.getItem("accessToken");
    const RefreshToken = localStorage.getItem("refreshToken");
    setUsername(Username);
    setPassword(Password);
    setAccessToken(AccessToken);
    setRefreshToken(RefreshToken);

    // axios.get()
  }, []);

  return (
    <div className="flex max-w-screen-lg mx-auto">
      <UserMenu
        username={username}
        encryptedPassword={password}
        accesstoken={accessToken}
        refreshToken={refreshToken}
      />
      <div className="max-w-screen-lg items-center m-auto h-screen mt-10">
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
                  <UserLists />
                  {/* <LoadingSpinner /> */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
