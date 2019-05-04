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
                <div class="pt-4">

                    <h2 id="deepRestApp.endpoint.home.plugin" v-text="$t('deepRestApp.endpoint.home.plugin')">Plugins</h2>

                    <div>
                        <b-card>
                            <b-tabs pills card vertical>
                                <b-tab title="GET" active>
                                    <h1>{{currentPlugins.getPlugin["name"]}}</h1>
                                    <div v-for="(param, key) in currentPlugins.getPlugin.params" class="form-group">
                                        <label class="form-control-label" for="get-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="getRequest" id="get-param-name" v-model="endpoint.getResource.params[key].second" disabled="disabled"/>
                                    </div>
                                </b-tab>
                                <b-tab title="POST">
                                    <h1>{{currentPlugins.postPlugin["name"]}}</h1>
                                    <div v-for="(param, key) in currentPlugins.postPlugin.params" class="form-group">
                                        <label class="form-control-label" for="post-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="postRequest" id="post-param-name"  v-model="endpoint.postResource.params[key].second" disabled="disabled"/>
                                    </div>
                                </b-tab>
                                <b-tab title="PUT">
                                    <h1>{{currentPlugins.putPlugin["name"]}}</h1>
                                    <div v-for="(param, key) in currentPlugins.putPlugin.params" class="form-group">
                                        <label class="form-control-label" for="put-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="putRequest" id="put-param-name"  v-model="endpoint.putResource.params[key].second" disabled="disabled"/>
                                    </div>
                                </b-tab>
                                <b-tab title="PATCH">
                                    <h1>{{currentPlugins.patchPlugin["name"]}}</h1>
                                    <div v-for="(param, key) in currentPlugins.patchPlugin.params" class="form-group">
                                        <label class="form-control-label" for="patch-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="patchRequest" id="patch-param-name"  v-model="endpoint.patchResource.params[key].second" disabled="disabled"/>
                                    </div>
                                </b-tab>
                                <b-tab title="DELETE">
                                    <h1>{{currentPlugins.deletePlugin["name"]}}</h1>
                                    <div v-for="(param, key) in currentPlugins.deletePlugin.params" class="form-group">
                                        <label class="form-control-label" for="patch-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="deleteRequest" id="delete-param-name"  v-model="endpoint.deleteResource.params[key].second" disabled="disabled"/>
                                    </div>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </div>
                </div>

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
