import useAppStore from "@/contexts/zustand_ctx";
import useApiCalls from "./useApiCalls";

const useFetchPostDatas = () => {
  const apiCalls = useApiCalls();
  const { setToasterMessage } = useAppStore();

  function registerMutate(data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    return apiCalls.registerMutation.mutate({
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
    {
      onSettled: (data) => {
        if (data && data.data) {
          setToasterMessage({
            message: data.data?.message,
            type: data.data?.type,
          });
        }
      },
    }
  )};

  return {
    registerMutate,
  }
};

export default useFetchPostDatas;
