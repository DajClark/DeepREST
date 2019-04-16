<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="node">
                <h2><span v-text="$t('deepRestApp.node.detail.title')">Node</span> {{node.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('deepRestApp.node.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{node.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('deepRestApp.node.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{node.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('deepRestApp.node.ip')">Ip</span>
                    </dt>
                    <dd>
                        <span>{{node.ip}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('deepRestApp.node.user')">User</span>
                    </dt>
                    <dd>
                        <span>{{node.user}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('deepRestApp.node.password')">Password</span>
                    </dt>
                    <dd>
                        <span>{{node.password}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('deepRestApp.node.port')">Port</span>
                    </dt>
                    <dd>
                        <span>{{node.port}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="node.id" :to="{name: 'NodeEdit', params: {nodeId: node.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./node-details.component.ts">
</script>
