# vue-simple-calendar

根据项目需要，开发的PC端的日历组件。示例见[demo](https://minyizhongting.github.io/vue-simple-calendar/#/)。

## Usage

```javascript
<single-calendar
      :show="true"
      :current="'2018-11-11'"
      :first-day="0"
      :weekend="true"
      :default-range="'2018-10-01 2050-03-20'"
      @cancel="cancel"
      @confirm="confirm"
></single-calendar>
```

Tips：
* show: 是否显示日历弹框

* current: 显示日历时，默认选中日期

* firstDay: 星期中第一天为周日

* weekend: 日历中周末是否为可选日

* defaultRange: 日历的有效范围

* cancel: 日历取消事件

* confirm: 日历确定事件

组件示例如下图。

![demo.png](https://github.com/minyizhongting/vue-simple-calendar/blob/master/src/assets/demo.png)



## Install

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Reference

参考[vue-fullcalendar](https://github.com/Wanderxx/vue-fullcalendar)。