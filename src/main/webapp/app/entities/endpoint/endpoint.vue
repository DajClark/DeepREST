<template>
    <div>
        <h2>{{node.name}}</h2>
        <hr>
        <br>
        <h2 id="page-heading">
            <span v-text="$t('deepRestApp.endpoint.home.title')" id="endpoint-heading">Endpoints</span>
            <router-link :to="{name: 'EndpointCreate'}" tag="button" id="jh-create-endpoint" class="btn btn-primary float-right jh-create-endpoint create-endpoint">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('deepRestApp.endpoint.home.createLabel')">
                    Create new Endpoint
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
        <h1 class="text-center" v-if="endpoints.length === 0">No Endpoints</h1>
        <div class="table-responsive" v-if="endpoints.length !== 0">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder(getEndpointIndex(endpoint.name))"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('name')"><span v-text="$t('deepRestApp.endpoint.name')">Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('deepRestApp.endpoint.details')">Description</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="endpoint of orderBy(endpoints, propOrder, reverse === true ? 1 : -1)"
                    :key="getEndpointIndex(endpoint.name)">
                    <td>
                        <router-link :to="{name: 'EndpointView', params: {nodeId: node.id, endpointId: getEndpointIndex(endpoint.name)}}">{{getEndpointIndex(endpoint.name)}}</router-link>
                    </td>
                    <td>{{endpoint.name}}</td>
                    <td>{{endpoint.details}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'EndpointView', params: {nodeId: node.id, endpointId: getEndpointIndex(endpoint.name)}}" tag="button" class="btn btn-info btn-sm">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'EndpointEdit', params: {nodeId: node.id, endpointId: getEndpointIndex(endpoint.name)}}"  tag="button" class="btn btn-primary btn-sm">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(getEndpointIndex(endpoint.name))"
                                      class="btn btn-danger btn-sm"
                                      v-b-modal.removeEndpoint>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEndpoint" id="removeEndpoint" >
            <span slot="modal-title"><span id="deepRestApp.endpoint.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-entity-heading" v-bind:title="$t('deepRestApp.endpoint.delete.question')">Are you sure you want to delete this Endpoint?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-endpoint" v-text="$t('entity.action.delete')" v-on:click="removeEndpoint()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./endpoint.component.ts">
</script>

<style>
    @media (max-width: 767px) {
        .create-endpoint {
            width: 85px;
            height: 50px;
        }
    }
</style>
