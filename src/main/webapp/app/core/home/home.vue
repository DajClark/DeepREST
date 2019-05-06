<template>
    <div class="home row">
        <div class="col-md-6 welcome" v-if="!authenticated">
            <h1 class="display-4" v-text="$t('home.hello')">Welcome to DeepREST.</h1>
            <br>
            <p class="lead" v-text="$t('home.subtitle')">DeepREST is a web application for creating and managing REST services quickly and intuitively. Enjoy!</p>
        </div>

        <div class="col-md-6 shadow" v-if="!authenticated">
            <login-form></login-form>
            <div>
                <div class="alert alert-success" v-if="authenticated">
                    <span v-if="username" v-text="$t('home.logged.message', { 'username': username})">You are logged in as user "{{username}}"</span>
                </div>
            </div>
        </div>
        <div v-if="authenticated">
            <h1>Dashboard</h1>
        </div>
    </div>
</template>

<script lang="ts" src="./home.component.ts">
</script>

<style scoped>
    .welcome {
        padding-top: 10%;
        padding-bottom: 10%;
    }

    .shadow {
        padding-top: 5%;
        padding-bottom: 5%;
        height: 50%;
        -webkit-box-shadow: 3px 3px 5px 6px #444;
        -moz-box-shadow:    3px 3px 5px 6px #444;
        box-shadow:         3px 3px 5px 6px #444;
    }
</style>
