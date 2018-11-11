import moment from 'moment';

let utils = {
  getMonthViewStartDate (date, firstDay) { // 当前月显示的第一个日期
    firstDay = parseInt(firstDay);
    let start = moment(date);
    let startOfMonth = moment(start.startOf('month'));

    start.subtract(startOfMonth.day(), 'days');

    if (startOfMonth.day() < firstDay) {
      start.subtract(7, 'days');
    }

    start.add(firstDay, 'days');
    return start;
  },
  getMonthViewEndDate (date) {  // 当前月显示的最后一个日期
    return this.getMonthViewStartDate(date).add(6, 'weeks');
  },
  getWeekDay (date) { // 根据日期获取星期
    let weekArr = moment().locale('zh-CN').localeData().weekdaysShort();
    let idx = moment(date).day();
    return weekArr[idx];
  },
  getDetail(date, str) {  // 根据日期分别获取年月日
    var result = '';
    switch(str) {
      case 'year':
        result = date.substring(0,4);
        break;
      case 'month':
        result = date.substring(5,7);
        break;
      case 'day':
        result = date.substring(8);
        break;
    }
    if (parseInt(result) < 10 && result.charAt(0) == '0') {
      result = result.slice(1);
    }
    return result;
  }
}

export default utils