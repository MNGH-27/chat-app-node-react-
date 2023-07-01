import useFetch from "./../hooks/useFetch";

const endPoint = "room";

export async function GetRoom(navigate, { receiverId }) {
  const apiCall = await useFetch(navigate).get(`${endPoint}/${receiverId}`);

  return apiCall;
}

export async function CreateNewRoom(navigate, { receiverId }) {
  const apiCall = await useFetch(navigate).post(`${endPoint}/${receiverId}`);

  return apiCall;
}
