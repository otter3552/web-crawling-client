<template>
  <v-container>
    <v-subheader>
      프로세스 관리 > 진행도 관리
    </v-subheader>
    <v-card elevation="0" style="border : 1px solid gray">
      <v-list>
        <v-list-group
          v-for="(item,index) in items"
          :key="item.title"
          :value="item.active"
          no-action
          
          :style="`${index < items.length-1 ? 'border-bottom : 1px solid gray;' : ''} `"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-row>
                <v-col cols="2">
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-col>
                <v-col cols="10">
                  <v-progress-linear
                    :value="item.value"
                    rounded
                    height="20"
                    color="#3f80ea"
                  >
                    <strong>{{ Math.ceil(item.value) }}%</strong>
                  </v-progress-linear>              
                  <span v-if="item.value <100" style="line-height :25px;">진행중...</span>    
                </v-col>
              </v-row>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="child in item.items"
            :key="child.title"
          >
            <v-list-item-content>
              <v-list-item-title v-text="child.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>  
        </v-list-group>        
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {  
  data: () => ({
    value: 10,
    items: [
        {
          title: 'process1',
          items: [{ title: 'process1-1' }],
          value:0,
          active: false
        },
        {
          title: 'process2',
          items: [
            { title: 'process2-1' },
            { title: 'process2-2' },
            { title: 'process2-3' },
          ],
          value:0,
          active: false
        },
        {
          title: 'process3',
          items: [{ title: 'process3-1' }],
          value:0,
          active: false
        },
        {
          title: 'process4',
          items: [{ title: 'process4-1' }],
          value:0,
          active: false
        },
        {
          title: 'process5',
          items: [{ title: 'process5-1' }],
          value:0,
          active: false
        },
        {
          title: 'process6',
          items: [
            { title: 'process6-1' },
            { title: 'process6-2' },
            { title: 'process6-3' },
          ],
          value:0,
          active: false
        },
        {
          title: 'process7',
          items: [
            { title: 'process7-1' },
            { title: 'process7-2' },
            { title: 'process7-3' },
          ],
          value:0,
          active: false
        },
      ],
  }),
  mounted () {
    this.startBuffer()
  },
  methods: {
    async onClickListItem(item){
      item.active = true
    },
    async startBuffer(){
      this.interval = setInterval(() => {

        this.items.forEach( item =>{
          if(item.value<100){
            item.value += Math.random() * (15 - 5) + 5
          }

          if(item.value > 100){
            item.value = 100
          }
          
        })


        this.value += Math.random() * (15 - 5) + 5
        if( this.value >100){
          this.value = 0
        }
      }, 2000)
    }
  },
  watch: {
    
  },

}
</script>
