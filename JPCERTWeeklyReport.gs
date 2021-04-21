//sheet1
function Send_JPCERT_Infomation() {
  const options =
   {
     "sheet_name"  : "JPCERT/CC",
     "header" : "セキュリティ関連情報\n",
     "footer" : "",
     "dateFormat" : 0
    };  
  get_SpreadSheetValues(options);
}

//sheet2
function Send_SEP_ReleaseVersion() {
  const options =
   {
     "sheet_name"  : "Endpoint Protection 14",
     "header" : "SEPリリース新着情報\n",
     "footer" : "https://knowledge.broadcom.com/external/article?legacyId=TECH163829",
     "dateFormat" : 1
    };  
  get_SpreadSheetValues(options);
}

//common function
function get_SpreadSheetValues(options) {
  const params = getParams();
  
  const spreadsheet = SpreadsheetApp.openById(params.sheet_id);
  const sheet = spreadsheet.getSheetByName(options.sheet_name);
  const values = sheet.getDataRange().getValues();

  const sent_date = new Date(values[1][params.col_history]);

  let message = options.header;
  // 表題(i=0)は除く
  for (let i=1; i < values.length; i++)
  {
    var release_day = getDate(values[i][params.col_date],options.dateFormat);
    if ( sent_date < release_day) 
    {
      const title = values[i][params.col_title]+"\n"; 
      const url = values[i][params.col_url]+"\n"; 
      message += title+url+"\n";
    }
  }
  message += options.footer;

  if(message != (options.header+options.footer))
  {
    //通知日時を保存
    const now = new Date();
    sheet.getRange(2,1).setValue(now);
    Logger.log('send message. '+ now);
 
    sendHttpPost_lineNotification(message,params.token_id);
    Logger.log(message);
  }else
  {
    Logger.log('Already sent.')
  }
}

function getDate(value, type=0)
{
  let new_date;
  if(!value){
    return　new Date(1999,11);
  }
  switch (type)
  {
    case 0:
      new_date = new Date(value);
      break;
    case 1:
      value = value.replace(",","");
      //空白で分割
      const split_str = value.split(/\s+/);
      const year = parseInt(split_str[2]);
      const month = getMonthIndex(split_str[0]);
      const day = parseInt(split_str[1]);
      new_date = new Date(year,month,day);
      break;
  };
  return new_date;
}

function getMonthIndex(str_month)
{
  const full_month = ['January','February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

  const index = full_month.indexOf(str_month);

  const idx_month = [0,1,2,3,4,5,6,7,8,9,10,11];
  return idx_month[index];
}
