<template>
   <div class="shipments">
      <div v-if="!!data.length" class="shipments__header">
         <div class="left">
            <span class="title">
               Nakliyeler
               <span class="separator" />
               <button class="add-new-btn" @click="router.push({name: 'AddShipment'})">
                  Yeni Ekle
               </button>
            </span>
            <small class="description">{{`Toplam ${dummyData.shipments.length} Nakliye`}}</small>
         </div>
         <span class="right">
            Toplam Net Kâr: <span class="price">{{ totalProfit }}</span>
         </span>
      </div>
      <div v-if="!!data.length" class="table-container">
         <Table :columns="columns" :data="data">
            <template #actions="{data}">
               <div class="actions">
                  <span class="detail" @click="showDetail(data)">
                     <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                  </span>
                  <span class="remove" @click="removeShipment(data)">
                     <font-awesome-icon icon="fa-solid fa-trash" />
                  </span>
               </div>
            </template>
         </Table>
      </div>
      <div class="no-data">
         <span class="title">
            Nakliye bulunmamaktadır. Aşağıda ki butona tıklayarak yeni nakliye ekleyebilrisiniz.
         </span>
         <button class="add-new-btn" @click="router.push({name: 'AddShipment'})">
            Nakliye Ekle
         </button>
      </div>
   </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import Table from "@/components/Table.vue";
import dummyData from '@/resources/dummyData.json';
import { useRouter } from "vue-router";
import { formatUsd } from '@/utils/helpers'
import { db } from '@/config/firebaseConfig'
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const router = useRouter();

const columns = [
   {
      key: 'company_name',
      title: 'Firma İsmi',
      width: '220px',
      textAlign: 'center',
      verticalAlign: 'middle',
      titleTextAlign: 'center',
      titleVerticalAlign: 'middle',
   },
   {
      key: 'shipment_date',
      title: 'Tarih',
      width: '220px',
      textAlign: 'center',
      verticalAlign: 'middle',
      titleTextAlign: 'center',
      titleVerticalAlign: 'middle',
   },
   {
      key: 'shipment_price',
      title: 'Nakliye Ücret',
      width: '220px',
      textAlign: 'center',
      verticalAlign: 'middle',
      titleTextAlign: 'center',
      titleVerticalAlign: 'middle',
   },
   {
      key: 'payment_received',
      title: 'Alınan Ücret',
      width: '220px',
      textAlign: 'center',
      verticalAlign: 'middle',
      titleTextAlign: 'center',
      titleVerticalAlign: 'middle',
   },
   {
      key: 'remaining_debt',
      title: 'Kalan Ücret',
      width: '220px',
      textAlign: 'center',
      verticalAlign: 'middle',
      titleTextAlign: 'center',
      titleVerticalAlign: 'middle',
   },
   {
      key: 'shipment_cost',
      title: 'Masraflar',
      width: '300px',
      textAlign: 'center',
      verticalAlign: 'middle',
      titleTextAlign: 'center',
      titleVerticalAlign: 'middle',
   },
   {
      key: 'profit',
      title: 'Net Kâr',
      width: '350px',
      textAlign: 'center',
      verticalAlign: 'middle',
      titleTextAlign: 'center',
      titleVerticalAlign: 'middle',
   },
   {
      key: 'actions',
      title: 'Aksiyonlar',
      width: '180px',
      scopedSlot: 'actions',
      textAlign: 'center',
      verticalAlign: 'middle',
      titleTextAlign: 'center',
      titleVerticalAlign: 'middle',
   },

]

const data = ref([])

onMounted(async () => {
   await getShipments();
})

const getShipments = async () => {
   const response = await getDocs(collection(db, "shipments"));
   let shipments = []
   response.forEach((doc) => {
      const shipment = {
         id: doc.id,
         company_name: doc.data().company_name,
         shipment_date: doc.data().shipment_date,
         shipment_price: formatUsd(doc.data().shipment_price || 0),
         payment_received: formatUsd(doc.data().payment_received || 0),
         remaining_debt: formatUsd((doc.data().shipment_price - doc.data().payment_received) || 0),
         shipment_cost: formatUsd(doc.data().shipment_cost || 0),
         profit: formatUsd(doc.data().shipment_price - doc.data().shipment_cost || 0),
      }
      shipments.push(shipment);
   });
   data.value = shipments
}

const totalProfit = computed(() => {
   const total = (data.value || []).reduce((acc, val) => {
      const profit = Number(val.profit.replace('$ ', ''));
      return acc + profit
   }, 0)
   return `${formatUsd(total || 0)}`
});

const showDetail = (shipment) => {
   router.push({name: 'AddShipment', query: {id: shipment.id}});
}

const removeShipment = async (shipment) => {
   if(confirm(`${shipment.company_name} firmaya ait nakliyeyi silmek istediğinizden emin misiniz?`)) {
      await deleteDoc(doc(db, "shipments", shipment.id));
      await getShipments();
   } else {
      return false;
   }
}
</script>

<style scoped lang="scss">
.shipments {
   border: 1px solid var(--border);
   padding: 3rem 1.5rem;
   border-radius: .5rem;
   background: var(--content-bg);
   overflow: auto;
   &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & .left {
         display: flex;
         flex-direction: column;
         gap: 1rem;
         & .title {
            font-size: 1.5rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            & .separator {
               display: inline-block;
               margin: 0 12px;
               width: 1px;
               height: 32px;
               background: var(--secondary);
            }
         }
         & .description {
            color: var(--secondary)
         }
      }
      & .right {
         display: flex;
         flex-direction: column;
         color: var(--secondary);
         & .price {
            font-weight: 700;
            font-size: 2rem;
            color: var(--primary)
         }
      }
   }
   & .table-container {
      margin-top: 1.5rem;
      & .actions {
         display: flex;
         justify-content: center;
         align-items: center;
         gap: 1rem;
         & .detail:hover {
            cursor: pointer;
            color: var(--green);
         }
         & .remove:hover {
            cursor: pointer;
            color: var(--danger);
         }
      }
   }
   & .no-data {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      padding: 5rem 2rem;
      text-align: center;
      justify-content: center;
      align-items: center;
      & .title {
         color: var(--secondary);
      }
   }
}

.add-new-btn {
   border: none;
   border-radius: 8px;
   padding: 0.5rem 1rem;
   cursor: pointer;
   background: var(--active-color);
   color: var(--white);
   &:active {
      opacity: 0.7;
   }
}
</style>