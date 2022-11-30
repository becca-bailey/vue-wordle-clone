<script setup lang="ts">
import { LetterStatus } from "../types";

defineProps<{
  status?: LetterStatus;
}>();
</script>

<template>
  <div class="tile" :class="status"><slot></slot></div>
</template>

<style>
.tile {
  --size: 5rem;
  width: var(--size);
  height: var(--size);
  text-align: center;
  font-size: calc(var(--size) / 2);
  font-weight: bold;
  line-height: var(--size);
  text-transform: uppercase;
  box-sizing: border-box;
  border: 2px solid gray;
}

.pending {
  border: 3px solid black;
}

.match {
  background-color: green;
  color: white;
  border: none;
}

.none {
  background-color: gray;
  color: white;
  border: none;
}

.contains {
  background-color: orange;
  color: white;
  border: none;
}
</style>
