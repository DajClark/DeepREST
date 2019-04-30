<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="endpoint">
                <h2><span v-text="$t('deepRestApp.endpoint.detail.title')">Endpoint</span> {{endpointID}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('deepRestApp.endpoint.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{endpoint.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('deepRestApp.endpoint.details')">Description</span>
                    </dt>
                    <dd>
                        <span>{{endpoint.details}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="node.id" :to="{name: 'EndpointEdit', params: {nodeId: node.id, endpointId: endpointID}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./endpoint-details.component.ts">
</script>
