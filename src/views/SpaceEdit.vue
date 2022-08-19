<template>
  <el-row>
    <el-col :span="8">
      <el-button @click="showCreateSpace = true" type="primary" size="small">{{$t('message.createSpace')}}</el-button>
      <el-divider/>
      <rootSpaceTree
        v-if="rootSpaces"
        :rootSpaces="rootSpaces"
        @node-selected="nodeSelected"
      ></rootSpaceTree>
    </el-col>
    <el-col :span="16">
      <editRootSpace
        v-if="rootSpaces && spaceTypes && selectedSpace"
        :rootSpaces="rootSpaces"
        :spaceTypes="spaceTypes"
        :selectedSpace="selectedSpace"
        @update-space="updateSpace"
        @emit-close="unselectSpace"
        @delete-space="deleteSpace"
      >
      </editRootSpace>
      <createRootSpace
        v-if="rootSpaces && spaceTypes && showCreateSpace"
        :rootSpaces="rootSpaces"
        :spaceTypes="spaceTypes"
        @emit-close="showCreateSpace = false"
        @create-space="createSpace"
      >
      </createRootSpace>
    </el-col>
    <el-col :span="8">
      <div>Column 3</div>
    </el-col>
  </el-row>


</template>

<script>
import { userStore } from './../stores/user.js'
import { reservationStore } from './../stores/reservation.js'
import _ from 'lodash'
import api from './../api/api.js'
import RootSpaceTree from './../components/rootSpaceTree.vue'
import editRootSpace from './../components/editRootSpace.vue'
import createRootSpace from './../components/createRootSpace.vue'
export default {
    name: 'SpaceEdit',
    components: { editRootSpace, RootSpaceTree, createRootSpace },
    data() {
      return {
        selectedSpace: null,
        showCreateSpace: false
      };
    },
    computed: {
        jwt() {
            return userStore().jwt;
        },
        rootSpaces () {
          return _.cloneDeep(reservationStore().getRootSpaces)
        },
        spaceTypes () {
          return reservationStore().spaceTypes
        },
        user() {
            return userStore().account;
        }
    },
    created() {
    },
    methods: {
        createSpace( spaceObj ) {
            console.log('cs', spaceObj);
            api.engine.createSpace( spaceObj, this.jwt ).then( (response) => {
              if(response.data.execute > 0){
              const sorted = _.sortBy(response.data.rootSpacesWithChildrenAndParents, 'show_order')
              reservationStore().setResSpacesFromObj(sorted) 
              } else {
                //error
                alert('error')
              }
            })
        },
        deleteSpace ( space ) {
          console.log('d:', space )
          api.engine.deleteSpace ( space.id, this.jwt ).then( (response) => {
            if(response.data.execute == true){
            const sorted = _.sortBy(response.data.rootSpacesWithChildrenAndParents, 'show_order')
            reservationStore().setResSpacesFromObj(sorted) 
            } else {
              //error
            }
          })
        },
        nodeSelected ( rootSpace ) {
          this.selectedSpace = rootSpace
        },
        unselectSpace () {
          this.selectedSpace = null
        },
        updateSpace ( uSpace ) {
          console.log('uSpace on parent', uSpace)
          api.engine.updateSpace( uSpace, userStore().jwt ).then( (response) => {
            console.log(response.data)
            const sorted = _.sortBy(response.data.rootSpacesWithChildrenAndParents, 'show_order')
            reservationStore().setResSpacesFromObj(sorted)
          })

        }
    }
}
</script>