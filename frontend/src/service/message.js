import useFetch from "./../hooks/useFetch";

const endPoint = "chat";

export async function GetAllMessages(navigation, { roomId }) {
  const apiCall = await useFetch(navigation).get(
    `${endPoint}/messages/${roomId}`
  );

  return apiCall;
}
