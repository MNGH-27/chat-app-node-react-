import useFetch from "./../hooks/useFetch";

const endPoint = "auth";

export async function SignupUser({ password, email, name }) {
  const apiCall = await useFetch().post(`${endPoint}/signup`, {
    password,
    email,
    name,
  });

  return apiCall;
}

export async function LoginUser({ password, name }) {
  const apiCall = await useFetch().post(`${endPoint}/login`, {
    password,
    name,
  });

  return apiCall;
}

export async function GoogleAuthentication() {
  const apiCall = await useFetch().post(`${endPoint}/google`);

  return apiCall;
}
