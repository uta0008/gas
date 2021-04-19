function getParams() {
    const contents = DriveApp.getFolderById('google drive folder id(replace folder id)')
    .getFilesByName('param.json')
    .next()
    .getBlob()
    .getDataAsString("utf-8")
    .replace(/\r?\n/g, ''); //改行削除
  
    return JSON.parse(contents);
  }