import { useMutation } from '@tanstack/react-query';


interface LoginInfo {
  username: string;
  password: string;
}

async function loginAttempt(loginInfo: LoginInfo) {
  // const LOGIN_URL = '/auth';
  console.log('in loginattempt');
  const result = await fetch('/user/login', {
    method: 'POST',
    headers: {
      'content-type' : 'application/json'
    },
    body: JSON.stringify(loginInfo)
  });

  if(result.status !== 200) return Error;
  return await result.json();
}

const useLogin = () => {
  const {mutateAsync, data, isLoading, isError, error } = useMutation({
    mutationFn: (loginCredentials: LoginInfo) => loginAttempt(loginCredentials),
    retry: false
  });

  return {mutateAsync, data, isLoading, isError, error };
};

export default useLogin;


// import { axiosPublic } from '../api/axios';
// import { useMutation } from '@tanstack/react-query';

// async function loginAttempt(loginInfo) {
//   // loginInfo should be an object with email and password keys / corresponding values
//   const LOGIN_URL = '/api/auth';
//   const loginResults = await axiosPublic.post(LOGIN_URL, loginInfo, { withCredentials: true });
//   return loginResults.status === 200 ? loginResults.data : loginResults;
// }

// const useLogin = () => {
//   const { mutateAsync, data, isLoading, isError, error } = useMutation({
//     mutationFn: (loginArg) => loginAttempt(loginArg),
//     retry: false,
//   });

//   return { mutateAsync, data, isLoading, isError, error };
// };

// export default useLogin;