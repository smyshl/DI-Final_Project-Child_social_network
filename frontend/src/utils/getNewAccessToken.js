import axios from "axios";


export async function getNewAccessToken (login, logout, navigate) {
    // console.log("getNewAccessToken =>", "ХУЙ");
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/getnewaccesstoken`, {
            withCredentials: true
        });
        console.log("getNewAccessToken, response =>", response.headers['x-access-token']);
        console.log("getNewAccessToken, response =>", response.data.user);

        if (response.data.message === "New access token succesfully created"){
            login(response.data.user, response.headers['x-access-token']);
        }

        if (response.status != 201) throw new Error ('Something wrong with response from server')

        return response;

    } catch (error) {
        console.log("getNewAccessToken catchError:", error.response.data.message);
        if (error.response?.data?.message === "No refresh token found") {
            logout();
            // alert('Please log in');
            // setLoginIsOpen(true);
            navigate('/');
        }
    }
}