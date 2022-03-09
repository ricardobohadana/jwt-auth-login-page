export const LoadingSpinner = () => {
  return (
    <div className="flex">
      <div className="relative">
        {/* <!-- Outer Ring--> */}
        <div className="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>

        {/* <!-- Inner Ring --> */}
        <div className="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-indigo-500 border-t-transparent shadow-md"></div>
      </div>
    </div>
  );
};
