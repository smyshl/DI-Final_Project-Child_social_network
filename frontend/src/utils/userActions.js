import axios from "axios";

export async function getAllUsers(accessToken) {

  console.log("userActions getAllUsers =>");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/all`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );

    console.log("getAllUsers, response =>", response.data.allUsers);

    if (response.status != 201)
      throw new Error("Something wrong with response from server");

    return response.data.allUsers;
  } catch (error) {
    console.log("getAllUsers catchError:", error);
  }
}


export async function getNewUserInvitationLink(accessToken) {

  console.log("userActions getNewUserInvitationLink =>");

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/user/invite`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );

    console.log("getNewUserInvitationLink, response =>", response.data);

    if (response.status != 201)
      throw new Error("Something wrong with response from server");

    return response.data;
  } catch (error) {
    console.log("getNewUserInvitationLink catchError:", error);
  }
}
