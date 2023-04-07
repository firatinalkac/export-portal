<template>
   <div class="back-shipments" @click="$router.push({name: 'Shipments'})">
         <font-awesome-icon icon="fa-solid fa-left-long" />
         Nakliyeler
   </div>
   <div class="add-shipment">
      <div class="fields">
         <Input v-model="postBody.company_name" label="Firma adi" />
         <Input v-model="postBody.shipment_date" label="Nakliye tarihi" type="date" />
         <Input v-model="postBody.shipment_price" label="Nakliye ücreti" type="number" />
         <Input v-model="postBody.payment_received" label="Ödenen ücret" type="number" />
         <Input v-model="postBody.shipment_cost" label="Nakliye maliyeti" type="number" />
      </div>
      <div class="bottom-area">
         <button class="submit-bnt" @click="saveShipment" :disabled="formValid">
            Kaydet
         </button>
      </div>
   </div>
</template>

<script setup>
import Input from "@/components/Input.vue";
import { reactive, onMounted, computed } from 'vue';
import { db } from '@/config/firebaseConfig';
import { collection, addDoc, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted( async () => {
   if(!!route.query.id) {
      await getShipment();
   }

})

const postBody = reactive({
   company_name: "",
   shipment_date: "",
   shipment_price: "",
   payment_received: "",
   shipment_cost: "",
})

const formValid = computed(() => {
   return !Object.values(postBody).every((val) => val !== "")
})

const getShipment = async () => {
   const id = route.query.id
   const docRef = doc(db, "shipments", id);
   const docSnap = await getDoc(docRef);
   if (docSnap.exists()) {
      postBody.company_name = docSnap.data().company_name,
      postBody.shipment_date = docSnap.data().shipment_date,
      postBody.shipment_price = docSnap.data().shipment_price,
      postBody.payment_received = docSnap.data().payment_received,
      postBody.shipment_cost = docSnap.data().shipment_cost
   } else {
      console.log("No such document!");
   }
}

const saveShipment = async () => {
   if(!!route.query.id) {
      const shipmentRef = doc(db, "shipments", route.query.id);
      await updateDoc(shipmentRef, postBody);
   } else {
      await addDoc(collection(db, "shipments"), postBody).then(() => {
         postBody.company_name = "",
         postBody.shipment_date = "",
         postBody.shipment_price = "",
         postBody.payment_received = "",
         postBody.shipment_cost = ""
      });
   }
}

</script>

<style scoped lang="scss">
.back-shipments {
   display: flex;
   gap: .7rem;
   align-items: center;
   cursor: pointer;
   margin-bottom: 2rem;
   width: max-content;
   &:hover {
      color: var(--active-color)
   }
}
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
         &:disabled {
            opacity: .5;
            cursor: not-allowed;
         }
      }
   }
}
</style>