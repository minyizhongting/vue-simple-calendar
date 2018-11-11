<template>
  <div class="calendar-box">
    <Header
      :current-month="currentMonth"
      :first-day="firstDay"
      :default-range="defaultRange"
      @change="changeMonthHandle"
    ></Header>
    <div class="full-data">
      <div class="weeks">
        <span class="week" v-for="dayIndex in 7">{{(dayIndex-1) | localeWeekDay(firstDay, 'zh-CN')}}</span>
      </div>
      <div class="dates">
        <div class="dates-bg">
          <div class="week-row" v-for="week in dataList">
            <div class="day-cell" v-for="day in week"
                 :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth, 'curr': day.curr, 'offDay': day.isOffDay}">
              <p class="day-number" @click.stop="!day.isOffDay && day.isCurMonth && dayClick(day.date, $event)">{{day.monthDay}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import Header from './Header'
  import utils from '../libs/utils'
  export default {
    components: { Header },
    props: {
      currentDay: {
        type: String
      },
      defaultRange: {
        type: String
      },
      firstDay: {
        type: Number | String
      },
      weekend: {
        type: Boolean
      }
    },
    data() {
      return {
        currentMonth: '',
        dataList: [],  // 日历数据
      }
    },
    watch: {
      currentDay() {
        this.updateData();
      }
    },
    mounted() {
      this.updateData();
    },
    methods: {
      updateData() {
        this.currentMonth = moment(this.currentDay).startOf('month');
        this.changeMonthHandle(this.currentMonth);
      },
      changeMonthHandle(data) { // 切换年份月份 moment
        this.currentMonth = data;
        this.dataList = this.getCalendar();
        // let start = utils.getMonthViewStartDate(data, this.firstDay).format('YYYY-MM-DD');
        // let end = utils.getMonthViewEndDate(data, this.firstDay).format('YYYY-MM-DD');
        // console.log('current page: ', start, end);
      },
      getCalendar() {
        // calculate 2d-array of each month
        let monthViewStartDate = utils.getMonthViewStartDate(this.currentMonth, this.firstDay);
        let calendar = [];

        let payload = this.currentDay;
        while ([6,7].indexOf(moment(payload).isoWeekday()) != -1 && !this.weekend) { // 如果当前日期是周末 则往后顺延到第一个可选日
          payload = moment(payload).add(1, 'days').format('YYYY-MM-DD');
        }
        let [start, end] = this.defaultRange.split(' ');
        for (let perWeek = 0; perWeek < 6; perWeek++) {
          let week = [];
          for (let perDay = 0; perDay < 7; perDay++) {
            let offDay = false, curr = false;

            let isCurMonth = monthViewStartDate.isSame(this.currentMonth, 'month');
            let formatDate = monthViewStartDate.format('YYYY-MM-DD');
            if (([6,7].indexOf(monthViewStartDate.isoWeekday()) != -1 && !this.weekend) || (formatDate < start || formatDate > end)) {
              offDay = true;    // 周末or不可选日
            }
            if (payload == formatDate) {
              curr = true;  // 当天
            }
            week.push({
              monthDay: monthViewStartDate.date(),  // 几号
              isToday: monthViewStartDate.isSame(moment(), 'day'),  // 今天
              isCurMonth: isCurMonth, // 当月
              weekDay: perDay,  // 第几周 从0开始
              date: moment(monthViewStartDate), // date
              formatDate: formatDate, // date的YYYY-MM-DD格式
              curr: curr,   // 当天
              isOffDay: offDay,   // 周末or不可选日
            });
            monthViewStartDate.add(1, 'day');
          }
          calendar.push(week);
        }
        return calendar;
      },
      dayClick(day, jsEvent) {
        this.$emit('dayClick', day.format('YYYY-MM-DD') , jsEvent);
      }
    },
    filters: {
      localeWeekDay(weekday, firstDay, locale) {
        firstDay = parseInt(firstDay);
        const localMoment = moment().locale(locale);
        return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7].slice(1);
      }
    }
  }
</script>

<style lang="scss">
  .calendar-box {
    height: 300px;
    .full-data {
      padding: 17px 13px 0;
      .weeks {
        .week {
          display: inline-block;
          width: 35px;
          text-align: center;
          font-size: 12px;
          color: #FF801A;
        }
      }
      .dates {
        position: relative;
        .week-row {
          margin: 10px 0;
          .day-cell {
            width: 35px;
            height: 24px;
            display: inline-block;
            text-align: center;
            .day-number {
              display: inline-block;
              width: 24px;
              height: 24px;
              line-height: 24px;
              font-size: 12px;
              border-radius: 24px;
              color: #333;
              cursor: pointer;
              position: relative;
            }
            &.today {
              .day-number {
                background-color: #fffbb0;
              }
            }
            &.curr {
              .day-number {
                background-color: #F44B2E;
                color: #fff;
              }
            }
            &.not-cur-month {
              .day-number {
                color: #999;
                cursor: default;
                /*visibility: hidden;*/
              }
            }
            &.offDay {
              .day-number {
                color: #999;
                cursor: default;
              }
            }
          }
        }
      }
    }
  }
</style>