import useFetch from "./../hooks/useFetch";

const endPoint = "auth";

export async function SignupUser(navigate, { password, email, name }) {
  const apiCall = await useFetch(navigate).post(`${endPoint}/signup`, {
    password,
    email,
    name,
  });

  return apiCall;
}

export async function LoginUser(navigate, { password, name }) {
  const apiCall = await useFetch(navigate).post(`${endPoint}/login`, {
    password,
    name,
  });

  return apiCall;
}

export async function GoogleAuthentication(navigate = null) {
  const apiCall = await useFetch(navigate).post(`${endPoint}/google`);

  return apiCall;
}
