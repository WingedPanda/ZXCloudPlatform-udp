function showtime()
{ var today,hour,second,minute,year,month,date;
  var strDate;
  today = new Date();
  var n_day = today.getDay();
  switch (n_day) {
    case 0:{
      strDate = "星期日"
    } break;
    case 1:{
      strDate = "星期一"
    } break;
    case 2:{
      strDate = "星期二"
    } break;
    case 3:{
      strDate = "星期三"
    } break;
    case 4:{
      strDate = "星期四"
    } break;
    case 5:{
      strDate = "星期五"
    } break;
    case 6:{
      strDate = "星期六"
    } break;
  }
  year = today.getFullYear();
  month = today.getMonth()+1;
  date = today.getDate();
  hour = today.getHours();
  minute =today.getMinutes();
  second = today.getSeconds();
  minute = checkTime(minute);
  second = checkTime(second);
  document.getElementById('day').innerHTML = year + "年" + month + "月" + date + "日" + strDate;
  document.getElementById('hour').innerHTML = hour + ":" + minute + ":" + second; //显示时间
}
setInterval("showtime();", 1000);
function checkTime(i)
{
if (i<10)
  {i="0" + i}
  return i
}
