<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="deepRestApp.node.home.createOrEditLabel" v-text="$t('deepRestApp.node.home.createOrEditLabel')">Create or edit a Node</h2>
                <div>
                    <div class="form-group" v-if="node.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="node.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('deepRestApp.node.name')" for="node-name">Name</label>
                        <input type="text" class="form-control" name="name" id="node-name"
                            :class="{'valid': !$v.node.name.$invalid, 'invalid': $v.node.name.$invalid }" v-model="$v.node.name.$model"  required/>
                        <div v-if="$v.node.name.$anyDirty && $v.node.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.node.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.node.name.minLength" v-bind:value="$t('entity.validation.minlength')">
                                This field is required to be at least 1 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.node.name.maxLength" v-bind:value="$t('entity.validation.maxlength')">
                                This field cannot be longer than 20 characters.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('deepRestApp.node.description')" for="node-description">Description</label>
                        <input type="text" class="form-control" name="description" id="node-description"
                            :class="{'valid': !$v.node.description.$invalid, 'invalid': $v.node.description.$invalid }" v-model="$v.node.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('deepRestApp.node.ip')" for="node-ip">Ip</label>
                        <input type="text" class="form-control" name="ip" id="node-ip"
                            :class="{'valid': !$v.node.ip.$invalid, 'invalid': $v.node.ip.$invalid }" v-model="$v.node.ip.$model"  required/>
                        <div v-if="$v.node.ip.$anyDirty && $v.node.ip.$invalid">
                            <small class="form-text text-danger" v-if="!$v.node.ip.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('deepRestApp.node.user')" for="node-user">User</label>
                        <input type="text" class="form-control" name="user" id="node-user"
                            :class="{'valid': !$v.node.user.$invalid, 'invalid': $v.node.user.$invalid }" v-model="$v.node.user.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('deepRestApp.node.password')" for="node-password">Password</label>
                        <input type="text" class="form-control" name="password" id="node-password"
                            :class="{'valid': !$v.node.password.$invalid, 'invalid': $v.node.password.$invalid }" v-model="$v.node.password.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('deepRestApp.node.port')" for="node-port">Port</label>
                        <input type="number" class="form-control" name="port" id="node-port"
                            :class="{'valid': !$v.node.port.$invalid, 'invalid': $v.node.port.$invalid }" v-model="$v.node.port.$model"  required/>
                        <div v-if="$v.node.port.$anyDirty && $v.node.port.$invalid">
                            <small class="form-text text-danger" v-if="!$v.node.port.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.node.port.number" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.node.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./node-update.component.ts">
</script>
