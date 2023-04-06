<template>
   <div class="add-shipment">
      <div class="fields">
         <Input v-model="postBody.company_name" label="Firma adi" />
         <Input v-model="postBody.shipment_date" label="Nakliye tarihi" type="date" />
         <Input v-model="postBody.shipment_price" label="Nakliye ücreti" type="number" />
         <Input v-model="postBody.payment_received" label="Ödenen ücret" type="number" />
         <Input v-model="postBody.shipment_cost" label="Nakliye maliyeti" type="number" />
      </div>
      <div class="bottom-area">
         <button class="submit-bnt" @click="saveShipment">
            Kaydet
         </button>
      </div>
   </div>
</template>

<script setup>
import Input from "@/components/Input.vue";
import { reactive, toRefs } from 'vue'

const postBody = reactive({
   company_name: "",
   shipment_date: "",
   shipment_price: "",
   payment_received: "",
   shipment_cost: "",
})

function saveShipment() {
   console.log(toRefs(postBody))
}

</script>

<style scoped lang="scss">
.add-shipment {
   border: 1px solid var(--border);
   padding: 3rem 1.5rem;
   border-radius: .5rem;
   background: var(--content-bg);
   & .fields {
      display: grid;
      column-gap: 3rem;
      grid-template-columns: auto auto;
   }
   & .bottom-area {
      display: flex;
      justify-content: end;
      & .submit-bnt {
         border: none;
         border-radius: 8px;
         padding: .7rem 3rem;
         margin-top: 1.5rem;
         cursor: pointer;
         background: var(--active-color);
         color: var(--white);
         &:active {
            opacity: 0.7;
         }
      }
   }
}
</style>