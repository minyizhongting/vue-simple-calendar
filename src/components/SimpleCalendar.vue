<template>
  <div v-if="show" class="calendar-wrap">
    <div class="content">
      <full-calendar
        :current-day="currentDay"
        :first-day="firstDay"
        :weekend="weekend"
        :default-range="defaultRange"
        @dayClick="dayClickHandle"
      ></full-calendar>
      <div class="btn-box">
        <button @click="cancelHandle">取消</button>
        <button @click="confirmHandle">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import FullCalendar from './FullCalendar'
  export default {
    components: { FullCalendar },
    props: {
      show: {
        type: Boolean
      },
      current: {
        type: String,
        default: moment().format('YYYY-MM-DD')
      },
      defaultRange: {
        type: String,
        validator (val) {
          let reg = (/^\d{4}(-\d{2}){2}\s\d{4}(-\d{2}){2}$/).test(val);
          if (!reg) {
            return false;
          }
          let cur = moment().format('YYYY-MM-DD');
          let [start ,end] = val.split(' ');
          if (start <= cur && end >= moment(cur).add(2, 'days').format('YYYY-MM-DD')) {
            return true;
          } else {
            console.error('moment() should in this default range.');
            return false;
          }
        },
        default: '2018-10-01 2050-03-20'
      },
      firstDay: {
        type: Number | String,
        validator (val) {
          let res = parseInt(val);
          return res >=0 && res<=6;
        },
        default: 0
      },
      weekend: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentDay: ''
      }
    },
    watch: {
      show: {
        immediate: true,
        handler: function(newVal) {
          if (newVal) {
            this.currentDay = this.current;
          }
        }
      }
    },
    methods: {
      dayClickHandle(data) {
        this.currentDay = data;
      },
      cancelHandle(event) {
        this.$emit('cancel', event);
      },
      confirmHandle() {
        this.$emit('confirm', this.currentDay);
      },
    }
  }
</script>

<style lang="scss">
  .calendar-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.7);
    z-index: 99999;
    .content {
      width: 272px;
      min-height: 300px;
      background-color: #fff;
      position: absolute;
      top: 50%;
      margin-top: -225px;
      left: 50%;
      margin-left: -136px;
      text-align: center;
      user-select: none;
      .btn-box {
        padding: 20px 0;
        text-align: center;
        font-size: 0;
        button {
          width: 70px;
          height: 40px;
          line-height: 40px;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          font-size: 14px;
          &:nth-child(1) {
            color: #666;
            background: #fff;
            border: 1px solid #979797;
            margin-right: 10px;
          }
          &:nth-child(2) {
            color: #fff;
            background: #f34526;
            border: 1px solid #f34526;
          }
        }
      }
    }
  }
</style>