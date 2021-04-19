function sendHttpPost_lineNotification(content, token_id){
    const token = [token_id]; 
    const options =
     {
       "method"  : "post",
       "payload" : {"message": content}, 
       "headers" : {"Authorization" : "Bearer "+ token}
      };
     UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
  }
  