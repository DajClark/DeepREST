<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="deepRestApp.endpoint.home.createOrEditLabel" v-text="$t('deepRestApp.endpoint.home.createOrEditLabel')">Create or edit an Endpoint</h2>
                <div>
                    <div class="form-group" v-if="endpointID">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="endpointID" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('deepRestApp.endpoint.name')" for="endpoint-name">Name</label>
                        <input type="text" class="form-control" name="name" id="endpoint-name"
                               :class="{'valid': !$v.endpoint.name.$invalid, 'invalid': $v.endpoint.name.$invalid }" v-model="$v.endpoint.name.$model"  required/>
                        <div v-if="$v.endpoint.name.$anyDirty && $v.endpoint.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.endpoint.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.endpoint.name.minLength" v-bind:value="$t('entity.validation.minlength')">
                                This field is required to be at least 1 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.endpoint.name.maxLength" v-bind:value="$t('entity.validation.maxlength')">
                                This field cannot be longer than 20 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('deepRestApp.endpoint.details')" for="endpoint-details">Description</label>
                        <input type="text" class="form-control" name="details" id="endpoint-details"
                               :class="{'valid': !$v.endpoint.details.$invalid, 'invalid': $v.endpoint.details.$invalid }" v-model="$v.endpoint.details.$model" />
                    </div>
                </div>
                <div class="pt-4">

                    <h2 id="deepRestApp.endpoint.home.plugin" v-text="$t('deepRestApp.endpoint.home.plugin')">Plugins</h2>

                    <div>
                        <b-card>
                            <b-tabs pills card vertical>
                                <b-tab title="GET" active>
                                    <b-dropdown id="dropdown-2" text="Select Plugin" class="m-md-4">
                                        <b-dropdown-item v-for="(plugin, key) in plugins"v-on:click="setPlugin(0, key)">{{plugin.name}} - {{plugin.details}}</b-dropdown-item>
                                    </b-dropdown>
                                    <h1>{{currentPlugins.getPlugin["name"]}}</h1>
                                    <div v-for="(param, key) in currentPlugins.getPlugin.params" class="form-group">
                                        <label class="form-control-label" for="get-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="getRequest" id="get-param-name" v-model="endpoint.getResource.params[key].second"/>
                                    </div>
                                </b-tab>
                                <b-tab title="POST">
                                    <b-dropdown id="dropdown-2" text="Select Plugin" class="m-md-4">
                                        <b-dropdown-item v-for="(plugin, key) in plugins"v-on:click="setPlugin(1, key)">{{plugin.name}} - {{plugin.details}}</b-dropdown-item>
                                    </b-dropdown>
                                    <h1>{{currentPlugins.postPlugin["name"]}}</h1>
                                    <div v-for="(param, key) in currentPlugins.postPlugin.params" class="form-group">
                                        <label class="form-control-label" for="post-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="postRequest" id="post-param-name"  v-model="endpoint.postResource.params[key].second"/>
                                    </div>
                                </b-tab>
                                <b-tab title="PUT">
                                    <b-dropdown id="dropdown-2" text="Select Plugin" class="m-md-4">
                                        <b-dropdown-item v-for="(plugin, key) in plugins"v-on:click="setPlugin(2, key)">{{plugin.name}} - {{plugin.details}}</b-dropdown-item>
                                    </b-dropdown>
                                    <h1>{{currentPlugins.putPlugin["name"]}}</h1>
                                    <div v-for="(param, key) in currentPlugins.putPlugin.params" class="form-group">
                                        <label class="form-control-label" for="put-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="putRequest" id="put-param-name"  v-model="endpoint.putResource.params[key].second"/>
                                    </div>
                                </b-tab>
                                <b-tab title="PATCH">
                                    <b-dropdown id="dropdown-2" text="Select Plugin" class="m-md-4">
                                        <b-dropdown-item v-for="(plugin, key) in plugins"v-on:click="setPlugin(3, key)">{{plugin.name}} - {{plugin.details}}</b-dropdown-item>
                                    </b-dropdown>
                                    <h1>{{currentPlugins.patchPlugin["name"]}}</h1>
                                    <div v-for="(param, key) in currentPlugins.patchPlugin.params" class="form-group">
                                        <label class="form-control-label" for="patch-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="patchRequest" id="patch-param-name"  v-model="endpoint.patchResource.params[key].second"/>
                                    </div>
                                </b-tab>
                                <b-tab title="DELETE">
                                    <b-dropdown id="dropdown-2" text="Select Plugin" class="m-md-4">
                                        <b-dropdown-item v-for="(plugin, key) in plugins"v-on:click="setPlugin(4, key)">{{plugin.name}} - {{plugin.details}}</b-dropdown-item>
                                    </b-dropdown>
                                    <h1>{{currentPlugins.deletePlugin["name"]}}</h1>
                                    <div v-for="(param, key) in currentPlugins.deletePlugin.params" class="form-group">
                                        <label class="form-control-label" for="patch-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="deleteRequest" id="delete-param-name"  v-model="endpoint.deleteResource.params[key].second"/>
                                    </div>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </div>
                </div>

                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.endpoint.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./endpoint-update.component.ts">
</script>
