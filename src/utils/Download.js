import RNFS from 'react-native-fs';

export const LOCAL_DOWNLOAD_PATH = RNFS.CachesDirectoryPath + '/CheryPorter/';

const VALIDATION_CHECK = text => {
  text = `${text}`.toLowerCase().trim();
  if (
    text === '' ||
    text === ' ' ||
    text === 'null' ||
    text === 'undefined' ||
    text === 'false'
  ) {
    return false;
  }
  return true;
};

const getRandomInt = (min = 10, max = 10000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export default {
  isAnyDownloaded() {
    return new Promise(async resolve => {
      RNFS.readDir(LOCAL_DOWNLOAD_PATH)
        .then(result => {
          if (VALIDATION_CHECK(result) && result.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
          // stat the first file
        })
        .catch(err => {
          console.log(err.message, err.code);
          resolve(false);
        });
    }); //end of PROMISE
  }, //end of isAnyDownloadded

  isFileDownloaded: (FILE_TO_DOWNLOAD, fileName) => {
    return new Promise(async (resolve, reject) => {
      if (FILE_TO_DOWNLOAD == undefined) {
        console.log('pagal', FILE_TO_DOWNLOAD);
        reject('path not found');
        return;
      }
      let path = LOCAL_DOWNLOAD_PATH;
      console.log('FILE_TO_DOWNLOADFILE_TO_DOWNLOAD ', FILE_TO_DOWNLOAD);

      const createFolderResult = await createFolder(path);
      let ext = FILE_TO_DOWNLOAD.split('.').pop();
      const filename = fileName + '.' + ext; //FILE_TO_DOWNLOAD.split('/').pop();
      if (createFolderResult) {
        path = path + `${filename}`;
      } else {
        path = LOCAL_DOWNLOAD_PATH + `${filename}`;
      }
      console.log('path ', path);
      RNFS.exists(path)
        .then(res1 => {
          console.log('is FILE EXIST ', res1);
          if (res1) {
            resolve(path);
          } else {
            resolve(false);
          }
        })
        .catch(err => {
          resolve(false);
        });
    });
  },

  DOWNLOAD(
    FILE_TO_DOWNLOAD,
    FILENAME,
    callBackBegin,
    callBackProgress,
    EXTENSIONParam = 'mp3',
  ) {
    return new Promise(async resolve => {
      let path = LOCAL_DOWNLOAD_PATH;

      const createFolderResult = await createFolder(path);
      let ext = FILE_TO_DOWNLOAD.split('.').pop();
      const filename = FILENAME + '.' + ext; //FILE_TO_DOWNLOAD.split('/').pop();
      if (createFolderResult) {
        path = path + `${filename}`;
      } else {
        path = LOCAL_DOWNLOAD_PATH + `${filename}`;
      }

      // path = await createPath(FILE_TO_DOWNLOAD, path);
      console.log('pathpath ', path);
      console.log('FILE_TO_DOWNLOAD ', FILE_TO_DOWNLOAD);

      console.log('filenamefilenamefilenamefilename ', filename);
      RNFS.downloadFile({
        fromUrl: FILE_TO_DOWNLOAD,
        toFile: path,
        background: true,
        discretionary: true,
        cacheable: true,
        begin: res => {
          console.log('resres header ', res);
          // let cd = res.headers["Content-Disposition"]
          // let regexString = /filename[^;\n=]*=((['"]).*?\2|[^;\n]*)/
          // let fileName = cd.match(regexString)[1]
          // path = LOCAL_DOWNLOAD_PATH + fileName;
          callBackBegin(res, path);
        },
        progress: res => {
          // stopDownload
          let progressPercent = (res.bytesWritten / res.contentLength) * 100;
          callBackProgress(progressPercent.toFixed(0));
        },
      })
        .promise.then(async res => {
          let ret = {};
          ret['url'] = path;
          resolve(ret);
        })
        .catch(err => {
          console.log('ERROR ONLINE FILE DOWNLOAD', err);
          resolve(false);
        });
    }); //end of  PROMISE
  }, //end of PDF

  DeleteFile(path) {
    return new Promise(resolve => {
      RNFS.unlink(path)
        .then(() => {
          resolve(true);
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch(err => {
          resolve(false);
        });
    });
  }, //end of DELETE_FILE
};

export const createFolder = PATH => {
  return new Promise(async resolve => {
    let exist = await RNFS.exists(PATH);
    if (!exist) {
      RNFS.mkdir(PATH)
        .then(res => {
          resolve(true);
        })
        .catch(err => {
          resolve(false);
        });
    }
    resolve(true);
  }); //end of promise
}; //end of CREATE_FOLDER
