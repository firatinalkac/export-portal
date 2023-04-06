<template>
<header class="navbar" :class="{ 'border' : checkNavbar }">
   <div class="navbar__left">
      <span @click="router.push({name: 'Dashboard'})" v-if="checkNavbar">
         <font-awesome-icon class="logo" icon="fa-solid fa-truck-fast" />
      </span>
      <div class="links" v-if="checkNavbar">
         <span class="link" v-for="link in props.links" :class="{ 'disabled' : link.disabled, 'active' : route.name === link.name }" :key="link.id" @click="router.push({name: link.name})">
            <font-awesome-icon :icon="`fa-solid fa-${link.icon}`" />
            <span class="link__title">{{link.title}}</span>
         </span>
      </div>
   </div>
   <div class="navbar__right">
      <span @click="toggleDark()" class="theme">
         <font-awesome-icon :class="[isDark ? 'sun' : 'moon']" :icon="`fa-solid fa-${isDark ? 'sun' : 'moon'}`" />
      </span>
      <span @click="handleSignOut" class="sign-out" v-if="checkNavbar">
         <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
      </span>
   </div>
</header>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDark, useToggle } from "@vueuse/core";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const props = defineProps(['links'])

const router = useRouter()
const route = useRoute();

const checkNavbar = computed(() => {
   let isValid;
   if(route.name === 'Login') {
      isValid = false;
   } else if(!!route.meta.notFound) {
      isValid = false;
   } else {
      isValid = true;
   }
   return isValid
})

const isDark = useDark({
   selector: "body",
   attribute: "data-theme",
   valueDark: "dark",
   valueLight: "light"
});

const toggleDark = useToggle(isDark)

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
   auth = getAuth();
   onAuthStateChanged(auth, (user) => {
      isLoggedIn.value = !!user
   })
})

async function handleSignOut() {
   signOut(auth).then(() => {
      router.push({name: 'Login'})
   })
}



</script>

<style scoped lang="scss">
.navbar {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 1.3rem clamp(3vw, 100%, (100vw - 1652px) / 2);
   .border {
      background: var(--content-bg);
      border-bottom: 1px solid var(--border);
   }
   &__left {
      display: flex;
      align-items: center;
      gap: 2rem;
      & .logo {
         font-size: 1.5rem;
         background: linear-gradient(90deg, rgba(96,170,255,1) 0%, rgba(156,93,254,1) 100%);
         border-radius: 8px;
         padding: 10px;
         color: var(--white);
         cursor: pointer;
      }
      & .links {
         display: flex;
         align-items: center;
         gap: 2rem;
         & .link {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            cursor: pointer;
            transition: color 0.3s ease;
            &:hover {
               color: var(--active-color)
            }
            &.active {
               color: var(--active-color)
            }
            &.disabled {
               cursor: not-allowed;
               opacity: 0.5;
            }
            &__title {
               font-weight: 500;
            }
            & > .fa-solid {
               display: flex;
               align-items: center;
               font-size: 20px;
            }
         }
      }
   }
   &__right {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      & .theme {
         cursor: pointer;
         color: var(--theme-icon-color)
      }
      & .sign-out {
         cursor: pointer;
         &:hover {
            color: var(--active-color);
         }
      }
   }
}
</style>