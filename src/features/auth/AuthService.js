import axios from "axios";

const backendUrl = 'http://localhost:8000/api/v1/registration'

const register = async (data) => {
    const res = await axios.post(backendUrl, data)

    if (res.data) {
        localStorage.setItem('verificationToken', JSON.stringify(res.data.activationToken))

    }
    return res.data

}

const authService = {
    register
}

export default authService;

