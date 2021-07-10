const axios = require('axios')

const postRequest = async (url, body, config) => {
    return await axios.post('https://'+url, body, config)
}
const getRequest = async (url, config) => {
    return await axios.get('https://'+url, config)
}
module.exports={
    postReq: postRequest,
    getReq :getRequest
}