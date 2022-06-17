const axios = require("axios");

const getAllMemes = async function (req, res) {
  try {
    let option = {
      method: "get",
      url: `http://api.imgflip.com/get_memes`,
    };

    let result = await axios(option);
    res.status(200).send({ msg: result.data });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const Editor = async function (req, res) {
  try {
    let template_id = req.query.template_id;
    let text0 = req.query.text0;
    let text1 = req.query.text1;
    let username = req.query.username;
    let password = req.query.password;
    let option = {
      method: "post",
      url: `https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`,
    };

    let result = await axios(option);
    res.status(200).send({ data: result.data });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.getAllMemes = getAllMemes;
module.exports.Editor = Editor;
