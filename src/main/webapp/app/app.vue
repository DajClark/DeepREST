<template>
  <div id="app">
    <div id="app-header">
      <jhi-navbar></jhi-navbar>
    </div>
      <div class="d-flex flex-container">
          <div><sidebar></sidebar></div>
          <div class="p-5 flex-fill router-view"><router-view :key="$route.fullPath" class="flex-grow-1"></router-view></div>
      </div>

      <b-modal id="login-page" hide-footer lazy>
        <span slot="modal-title" id="login-title" v-text="$t('login.title')">Sign in</span>
        <login-form></login-form>
      </b-modal>

      <!--<jhi-footer class="fixed-bottom"></jhi-footer>-->
  </div>
</template>

<script lang="ts" src="./app.component.ts">
</script>
