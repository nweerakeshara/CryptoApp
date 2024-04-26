const axios = require("axios");
const CONSTANTS = require("../../constants");

module.exports.getAnswer = async (question) => {
  let answer = await makeRequestToFlaskAPI(question);
  return answer;
};

const makeRequestToFlaskAPI = (question) => {
  return axios({
    method: "post",
    url: `${process.env.FLASK_API_URL}/predict/qna`,
    data: { question },
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  })
    .then(function (response) {
      //handle success
      console.log("Answer received from QnA System");
      return response.data;
    })
    .catch(function (error) {
      //handle error
      console.log("Error connecting to FLASK API for QnA System");

      return error;
    });
};
