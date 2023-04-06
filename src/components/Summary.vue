<template>
   <div class="summary" :class="props.type">
      <div class="price">
         <span class="price__value">{{ props.value }}</span>
         <span class="price__currency">{{ props.currency }}</span>
      </div>
      <span class="description">{{ props.description }}</span>
   </div>
</template>

<script setup>
const props = defineProps(['value', 'currency', 'type', 'description'])
</script>

<style scoped lang="scss">
.summary {
   display: flex;
   flex-direction: column;
   gap: 1rem;
   width: max-content;
   padding: 1rem 1.5rem;
   border-radius: .5rem;
   background: #3fb883;
   & .price {
      &__value {
         font-size: 2rem;
         font-weight: 700;
         margin-right: 0.3rem;
      }
   }
   & .description {
      color: var(--secondary);
      font-weight: 500;
      text-align: end;
   }
}
</style>