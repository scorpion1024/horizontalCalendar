<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "./utils/date";
import horizontalCalendar from "./components/horizontalCalendar.vue";
const thisDate = ref("2023-04-10");
const setDate = (val: Date): void => {
  console.log(val);
  thisDate.value = formatDate(val);
};
</script>
<template>
  <horizontal-calendar :active="thisDate" @changeDate="setDate" />
  <h1 style="text-align: center">{{ thisDate }}</h1>
</template>
