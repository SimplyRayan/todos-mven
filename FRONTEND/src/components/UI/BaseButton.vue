<template>
  <button :disabled="isDisabled">
    <slot>
      {{ text }}
    </slot>
  </button>
</template>

<script>
export default {
  props: ["text", "isDisabled"],
};
</script>

<style scoped>
button {
  padding: 1rem 2rem;
  font-family: "Roboto", sans-serif;
  font-size: 2.4rem;
  border: none;
  outline: none;
  background-color: #d64045;
  border-radius: 5px;
  color: #f9fafb;
  transition: 0.4s ease;
}

button:hover {
  cursor: pointer;
  background-color: #c13a3e;
}

button:disabled {
  background-color: #d6404556;
  cursor: not-allowed;
}
</style>
