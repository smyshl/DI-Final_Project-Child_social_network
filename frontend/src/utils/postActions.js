import axios from "axios";

export async function deletePost(post_id, accessToken) {
  console.log("postActions deletePost =>", post_id);

  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/post/delete/${post_id}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );

    console.log("deletePost, response =>", response);

    if (response.status != 201)
      throw new Error("Something wrong with response from server");

    return response;
  } catch (error) {
    console.log("deletePost catchError:", error);
  }
}
