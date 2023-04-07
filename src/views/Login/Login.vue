<template>
   <form class="login-container" @submit.prevent="login">
      <span class="title">LOGIN</span>
      <Input label="E-posta" placeholder="abc@xyz.com" v-model="email" type="email" />
      <Input label="Şifre" placeholder="Şifre" v-model="password" type="password" />
      <div class="error" v-if="errMsg">
         Hata: {{ errMsg }}
      </div>
      <button class="submit-btn" type="submit" :disabled="!checkInput">
         Giriş yap
      </button>
   </form>
</template>

<script setup>
import { ref, computed } from 'vue';
import Input from "@/components/Input.vue";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router'

const router = useRouter();

const email = ref('');
const password = ref('');
const errMsg = ref();

const checkInput = computed(() => {
   return !!email.value.length && !!password.value.length
})

async function login() {
   const auth = getAuth();
   try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      auth.currentUser;
      await router.push({name: 'Dashboard'})
   } catch (error) {
      switch (error.code) {
         case ("auth/invalid-email"):
            errMsg.value = 'Geçersiz e-posta adresi';
            break;
         case ("auth/wrong-password"):
            errMsg.value = 'Hatalı şifre';
            break;
         case ("auth/user-not-found"):
            errMsg.value = 'Kullanıcı bulunamadı';
            break;
         default:
            errMsg.value = 'E-posta veya şifre hatalı';
            break;
      }
   }
}

</script>

<style scoped lang="scss">
.login-container {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background: var(--content-bg);
   border: 1px solid var(--border);
   border-radius: 8px;
   padding: 1.5rem 2rem;
   min-width: 380px;
   display: flex;
   flex-direction: column;
   align-items: center;
   & .title {
      font-size: 1.5rem;
      font-weight: 600;
   }
   & .submit-btn {
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
         opacity: 0.4;
         cursor: not-allowed;
      }
   }
   & .error {
      color: #E21818;
   }
}
</style>