import useFetch from "./../hooks/useFetch";

const endPoint = "user";

export async function GetUser(navigation) {
  const apiCall = await useFetch(navigation).get(`${endPoint}`);
  return apiCall;
}
