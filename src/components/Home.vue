<template>
  <div class="vue-home">
    <single-calendar
      :show="show"
      :current="current"
      :first-day="firstDay"
      :weekend="weekend"
      :default-range="defaultRange"
      @cancel="cancel"
      @confirm="confirm"
    ></single-calendar>
    <div class="choose-time">
      <label>开始时间</label>
      <div class="result" @click="showCalendar">
        <span v-if="!resultTime" class="default">请输入时间</span>
        <span v-else class="chosen">{{resultTime}}</span>
      </div>
    </div>
    <div v-if="resultTime" class="tips">
      <p>选择的时间是： <i>{{resultTime}} {{getCurrentWeekDay}}</i></p>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import utils from '../libs/utils'
  import SingleCalendar from './SingleCalendar'
  export default {
    components: { SingleCalendar },
    data() {
      return {
        show: false,
        resultTime: '', // 选择结果
        firstDay: 0,  // week中第一天是周日
        weekend: false,  // 周末是否可选
        current: moment().format('YYYY-MM-DD'),  // 组件默认选中今天
        defaultRange: '2018-10-01 2050-03-20'   // 日历有效范围
      }
    },
    computed: {
      getCurrentWeekDay() {
        return utils.getWeekDay(this.resultTime);
      }
    },
    methods: {
      showCalendar() {
        this.show = true;
      },
      cancel() {
        this.show = false;
      },
      confirm(value) {
        this.current = value;
        this.resultTime = value;
        this.show = false;
      }
    }
  }
</script>

<style lang="scss">
  .vue-home {
    padding: 100px;
    .choose-time {
      font-size: 16px;
      display: flex;
      align-items: center;
      label {
        display: inline-block;
        margin-right: 10px;
      }
      .result {
        width: 300px;
        height: 36px;
        line-height: 36px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        span {
          display: block;
          padding-left: 10px;
          position: relative;
          &.default {
            color: #999;
          }
          &.chosen {
            color: #333;
          }
          &:after {
            position: absolute;
            top: 9px;
            right: 10px;
            content: '';
            display: inline-block;
            width: 18px;
            height: 18px;
            background: url("../assets/calendar_icon.png");
          }
        }
      }
    }
    .tips {
      padding: 50px 0;
      font-size: 16px;
      i {
        font-style: normal;
        color: #f34526;
      }
    }
  }
</style>