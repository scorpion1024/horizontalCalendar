<template>
  <div class="horizontal-date-info">
    <van-config-provider
      :theme-vars="{
        tabsBottomBarColor: 'rgb(245 245 245 / 0%)',
        tabsLineHeight: '0.6rem',
        paddingSm: '0.1rem',
        tabFontSize: '0.12rem',
        calendarSelectedDayBackground: '#ee2233',
      }"
    >
      <van-tabs v-model:active="pageInfo.active" @change="changeDate">
        <van-tab
          v-for="index in pageInfo.dateList"
          :name="index.date"
          :disabled="index.isDisabled"
        >
          <template #title>
            <div class="date-item">
              <div class="horizontal-date">{{ index.date.slice(5) }}</div>
              <div class="horizontal-week">{{ index.week }}</div>
            </div>
          </template>
        </van-tab>
      </van-tabs>
      <div class="date-calendar" @click="showCalendar = true">
        <van-icon name="calendar-o" color="#ee2233" />
      </div>
      <van-calendar
        v-model:show="showCalendar"
        :show-confirm="false"
        @select="changeDate"
        :default-date="pageInfo.activeDate"
        :min-date="pageInfo.minDate"
        :max-date="pageInfo.maxDate"
        :formatter="formatter"
      />
    </van-config-provider>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick, watchEffect, onBeforeMount } from "vue";
import { getDayName, formatDate, getWeekByDate1 } from "../utils/date";
import type { CalendarDayItem } from "vant";
interface Props {
  startDate?: Date;
  endDate?: Date;
  active?: string;
  activeDateArray?: string[];
}
const props = withDefaults(defineProps<Props>(), {
  startDate: () => new Date(),
  endDate: () => new Date(new Date().getTime() + 30 * 86400000), //默认加载一个月
  active: () => formatDate(new Date()),
  activeDateArray: () => [],
});
const showCalendar = ref(false);
const pageInfo = reactive({
  active: formatDate(props.startDate),
  activeDate: new Date(),
  minDate: props.startDate,
  maxDate: props.endDate,
  dateList: [{ date: "", week: "", isDisabled: false }],
});
const emits = defineEmits(["changeDate"]);
const changeDate = (val: string | Date) => {
  if (val) {
    val = typeof val === "string" ? new Date(val) : val;
    const lastDate = pageInfo.dateList.pop();
    setDateList(lastDate?.date || props.endDate, val);
    const [firstDateNoode] = pageInfo.dateList.slice(0, 1);
    emits("changeDate", val);
    showCalendar.value = false;
  }
};
onBeforeMount(() => {
  setDateList(props.startDate, props.endDate);
  nextTick().then(() => {
    pageInfo.active = formatDate(props.active); //出发tab点击事件让指定时间框出现在页面中间
  });
});
watchEffect(() => {
  const [firstDateNoode] = pageInfo.dateList.slice(0, 1);
  const [lastDateNoode] = pageInfo.dateList.slice(-1);
  pageInfo.activeDate = new Date(pageInfo.active.replace(/-/g, "/")); //数据类型转换
  pageInfo.minDate = new Date(
    (firstDateNoode?.date || formatDate(pageInfo.minDate)).replace(/-/g, "/")
  ); //大日历组件开始结束日期动态监测
  pageInfo.maxDate = new Date(
    (lastDateNoode?.date || formatDate(pageInfo.maxDate)).replace(/-/g, "/")
  );
});
const setDateList = (startDate: string | Date, endDate: string | Date) => {
  const firstDate =
    new Date(formatDate(startDate).replace(/-/g, "/")).getTime() <
    new Date(formatDate(props.active).replace(/-/g, "/")).getTime()
      ? new Date(formatDate(startDate).replace(/-/g, "/"))
      : new Date(formatDate(props.active).replace(/-/g, "/")); //如果当前日期小于今天则开始日期取当前日期
  const lastDate =
    new Date(formatDate(endDate).replace(/-/g, "/")).getTime() >
    new Date(formatDate(props.active).replace(/-/g, "/")).getTime()
      ? new Date(formatDate(endDate).replace(/-/g, "/"))
      : new Date(formatDate(props.active).replace(/-/g, "/")); //如果当前日期大于结束日期则结束日期取当前日期
  const dateLength = Math.ceil((lastDate.getTime() - firstDate.getTime()) / 86400000);
  const isInList = pageInfo.dateList.some((item) => item.date === endDate);
  if (!isInList || dateLength <= 10) {
    for (let index = 0; index < 10 + dateLength; index++) {
      const _thisDate = new Date(firstDate.getTime() + index * 86400000);
      const element = {
        isDisabled: false,
        date: formatDate(_thisDate),
        week: getDayName(_thisDate) === "今天" ? "今" : getWeekByDate1(_thisDate),
      };
      if (props.activeDateArray.length) {
        const dateStr = formatDate(_thisDate);
        if (!props.activeDateArray.includes(dateStr)) {
          element.isDisabled = true;
        }
      }
      !pageInfo.dateList.some((item) => item.date === formatDate(_thisDate)) &&
        pageInfo.dateList.push(element);
    }
  }
  pageInfo.dateList = pageInfo.dateList.filter((item) => item.date);
};
const formatter = (day: CalendarDayItem) => {
  if (props.activeDateArray.length) {
    const dateStr = formatDate(day.date);
    if (!props.activeDateArray.includes(dateStr)) {
      day.type = "disabled";
    }
  }
  return day;
};
</script>
<style scoped>
.horizontal-date-info {
  position: relative;
  width: 100vw;
}
.date-calendar {
  position: absolute;
  right: 0;
  top: 0;
  height: 0.6rem;
  width: 0.5rem;
  background-color: #fff;
  font-size: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.date-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.02rem 0.1rem;
}
.van-tabs {
  color: #333333;
}

.van-tab--active .date-item {
  background-color: #ee2233;
  color: #fff;
  border-radius: 0.02rem;
}
</style>
