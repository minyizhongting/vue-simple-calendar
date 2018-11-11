<template>
  <div class="simple-header">
    <div class="year-box">
      <Dropdown trigger="click" @on-click="clickYearHandle">
        <a href="javascript:void(0)" class="time-drop">
          {{getYear}}
          <i class="arrow-down"></i>
        </a>
        <DropdownMenu slot="list">
          <template v-for="item in yearData">
            <DropdownItem :name="item.value">{{item.name}}</DropdownItem>
          </template>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="month-box">
      <span class="prev" @click.stop="goPrevMonth">&nbsp;</span>
      <Dropdown trigger="click" @on-click="clickMonthHandle">
        <a href="javascript:void(0)" class="time-drop">
          {{getMonth}}
          <i class="arrow-down"></i>
        </a>
        <DropdownMenu slot="list">
          <template v-for="item in monthData">
            <DropdownItem v-if="item.active" :name="item.id">{{item.name}}</DropdownItem>
          </template>
        </DropdownMenu>
      </Dropdown>
      <span class="next" @click.stop="goNextMonth">&nbsp;</span>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      currentMonth: {},
      defaultRange: {
        type: String
      }
    },
    data() {
      return {
        currentData: '',
        yearData: [],
        monthData: [],
        startDate: '',
        endDate: ''
      }
    },
    computed: {
      getYear() {
        return this.currentData.substring(0,4) + '年';
      },
      getMonth() {
        let m = this.currentData.substring(5,7);
        if (m.charAt(0) == '0') {
          m = m.slice(1);
        }
        return m + '月';
      }
    },
    mounted() {
      if (this.defaultRange) {
        this.initData();
      }
    },
    methods: {
      initData() {  // 初始化日历 年月筛选范围
        this.initMonth();
        [this.startDate, this.endDate] = this.defaultRange.split(' ');
        this.initYear(this.startDate.substring(0,4), this.endDate.substring(0,4));
      },
      initMonth() {
        let monthArr = [];
        for (let i = 1; i <= 12; i++) {
          let obj = {
            id: i,
            name: `${i}月`,
            active: true
          };
          monthArr.push(obj);
        }
        this.monthData = monthArr;
      },
      initYear(start, end) {
        let yearArr = [], id = 0;
        for (let i = start; i <= end; i++) {
          let obj = {
            id: id++,
            name: `${i}年`,
            value: i
          };
          yearArr.push(obj);
        }
        this.yearData = yearArr;
      },
      clickYearHandle(value) {
        let result = '';
        this.yearData.forEach((item) => {
          if (item.value == value) {
            result = item.value;
          }
        });
        this.currentData = result + this.currentData.substring(4);
        this.getMonthLatest(value);
        this.$emit('change', moment(this.currentData));
      },
      clickMonthHandle(id) {
        let result = '';
        this.monthData.forEach((item) => {
          if (item.id == id) {
            result = item.id;
          }
        });
        result = result > 9 ? result : '0' + result;
        this.currentData = this.currentData.substring(0,5) + result + this.currentData.substring(7);
        this.$emit('change', moment(this.currentData));
      },
      goPrevMonth() {
        if (moment(this.currentData).isSame(this.startDate)) {
          return;
        }
        let newMonth = moment(this.currentData).subtract(1, 'months').startOf('month');
        this.$emit('change', newMonth);
      },
      goNextMonth() {
        if (moment(this.currentData).isSame(this.endDate)) {
          return;
        }
        let newMonth = moment(this.currentData).add(1, 'months').startOf('month');
        this.$emit('change', newMonth);
      },
      getMonthLatest(value) {  // 更新年份后，更改相对应月份
        let curr = parseInt(this.currentData.substring(5,7)),
            start = parseInt(this.startDate.substring(5,7)),
            end = parseInt(this.endDate.substring(5,7));
        if (this.startDate.substring(0,4) == this.endDate.substring(0,4)) {   // start年和end年是同一年
          this.monthData.forEach((item) => {
            item.id >= start && item.id <= end ? item.active = true : item.active = false;
          });
          return;
        }
        if (value == this.startDate.substring(0,4)) { // start年
          this.monthData.forEach((item) => {
            item.id >= start ? item.active = true : item.active = false;
          });
          if (curr < start) {
            curr = start <=9 ? '0' + start : start;
            this.currentData = this.currentData.replace(/(\d{4}-)\d{2}(-\d{2})/, `$1${curr}$2`);
          }
        } else if (value == this.endDate.substring(0,4)) {  // end年
          this.monthData.forEach((item) => {
            item.id <= end ? item.active = true : item.active = false;
          });
          if (curr > end) {
            curr = end <= 9 ? '0' + end : end;
            this.currentData = this.currentData.replace(/(\d{4}-)\d{2}(-\d{2})/g, `$1${curr}$2`);
          }
        } else {
          this.monthData.forEach((item) => {
            item.active = true;
          });
        }
      },
    },
    watch: {
      currentMonth(newVal, oldVal) {
        if (oldVal && newVal.format('YYYY-MM-DD') == oldVal.format('YYYY-MM-DD')) {
          return;
        }
        this.currentData = this.currentMonth.format('YYYY-MM-DD');
        if (!oldVal || (newVal.month() != oldVal.month())) {
          this.getMonthLatest(this.currentData.substring(0,4));
        }
      }
    }
  }
</script>

<style lang="scss">
  .simple-header {
    height: 50px;
    background: #F8F8F8;
    padding: 11px 25px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: #666;
    }
    .arrow-down {
      display: inline-block;
      width: 0;
      padding: 0;
      box-sizing: content-box;
      border-width: 4px;
      border-style: solid;
      border-color: #A7A7A7 transparent transparent #A7A7A7;
      transform: rotate(-135deg);
      margin-bottom: 4px;
      margin-left: 2px;
    }
    .ivu-select-dropdown {
      margin: 0;
    }
    .ivu-dropdown-item {
      padding: 7px 0;
    }
    .ivu-dropdown-menu {
      min-width: auto;
      max-height: 300px;
      overflow-y: auto;
    }
    .year-box {
      width: 80px;
      height: 28px;
      font-size: 16px;
      margin-right: 10px;
      line-height: 28px;
      .ivu-dropdown {
        padding-left: 3px;
        width: 70px;
        height: 26px;
        font-size: 16px;
        text-align: center;
      }
    }
    .month-box {
      width: 125px;
      height: 28px;
      border: 1px solid #D5D5D5;
      border-radius: 2px;
      box-sizing: border-box;
      line-height: 28px;
      text-align: left;
      display: flex;
      span {
        display: inline-block;
        width: 26px;
        height: 26px;
        box-sizing: border-box;
        text-align: center;
        font-size: 16px;
        position: relative;
        cursor: pointer;
        &.prev {
          border-right: 1px solid #D5D5D5;
          &:before {
            content: '';
            position: absolute;
            top: 10px;
            left: 10px;
            width: 8px;
            height: 8px;
            border-left: 2px solid #A7A7A7;
            border-top: 2px solid #A7A7A7;
            transform: rotate(-45deg);
          }
        }
        &.next {
          border-left: 1px solid #D5D5D5;
          &:before {
            content: '';
            position: absolute;
            top: 10px;
            right: 10px;
            width: 8px;
            height: 8px;
            border-left: 2px solid #A7A7A7;
            border-top: 2px solid #A7A7A7;
            transform: rotate(135deg);
          }
        }
      }
      .ivu-dropdown {
        width: 73px;
        height: 26px;
        font-size: 16px;
        text-align: center;

      }
    }
  }
</style>