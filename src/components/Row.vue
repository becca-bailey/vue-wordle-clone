<script setup lang="ts">
import { toRefs } from "vue";
import Tile from "./Tile.vue";
import { LetterTuple } from "../types";

const props = defineProps<{
  letters?: LetterTuple[];
  length: number;
  checked?: boolean;
}>();

const { checked, letters } = toRefs(props);

function getLetterTuple(i: number): LetterTuple | undefined {
  return letters.value && letters.value[i];
}

function getLetter(i: number) {
  const [letter] = getLetterTuple(i) || [];
  return letter;
}

function getStatus(i: number) {
  const [, status] = getLetterTuple(i) || [];
  return status;
}
</script>

<template>
  <Tile v-for="n in length" :status="getStatus(n - 1)">{{
    getLetter(n - 1)
  }}</Tile>
</template>
