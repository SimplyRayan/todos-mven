<template>
  <li class="todo-item">
    <span class="todo-num"></span>
    <span class="todo-text"></span>
    <span class="todo-date"></span>
  </li>
</template>

<script></script>

<style scoped>
.todo-item {
  padding: 2rem 1rem;
  font-size: 2.4rem;
  display: grid;
  grid-template-columns: 1fr 10fr 5fr;
  grid-template-rows: 1fr;
  gap: 2rem;
  border-bottom: 1px solid #86746b57;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-num {
  display: block;
  /* background-color: rgba(194, 179, 169, 0.6); */
  border-radius: 15px;

  height: 4rem;
  animation: skeleton 0.8s linear infinite alternate;
}

.todo-text {
  display: block;
  /* background-color: rgba(194, 179, 169, 0.6); */
  animation: skeleton 0.8s linear infinite alternate;
  border-radius: 20px;

  height: 4rem;
}

.todo-date {
  display: block;
  /* background-color: rgba(194, 179, 169, 0.6); */
  border-radius: 15px;
  height: 4rem;
  animation: skeleton 0.8s linear infinite alternate;
}

/*  */
@keyframes skeleton {
  0% {
    background-color: #91796c99;
  }
  100% {
    background-color: rgba(187, 159, 144, 0.6);
  }
}
</style>
