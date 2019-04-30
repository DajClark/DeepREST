<template>
    <b-navbar id="sidebar"  class="sidebar dr-nav-sidebar" v-if="authenticated">
        <b-navbar-nav class="sidebar-head">
            <b-nav-item-dropdown
                id="node-menu"
                active-class="active"
                class="pointer sidebar-dropdown"
                >
                <span slot="button-content"  class="navbar-dropdown-menu" v-on:click="sidebarExpand(), retrieveAllNodes()">
                    <font-awesome-icon icon="hdd"/>
                    <span v-text="$t('sidebar.nodes')">Node</span>
                </span>
                <b-dropdown-item v-for="(value) in nodes" :key="value.id" v-on:click="refreshCurrentNode(parseInt(value.id));">
                    {{value.name}}
                </b-dropdown-item>
            </b-nav-item-dropdown>
            <span class="node-title">{{currentNode.name}}</span>
            <router-link :to="{name: 'Endpoints', params: {nodeId: currentNode.id}}" v-if="currentNode.id != null" class="sidebar-item">
                <span v-on:click="refresh()">
                    <font-awesome-icon icon="th-list"/>
                    <span v-text="$t('sidebar.endpoints')">Endpoints</span>
                </span>
            </router-link>
                <b-nav-item v-if="currentNode.id != null" to="/node/settings">
                    <span>
                        <font-awesome-icon icon="wrench"/>
                        <span v-text="$t('sidebar.settings')">Settings</span>
                    </span>
                </b-nav-item>
        </b-navbar-nav>
        <button type="button" v-on:click="sidebarCollapse()" class="btn btn-collapse">
            <font-awesome-icon icon="arrow-left"/>
        </button>
    </b-navbar>
</template>

<script lang="ts" src="./sidebar.component.ts">
</script>

<style scoped>
    /* ==========================================================================
        Sidebar
        ========================================================================== */

    #sidebar {
        display: flex;
        align-items: stretch;
        min-width: 200px;
        max-width: 200px;
        transition: all 0.2s;
        height: 100%;
    }

    .node-title {
        padding-top: 30px;
    }
    .sidebar-head {
        background-color: #ddd;
        height: 80px;
        width: 100%;
    }

    .b-navbar ul {

    }

    .sidebar {
        height: 100%;
        top: 0 !important;
    }

    #sidebar .navbar-nav {
        padding: 16px;
    }

    .sidebar-dropdown {
        border-bottom: 6px #3e8acc;
    }

    .sidebar ul.navbar-nav {
        padding: 0.5em;
    }

    .sidebar .navbar-nav .nav-item {
        font-size: 1.4em;
    }

    .sidebar a.nav-link {
        font-weight: 400;
    }

    /* ==========================================================================
        Sidebar - Collapsed
        ========================================================================== */

    #sidebar.active {
        min-width: 70px;
        max-width: 70px;
        text-align: center;
    }

    #sidebar.active .navbar-nav .nav-item {
        font-size: 0.9em;
    }

    #sidebar.active ul.navbar-nav {
        padding: 16px 3px;
    }

    .navbar {
        padding: 0;
    }

    #sidebar.active .sidebar-dropdown .dropdown-toggle::after {
        top: auto;
        bottom: 10px;
        right: 50%;
        -webkit-transform: translateX(50%);
        -ms-transform: translateX(50%);
        transform: translateX(50%);
    }

    /* ==========================================================================
    Sidebar - Collapse Button
    ========================================================================== */

    #sidebar .btn-collapse {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        outline: none;
        border: 0;
        background: transparent;
        -webkit-box-shadow: none !important;
        box-shadow: none  !important;
        position: absolute;
        bottom: 0;
        right: 0;
        text-align: center;
        color: #555;
    }

    #sidebar.active .btn-collapse {
        -ms-transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    /* ==========================================================================
        Sidebar - Dropdown
        ========================================================================== */

    .sidebar .dropdown-item.active,
    .sidebar .dropdown-item.active:focus,
    .sidebar .dropdown-item.active:hover {
        background-color: #ccc;
    }

    #sidebar .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }

    /*!* ==========================================================================*/
        /*Sidebar - Media Queries*/
        /*========================================================================== *!*/

    /*@media screen and (min-width: 768px) {*/

    /*}*/

    /*@media screen and (min-width: 768px) and (max-width: 1150px) {*/
        /*span span{*/
            /*display:none;*/
        /*}*/
    /*}*/

    /*@media screen and (max-width: 767px) {*/

    /*}*/

    /*nav li.router-link-active .navbar-dropdown-menu {*/
        /*cursor: pointer;*/
    /*}*/
</style>
