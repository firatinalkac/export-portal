<template>
   <div class="input-container">
      <span class="label" v-if="label">
         {{ label }}
      </span>
      <input
         class="input"
         :type="type"
         :placeholder="placeholder"
         :value="modelValue"
         :disabled="isDisabled"
         @input="$emit('update:modelValue', $event.target.value)"
         v-bind="$attrs"
      />
   </div>
</template>

<script setup>
defineProps({
   type: {
      type: String,
      default: 'text',
   },
   placeholder: {
      type: String,
   },
   isDisabled: {
      type: Boolean,
      default: false,
   },
   label: {
      type: [String, Boolean],
      default: false,
   },
   modelValue: {
      type: String,
   }
});
</script>

<style scoped lang="scss">
.input-container {
   display: flex;
   flex-direction: column;
   gap: .7rem;
   margin-bottom: 1.5rem;
   width: 100%;
   & .input {
      padding: 1rem 1.2rem;
      border-radius: 8px;
      background: transparent;
      border: 1px solid var(--border);
      color: var(--secondary);
      &:focus-visible {
         background: var(--page-bg-color);
         outline: 1px solid var(--border);
      }
   }
}
</style>