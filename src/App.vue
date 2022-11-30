<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { ref, onMounted } from "vue";

const word = ref("hello");

async function getWord() {
  const params = {
    letterPattern: "^.{5}$",
    random: true,
  };
  const url =
    "https://wordsapiv1.p.rapidapi.com/words/?letterPattern=%5E.%7B5%7D%24&random=true";
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
}

onMounted(() => {
  getWord();
});
</script>

<template>
  <HelloWorld :word="word" />
</template>

<style scoped></style>
