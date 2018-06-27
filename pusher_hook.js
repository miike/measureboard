// The following is a Google App script macro that should be triggered onSheet updates
// Populate the commented fields with values

function md5(str) {
  return Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, str).reduce(function(str,chr){
    chr = (chr < 0 ? chr + 256 : chr).toString(16);
    return str + (chr.length==1?'0':'') + chr;
  },'');
}

function sign(str){
  app_secret = ''; // Application secret
  return Utilities.computeHmacSha256Signature(string_to_sign, app_secret).reduce(function(str,chr){
    chr = (chr < 0 ? chr + 256 : chr).toString(16);
    return str + (chr.length==1?'0':'') + chr;
  },'');
}

function onEdit(e) {
  var data = {
    'data': 'refresh', // does not matter what is in the data value as we do not use this
    'name': 'refresh', // keep this as refresh
    'channel': '', // your Pusher channel name here
  };
  
  var options = {
    'method' : 'post',
    'payload': JSON.stringify(data),
    'contentType': 'application/json',
    'muteHttpExceptions': true
  };
  
  app_id = ''; // your Pusher application id
  auth_key = ''; // your Pusher authorisation key
  auth_timestamp = Math.floor((new Date).getTime()/1000);
  auth_version = '1.0';
  body = JSON.stringify(data);
  body_md5 = md5(body);
  Logger.log(body_md5);
  
  string_to_sign =
    "POST\n/apps/" + app_id +
    "/events\nauth_key=" + auth_key +
    "&auth_timestamp=" + auth_timestamp +
    "&auth_version=" + auth_version +
    "&body_md5=" + body_md5
    
  signature = sign(string_to_sign);
  var pusher_url = 'https://api-ap1.pusher.com/apps/' + app_id + '/events?body_md5=' + body_md5 + '&auth_version=1.0&auth_key=' + auth_key + '&auth_signature=' + signature + '&auth_timestamp=' + auth_timestamp;
  var response = UrlFetchApp.fetch(pusher_url, options);
}
