import axios from "axios";
import { useState } from "react";
import { API_URL } from "../../../pages/_app";
import { getCookie } from "../../Helpers/cookies";
import createHeaderWithTokens from "../../Helpers/createHeaders";
import { IUsers } from "../../pages/UserPage";

interface IUserListProps extends IUsers {
  key: number;
  parentDeleteSelectedUser: (id: string) => void;
}

// implementar modal do seguinte link:
// https://flowbite.com/docs/components/modal/

export const UserList = (props: IUserListProps) => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  const deleteSelectedUser = () => {
    props.parentDeleteSelectedUser(props.id);
  };
  const updateSelectedUser = () => {
    return;
    const payload = {};
    axios.post(API_URL + "/update", payload, {
      headers: createHeaderWithTokens(accessToken, refreshToken),
    });
    throw new Error("Function not implemented.");
  };

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-300">
        <tr className="whitespace-nowrap">
          <td className="px-6 py-4 text-sm text-gray-500">{props.id}</td>
          <td className="px-6 py-4">
            <div className="text-sm text-gray-900">{props.username}</div>
          </td>
          <td className="px-6 py-4">
            <div className="text-xs text-gray-500">{props.password}</div>
          </td>
          <td className="px-6 py-4">
            <button onClick={(e) => updateSelectedUser()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </td>
          <td className="px-6 py-4">
            <button onClick={() => deleteSelectedUser()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
};
