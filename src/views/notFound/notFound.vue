<template>
   <div class="not-found">
      <img src="../../assets/icons/404-not-found.gif" alt="not-found">
      <button class="button" @click="$router.push({name: 'Dashboard'})">
         Ana sayfa
      </button>
   </div>
</template>

<script>
export default {
   name: "notFound"
}
</script>

<style scoped lang="scss">
.not-found {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 2rem;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   & img {
      width: 620px;
      border-radius: 12px;
   }
   & .button {
      border: none;
      border-radius: 8px;
      padding: .7rem 3rem;
      margin-top: 1.5rem;
      cursor: pointer;
      background: var(--green);
      color: var(--white);
      &:active {
         opacity: 0.7;
      }
   }
}
</style>