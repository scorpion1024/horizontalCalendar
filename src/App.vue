<script setup lang="ts">
import { ref } from "vue";
import { formatDate } from "./utils/date";
const thisDate = ref("2023-04-10");
const setDate = (val: Date): void => {
  thisDate.value = formatDate(val);
};
</script>
<template>
  <horizontal-calendar :active="thisDate" @changeDate="setDate" />
  <h1 style="text-align: center">{{ thisDate }}</h1>
</template>
