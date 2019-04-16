<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('deepRestApp.node.home.title')" id="node-heading">Nodes</span>
            <router-link :to="{name: 'NodeCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-node">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('deepRestApp.node.home.createLabel')">
                    Create new Node
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="table-responsive" v-if="nodes">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('name')"><span v-text="$t('deepRestApp.node.name')">Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('deepRestApp.node.description')">Description</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('ip')"><span v-text="$t('deepRestApp.node.ip')">Ip</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('user')"><span v-text="$t('deepRestApp.node.user')">User</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('password')"><span v-text="$t('deepRestApp.node.password')">Password</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('port')"><span v-text="$t('deepRestApp.node.port')">Port</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="node of orderBy(nodes, propOrder, reverse === true ? 1 : -1)"
                    :key="node.id">
                    <td>
                        <router-link :to="{name: 'NodeView', params: {nodeId: node.id}}">{{node.id}}</router-link>
                    </td>
                    <td>{{node.name}}</td>
                    <td>{{node.description}}</td>
                    <td>{{node.ip}}</td>
                    <td>{{node.user}}</td>
                    <td>{{node.password}}</td>
                    <td>{{node.port}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'NodeView', params: {nodeId: node.id}}" tag="button" class="btn btn-info btn-sm">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'NodeEdit', params: {nodeId: node.id}}"  tag="button" class="btn btn-primary btn-sm">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(node)"
                                   class="btn btn-danger btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="deepRestApp.node.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-node-heading" v-bind:title="$t('deepRestApp.node.delete.question')">Are you sure you want to delete this Node?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-node" v-text="$t('entity.action.delete')" v-on:click="removeNode()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./node.component.ts">
</script>
