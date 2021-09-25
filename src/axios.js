import axios from "axios";

const instance = axios.create({
    baseURL: "https://mernstackwhatsappdemo.herokuapp.com/",
});

export default instance;