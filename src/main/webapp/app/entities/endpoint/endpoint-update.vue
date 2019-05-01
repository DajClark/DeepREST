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

                    <b-dropdown id="dropdown-2" text="Select Plugin" class="m-md-4">
                        <b-dropdown-item v-for="(plugin, key) in plugins" v-on:click="getPlugin(key)">{{plugin.name}} - {{plugin.details}}</b-dropdown-item>
                    </b-dropdown>

                    <div v-if="currentPlugin.name">
                        <h1>{{currentPlugin.name}}</h1>
                        <b-card>
                            <b-tabs pills card vertical>
                                <b-tab title="GET" active>
                                    <div v-for="param in currentPlugin.params" class="form-group">
                                        <label class="form-control-label" for="get-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="getRequest" id="get-param-name" />
                                    </div>
                                </b-tab>
                                <b-tab title="POST">
                                    <div v-for="param in currentPlugin.params" class="form-group">
                                        <label class="form-control-label" for="post-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="postRequest" id="post-param-name"/>
                                    </div>
                                </b-tab>
                                <b-tab title="PUT">
                                    <div v-for="param in currentPlugin.params" class="form-group">
                                        <label class="form-control-label" for="put-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="putRequest" id="put-param-name" />
                                    </div>
                                </b-tab>
                                <b-tab title="PATCH">
                                    <div v-for="param in currentPlugin.params" class="form-group">
                                        <label class="form-control-label" for="patch-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="patchRequest" id="patch-param-name" />
                                    </div>
                                </b-tab>
                                <b-tab title="DELETE">
                                    <div v-for="param in currentPlugin.params" class="form-group">
                                        <label class="form-control-label" for="patch-param-name">{{param.name}}</label>
                                        <input type="text" class="form-control" name="deleteRequest" id="delete-param-name" />
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
