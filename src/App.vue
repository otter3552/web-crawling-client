<template>
  <v-app>
    <v-app-bar
      app
      dark
      elevation="0"
      style="background-color : white; border-bottom : 1px solid black; color : black;"
    >
      <div class="d-flex align-center" style="color : red">
        <v-text-field 
          class="pt-6"
          background-color="#293042" 
          
          placeholder="search process" 
          outlined
          dense
          ></v-text-field>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>


    <v-navigation-drawer
      v-model="drawer"
      app
      style="background-color : #293042; color : white;"
    >
      <!-- <v-img
        alt="CI"
        class="shrink mt-4 mb-4"
        contain
        src="./assets/CI.png"
        transition="scale-transition"
        width="200"
      /> -->
      <v-treeview
        v-model="tree"
        :items="items"
        :open="initiallyOpen"
        activatable
        item-key="name"
        open-on-click
        color="#8f929c"
        style="color : #8f929c;"
      >
      
        <template style="color: white;" v-slot:label="{ item }" >
          <!-- <v-icon v-if="!item.file" color="white">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon> -->
          
          <span v-if="item.children !==undefined"> {{item.name}}</span>
          <div v-if="item.children ===undefined" class="tttt" :style="`width: 100%; height : auto; ${item.isSelected ? 'color : #568fed' : 'color :#8f929c'}`" @click="onClickmenu(item)">
             {{item.name}}
          </div>
        </template>
      </v-treeview>
    </v-navigation-drawer>
    <v-main>
      <keep-alive>
        <component v-if="selectedMenu !=null" v-bind:is="selectedMenu.component"></component>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
import processView from './components/ProcessView.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    processView
  },
  data: () => ({
    drawer : true,
    initiallyOpen: ['프로세스 관리'],
    selectedMenu: null,
    tree : [],
    items: [
      {
        name: '프로세스 관리',
        children: [
          {
            name: '진행도 관리',
            isSelected : true,
            component : () => import('../src/components/ProcessView.vue')
          },
        ]
      },
      {
        name: '프로퍼티 관리',
        isSelected : false
      },
      {
        name: '메모리 관리',
        children: [
          {
            name: 'memory Menu1',
            isSelected : false,
            component : () => import('./views/MNG/MNG001.vue')
          },
          {
            name: 'memory Menu2',
            isSelected : false
          },
          {
            name: 'memory Menu3',
            isSelected : false
          },
        ],
      },      
    ],
  }),
  mounted(){
    this.selectedMenu = this.items[0].children[0]
    // axios.post('/',{
    //   params: {
    //     foo: 'bar'
    //   }
    //   }).then((response) => {
    //     console.log('response = ',response)
    //   }).catch( (e) =>{
    //     console.log('error = ',e)
    //   })
  },
  methods:{
   
    async onClickmenu(item){
      if(item.component !==undefined){
        
        this.selectedMenu = item
      }
      this.items.forEach(item =>{
        item.isSelected = false
        if(item.children !==undefined){
          item.children.forEach(child =>{
            child.isSelected = false
          })
        }
      })
      
      item.isSelected = true
      
    }
  }
};
</script>
<style>
.mdi-menu-down{
  color: #e9ecef !important;
}

.v-treeview-node__root{
  color: #e9ecef !important;
}

.v-treeview-node__children .v-treeview-node__label{
  color: #8f929c;
}
</style>