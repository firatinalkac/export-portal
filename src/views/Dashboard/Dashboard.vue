<template>
   <div class="dashboard">
      <div class="dashboard__title">
         Dashboard
      </div>
      <div class="dashboard__content">
         <Summary value="500.000" currency="$" type="odenen" description="Ödenen" />
      </div>
   </div>
</template>

<script setup>
import Summary from "@/components/Summary.vue";
</script>

<style scoped lang="scss">
.dashboard {
   &__title {
      font-size: 1.5rem;
      font-weight: 600;
   }
   &__content {
      margin-top: 1.5rem;
      border: 1px solid var(--border);
      border-radius: .5rem;
      padding: 2rem 1.5rem;
      background: var(--content-bg);
   }
}
</style>