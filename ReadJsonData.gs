function getParams() {
    const contents = DriveApp.getFolderById('(Google Drive のフォルダIDに置き換える)')
    .getFilesByName('param.json')
    .next()
    .getBlob()
    .getDataAsString("utf-8")
    .replace(/\r?\n/g, ''); //改行削除
  
    return JSON.parse(contents);
  }