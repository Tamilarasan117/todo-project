import axiosClient from "@/apis/axiosClient";
import useAppStore from "@/contexts/zustand_ctx";
import { ApiTypings } from "@/types/api_types";
import { useMutation } from "@tanstack/react-query";

const useApiCalls = () => {
  const { setLoading, setToasterMessage } = useAppStore();

  const registerMutation = useMutation({
    mutationFn: (data: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      setLoading(true);
      return axiosClient.post(ApiTypings.REGISTER_API, {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
    },
    onSuccess: (data: any) => {
      setLoading(false);
    },
    onError: (error: any) => {
      setLoading(false);
      if (error.response && error.response.data) {
        setToasterMessage({
          message: error.response.data.message,
          type: error.response.data.type
        })
      }
    }
  });

  return {
    registerMutation,
  };
};

export default useApiCalls;
