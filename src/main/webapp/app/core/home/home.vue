<template>
    <div class="home row">
        <div class="col-md-6">
            <h1 class="display-4" v-text="$t('home.hello')">Welcome to DeepREST.</h1>
            <p class="lead" v-text="$t('home.subtitle')">DeepREST is a web application for creating and managing REST services quickly and intuitively. Enjoy!</p>
        </div>

        <div class="col-md-6">

            <login-form></login-form>
            <div>
                <div class="alert alert-success" v-if="authenticated">
                    <span v-if="username" v-text="$t('home.logged.message', { 'username': username})">You are logged in as user "{{username}}"</span>
                </div>

<!--                <div class="alert" v-if="!authenticated">-->
<!--                    <a class="alert-link" v-on:click="openLogin()" v-text="$t('global.messages.info.authenticated.link')">Sign in.</a>-->
<!--                </div>-->
<!--                <div class="alert" v-if="!authenticated">-->
<!--                    <span v-text="$t('global.messages.info.register.noaccount')">You don't have an account yet?</span>&nbsp;-->
<!--                    <router-link class="alert-link" to="/register" v-text="$t('global.messages.info.register.link')">Register a new account</router-link>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./home.component.ts">
</script>

<style scoped>

</style>
