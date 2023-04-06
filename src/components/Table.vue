<template>
   <div class="table">
      <table>
            <tr>
               <th v-for="column in props.columns" :key="column.key" :style="{ width: column.width, textAlign: column.titleTextAlign, verticalAlign: column.titleVerticalAlign }">
                  {{ column.title }}
               </th>
            </tr>
            <tr v-for="item in props.data" :key="item.id">
               <td v-for="column in props.columns" :key="column.key" :style="{textAlign: column.textAlign, verticalAlign: column.verticalAlign}">
                  <slot :name="column.scopedSlot" v-bind:data="item" v-if="!!column.scopedSlot" />
                  <span v-else >
                     {{ item[column.key] }}
                  </span>
               </td>
            </tr>
      </table>
   </div>
</template>

<script setup>
const props = defineProps(['columns', 'data']);
import { useSlots } from "vue";

const slots = useSlots()
const hasSlot = (name) => {
   return !!slots[name];
}
</script>

<style scoped lang="scss">
table, td, th {
   border: 1px solid var(--border);
   border-collapse: collapse;
}
td, th {
   padding: 0.7rem;
}
td {
   text-align: start;
}
tr:has(td):hover {
   background: var(--hover);
   cursor: pointer;
}
</style>