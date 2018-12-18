var exports = (module.exports = {});
var _ = require("lodash");
var unirest = require("unirest");
var jwt = require("jsonwebtoken");
const config = require(process.cwd() + "/config/config.json");

exports.post = {
  reverseGeocode: (req, res) => {
    console.log("HERE");
    var body = _.pick(req.body, ["lat", "long"]);
    GetGeocoding(body)
      .then(parseData)
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
};

function GetGeocoding(data) {
  return new Promise((resolve, reject) => {
    var access_token = process.env.GEO_TOKEN || config.GEO_TOKEN;
    console.log(
      "https://api.opencagedata.com/geocode/v1/json?q=" +
        data.lat +
        "%2C" +
        data.long +
        "&key=" +
        access_token
    );
    unirest
      .get(
        "https://api.opencagedata.com/geocode/v1/json?q=" +
          data.lat +
          "+" +
          data.long +
          "&key=" +
          access_token
      )
      .headers({
        Accept: "application/json",
        "Content-Type": "application/json"
      })
      .end(
        response => {
          if (response.status == 200) {
            resolve(response.body);
          } else {
            reject({
              error: true,
              message: "Ip server error",
              data: response.body
            });
          }
        },
        error => {
          console.log(error);
          reject({
            error: true,
            message: "Ip server error",
            data: error
          });
        }
      );
  });
}

function parseData(location) {
  return new Promise((resolve, reject) => {
    data = _.pick(location.results[0], ["components"]);
    data.components.city = data.components.town;
    resolve(data.components);
  });
}
