<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, toRefs } from "vue";
import Row from "./Row.vue";
import { GameState, LetterTuple } from "../types";

// validate word
const props = defineProps<{ word: string }>();
const { word } = toRefs(props);

const letterCount = 5;
const rowCount = 6;

const checkedRows = ref<LetterTuple[][]>([]);
const activeRow = ref<LetterTuple[]>([]);
const activeRowIndex = ref<number>(0);

const gameState = ref<GameState>("in-progress");
const wordMatch = computed<string[]>(() => word.value.toLowerCase().split(""));

function checkLetter([letter]: LetterTuple, i: number): LetterTuple {
  if (letter === wordMatch.value[i]) {
    return [letter, "match"];
  } else if (wordMatch.value.includes(letter)) {
    return [letter, "contains"];
  }
  return [letter, "none"];
}

async function checkWord(word: string): Promise<boolean> {
  const url = `https://wordsapiv1.p.rapidapi.com/words/${word}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.WORDS_API_KEY,
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
  return false;
}

async function handleSubmit() {
  if (activeRow.value.length < letterCount) {
    return;
  }

  // const isWord = await checkWord(word.value);

  // Check if letters are a word

  const checked = activeRow.value.map(checkLetter);
  const isWin = checked.every(([, status]) => status === "match");
  const isCompleted = activeRowIndex.value === rowCount - 1;

  checkedRows.value.push(checked);
  activeRow.value = [];
  activeRowIndex.value++;

  if (isWin) {
    gameState.value = "win";
  } else if (isCompleted) {
    gameState.value = "lose";
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (gameState.value !== "in-progress") {
    return;
  }
  if (event.key.match(/^[a-z]$/) && activeRow.value.length <= letterCount) {
    activeRow.value.push([event.key, "pending"]);
  } else if (event.key === "Backspace") {
    activeRow.value.pop();
  } else if (event.key === "Enter") {
    handleSubmit();
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div class="grid">
    <template v-for="n in rowCount">
      <Row
        v-if="n - 1 === activeRowIndex"
        :letters="activeRow"
        :length="letterCount"
      ></Row>
      <Row
        v-else
        :letters="checkedRows[n - 1]"
        :length="letterCount"
        :checked="true"
      ></Row>
    </template>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
</style>
