import Link from "next/link";

export const Register = () => {
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
              type=""
              placeholder="Cadastre seu nome de usuário"
            />
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
            />
          </div>
          <div className="mt-10">
            <button
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
            >
              Cadastrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
