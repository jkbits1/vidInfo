/**
 * Created by jk on 20/12/15.
 */

var fs = require('fs');
var path = require('path');

module.exports = {
    getVideoInfo:           getVideoInfo,
    getVideoInfoWrapped:    getVideoInfoWrapped,
    getVideoInfoFileNames:  getVideoInfoFileNames
};

function getVideoInfo(fileName, callback) {

  fs.readFile(fileName, function (err, data) {
    var fileData = [], titleLengths = [], titleDetails = [];
    if (err) {
//      throw err;
      console.log('file not found - returning default info');

      return getVideoInfo('dsk6-info.txt', callback);
    }

    fileData = data.toString().split('\n');

    function getLengthLines (prev, val) {
      var re = /(ID_DVD_TITLE_\d+_LENGTH=\d+(\.\d+))/i;
      var found = val.match(re);

      if (found !== undefined && found !== null) {
        prev.push(found[0]);
      }

      return prev;
    }

    function createTitleInfoObject (val) {
      var titleNumber = 0;
      var length = 0;

      var regTitleNumberPortion = /(ID_DVD_TITLE_\d+)/i;
      var found = val.match(regTitleNumberPortion);

      if (found !== undefined && found !== null) {
        var regTitleNumber = /\d+/i;
        var numInfo = found[0].match(regTitleNumber);

        titleNumber = numInfo[0];

        var regLengthPortion = /LENGTH=\d+(\.\d+)/i;
        var lengthInfo = val.match(regLengthPortion);

        length = lengthInfo[0].match(/\d+(\.\d+)/) [0];
      }

      return {
        line: val,
        titleNumber: +(titleNumber),
        length: +(length)
      };
    }

    titleLengths = fileData.reduce(getLengthLines, []);
    titleDetails = titleLengths.map(createTitleInfoObject);

    titleDetails.sort(function (title1, title2) {
      return title1.length - title2.length;
    });
    
    var titleDetailsJson = JSON.stringify(titleDetails);
    
    // console.log(titleDetails);
    console.log(titleDetailsJson);

    //return titleDetails;
    callback({
      fileName:     fileName,
      titleDetails: titleDetailsJson
    });
  });
};

function getVideoInfoWrapped (fileName, callback) {

  fs.readFile(fileName, function (err, data) {
    var fileData = [], titleLengths = [], titleDetails = [];
    if (err) {
//      throw err;
      console.log('file not found - returning default info');

      return getVideoInfo('dsk6-info.txt', callback);
    }

    fileData = data.toString().split('\n');

    function getLengthLines (prev, val) {
      var re = /(ID_DVD_TITLE_\d+_LENGTH=\d+(\.\d+))/i;
      var found = val.match(re);

      if (found !== undefined && found !== null) {
        prev.push(found[0]);
      }

      return prev;
    }

    function createTitleInfoObject (val) {
      var titleNumber = 0;
      var length = 0;

      var regTitleNumberPortion = /(ID_DVD_TITLE_\d+)/i;
      var found = val.match(regTitleNumberPortion);

      if (found !== undefined && found !== null) {
        var regTitleNumber = /\d+/i;
        var numInfo = found[0].match(regTitleNumber);

        titleNumber = numInfo[0];

        var regLengthPortion = /LENGTH=\d+(\.\d+)/i;
        var lengthInfo = val.match(regLengthPortion);

        length = lengthInfo[0].match(/\d+(\.\d+)/) [0];
      }

      return {
        line: val,
        titleNumber: +(titleNumber),
        length: +(length)
      };
    }

    titleLengths = fileData.reduce(getLengthLines, []);
    titleDetails = titleLengths.map(createTitleInfoObject);

    titleDetails.sort(function (title1, title2) {
      return title1.length - title2.length;
    });
    
    // var titleDetailsJson = JSON.stringify(titleDetails);
    var titleDetailsJson = titleDetails;
    
    // console.log(titleDetails);
    console.log(titleDetailsJson);

    //return titleDetails;
    callback(
        {
            wrapper: 
            {
              fileName:     fileName,
              titleDetails: titleDetailsJson
            }
        }
    );
  });
};

function getVideoInfoFileNames (callback) {

    fs.readdir(".", (err, files) => {
      // if (err) {
        // send iffy data to test elm client
        return       callback([null, "test1", null, "test2", null, "test2d"]);
        // return       callback(["test1", null, "test2", null, "test2c"]);
        // return       callback([null, "test1", null, "test2b"]);
        // return       callback(["test1", null, "test2a"]);
        // return       callback(["test1", "test2"]);
      // }

      const txtFiles = files.filter((val, idx) => {
        return path.extname(val) === ".txt";
      });

      return callback(txtFiles);
    });

}
