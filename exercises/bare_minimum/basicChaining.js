/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return new Promise(function(resolve, reject) {
    fs.readFile(readFilePath, function(err, data) {
      
      if(err) return reject(err);
      data = data.toString().split('\n').shift()
      
      resolve(data);
    });
  })
  .then( (user) => { 

    return new Promise(function(resolve, reject) {

    var options = {
      url: 'https://api.github.com/users/' + user,
      headers: { 'User-Agent': 'request' },
      json: true  // will JSON.parse(body) for us
    };

    request.get(options, function(err, res, body) {
      if (err) return reject(err);

      body = JSON.stringify(body)

      resolve(body)
      })
    })
  })
  .then( (body) => { 

    return new Promise(function(resolve, reject) {

      fs.writeFile(writeFilePath, body, function(err, data){
        if(err) return reject(err);
        resolve(data)
      })
    })
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
