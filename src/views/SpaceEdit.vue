<template>
  <h1>SpaceEdit</h1>
  <el-form
    label-width="120px">
    <el-form-item>
      <el-select v-model= selectedSpace placeholder="Select">
        <template v-for="space in rootSpaces">
          <el-option :label="space.title" :value="space.id"></el-option>
        </template>
      </el-select>
    </el-form-item>
  </el-form>
  <el-form
    :model="form" 
    label-width="120px">
    <el-form-item label="Title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="Child Of">
      <el-select v-model="form.childOf" placeholder="Select">
        <template v-for="space in rootSpaces">
          <el-option :label="space.title" :value="space.id" ></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="Type">
      <el-select v-model="form.spaceType">
        <template v-for="spaceType in spaceTypes">
          <el-option :label="spaceType.title" :value="spaceType.id"></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="Sort order">
      <el-input v-model="form.sortOrder"></el-input>
    </el-form-item>
    <el-form-item label="Show children">
      <el-select v-model="form.showChildren" placeholder="Select">
        <el-option label="True" value="1"/>
        <el-option label="False" value="0"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button v-if="formDataComplete" @click="createSpace">Create</el-button>
    </el-form-item>
  </el-form>


</template>

<script>
import { userStore } from './../stores/user.js'
import api from './../api/api.js'
export default {
  name: 'SpaceEdit',
  data () {
    return {
      form: {
        childOf: 0,
        showChildren: null,
        sortOrder: 0,
        title: '',
        spaceType: null
      },
      rootSpaces: {},
      selectedSpace: null,
      spaceTypes: {}
    }
  },
  computed: {
    formDataComplete () {
      if(this.form.title.length > 0 && this.form.spaceType && this.form.showChildren){
        return true
      } else {
        return false
      }
    },
    jwt () {
      return userStore().jwt
    },
    user () {
      return userStore().account
    }
  },
  created () {
    api.engine.getRootSpaces(this.jwt).then( (data) => {
      console.log('rsdata', data)
      this.rootSpaces = data.data.root_spaces
      
    })
    api.engine.getSpaceTypes().then( (data) => {
      console.log(data)
      this.spaceTypes = data.data.space_types
    })
  },
  methods: {
    createSpace () {
      console.log(this.form)
      api.engine.createSpace( this.user, this.jwt, this.form).then( (data) => {

      })
    }
  }
}
</script>