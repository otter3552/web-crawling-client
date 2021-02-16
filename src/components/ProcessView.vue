<template>
  <v-container>
    <v-subheader>
      프로세스 관리 > 진행도 관리
    </v-subheader>
    <v-card elevation="0" style="border : 1px solid gray">
      <v-list >
        <v-list-group
          v-for="(item,index) in items"
          :key="item.title"
          :value="item.active"
          no-action
          
          :style="`${index < items.length-1 ? 'border-bottom : 1px solid gray;' : ''} `"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-row @click="renderProcessChart(index)">
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
          <!-- 리스트 클릭하면 열리는 토글 영역 start-->
          <v-row>
            <v-col cols="2"/>
            <v-col cols="7">
              <span v-for="(datset,index) in item.chartData.datasets"
                    :key="index"
                    style="color : black; margin-left : 5px;">{{datset.label}}, &nbsp;</span>
            </v-col>
            <v-col cols="3">
              <v-btn color="#1976d2" small @click="onClickPorpertyAddbtn(index)" style="padding-right : 3px; margin-right : 5px;">property 추가</v-btn>
              <v-btn color="error" small @click="onClickPorpertyRemovebtn(index)" style="padding-right : 3px; margin-right : 5px;">property 삭제</v-btn>
            </v-col>
          </v-row>
          <br>
          <!-- 리스트 클릭하면 열리는 토글 영역 end-->
        </v-list-group>        
      </v-list>
    </v-card>


    <v-dialog
      v-model="propertyDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          property Add
        </v-card-title>
          <div style="width: 100%; height : 80px; text-align :center;" >
            <v-text-field v-model="propertyName" outlined dense style="margin-top: 40px; margin-left : 40px; width: 50%;"></v-text-field>
          </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
         
          <v-btn
            color="primary"
            text
            @click="addProPerty"
          >
            I accept
          </v-btn>
          <v-btn
            color="gray"
            text
            @click="closePopup"
          >
            취소
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="propertyRemoveDialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          property remove
        </v-card-title>
          <div style="width: 100%; height : 80px; text-align :center;" >
            <v-select v-if="selectedListIndex > -1 && items[selectedListIndex].chartData !== undefined "
                      v-model="removeProPertyItem"
                      :items="items[selectedListIndex].chartData.datasets" 
                      item-value="label"
                      item-text="label"
                      outlined
                      dense 
                      style="margin-top: 40px; margin-left : 40px; width: 50%; color : gray !important;"></v-select>
          </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
         
          <v-btn
            color="error"
            text
            @click="removeProPerty"
          >
            삭제
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="closeRemovePopup"
          >
            취소
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <line-chart v-if="getSelectedChartData != null" :width="400" :height="400" :chart-data="getSelectedChartData" ></line-chart> 

    
  </v-container>
</template>

<script>
/* eslint-disable */
import ChartData from '../models/ChartData.js'
import Reactive from './charts/Reactive.vue'
export default {  
  components: {
    Reactive
  },
  data: () => ({
    value: 10,
    render: true,
    propertyDialog : false,
    propertyRemoveDialog : false,
    propertyName: '',
    selectedListIndex: -1,
    removeProPertyItem : '',
    datacollection: {},
    items: [
        {
          title: 'process1',
          value:0,
          active: false,
          chartData: new ChartData([],[{label : 'property1', data: []}]) 
        },
        {
          title: 'process2',
          value:0,
          active: false,
          chartData: new ChartData([],[{label : 'property1', data: []}]) 
        },
        {
          title: 'process3',
          items: [{ title: 'process3-1' }],
          value:0,
          active: false,
          chartData: new ChartData([],[{label : 'property1', data: []}]) 
        },
        {
          title: 'process4',
          items: [{ title: 'process4-1' }],
          value:0,
          active: false,
          chartData: new ChartData([],[{label : 'property1', data: []}]) 
        },
        {
          title: 'process5',
          items: [{ title: 'process5-1' }],
          value:0,
          active: false,
          chartData: new ChartData([],[{label : 'property1', data: []}]) 
        },
        {
          title: 'process6',
          items: [
            { title: 'process6-1' },
            { title: 'process6-2' },
            { title: 'process6-3' },
          ],
          value:0,
          active: false,
          chartData: new ChartData([],[{label : 'property1', data: []}]) 
        },
        {
          title: 'process7',
          items: [
            { title: 'process7-1' },
            { title: 'process7-2' },
            { title: 'process7-3' },
          ],
          value:0,
          active: false,
          chartData: new ChartData([],[{label : 'property1', data: []}]) 
        },
      ],
      selectedChartData: null,
      realTimeUpdateMethods: null
  }),
  created(){
    this.startBuffer()
  },
  mounted(){
    this.items.forEach(item =>{
      let currentTime = new Date()
      item.chartData = new ChartData([],[{label : 'property1', data: []}])
      let count = Math.floor( Math.random() * 3)+1
      
      for(let i=0 ; i<count; i++){
        item.chartData.addDataset({label : 'property'+(item.chartData.datasets.length+1) , data: []})
      }
      
      for(let i = 0; i<12; i++){
        currentTime.setMinutes(currentTime.getMinutes() -1 )
        item.chartData.addLabel(currentTime.toLocaleString())
        item.chartData.datasets.forEach(dataset =>{
          dataset.data.push(Math.random() * (15 - 5) + 5)
        })
      }
    })
  },
  methods: {
    async closeRemovePopup(){
      this.propertyRemoveDialog = false
      this.selectedChartData = this.items[this.selectedListIndex].chartData
    },
    async removeProPerty(){
      if(confirm('정말로 삭제하시겠습니까 ?')){
        console.log('this.removeProPertyItem = ',this.removeProPertyItem)
        const idx = this.items[this.selectedListIndex].chartData.datasets.findIndex(dataset =>{
          return dataset.label == this.removeProPertyItem
        })

        this.items[this.selectedListIndex].chartData.datasets.splice(idx, 1)
        
      }
      this.propertyRemoveDialog = false
      this.selectedChartData = this.items[this.selectedListIndex].chartData
    },
    async renderProcessChart(index){
      this.selectedChartData = this.items[index].chartData
      

      if(this.realTimeUpdateMethods != null){
        clearInterval(this.realTimeUpdateMethods)
      }
     
      // dataSetCount
      this.realTimeUpdateMethods = setInterval(() => {
        
        let preChartData = this.items[index].chartData.datasets

        this.items[index].chartData = new ChartData([],[])
        
        for(let i = 0; i< preChartData.length; i++){
          let obj = {
            label : preChartData[i].label,
            data: []
          }
          for(let j = 1; j<12; j++){
            obj.data.push(preChartData[i].data[j])
          }
          obj.data.push(Math.random() * (15 - 5) + 5)
          this.items[index].chartData.addDataset(obj)
        }
        // this.items[index].chartData.addDataset([],[{label : , data: []}])
        let currentTime = new Date()

        for(let i = 0; i<12; i++){
          currentTime.setMinutes(currentTime.getMinutes() -1 )
          this.items[index].chartData.addLabel(currentTime.toLocaleString())
          // this.items[index].chartData.datasets.forEach(dataset =>{
          //   dataset.data.push(Math.random() * (15 - 5) + 5)
          // })
        }

        this.items[index].chartData.datasets

        console.log('preChartData = ',preChartData)
        
        this.selectedChartData = this.items[index].chartData
        
      }, 2000)

     
    },
    async closePopup(){
      this.propertyName = ''
      this.propertyDialog = false
      this.selectedChartData = this.items[this.selectedListIndex].chartData
    },
    async addProPerty(){
      let obj = {
        label : '',
        data : []
      }
      obj.label = this.propertyName
      for(let i = 0; i<12; i++){
        obj.data.push(Math.random() * (15 - 5) + 5)
        
      }
      
      this.items[this.selectedListIndex].chartData.addDataset(obj)

      this.propertyName = ''
      this.propertyDialog = false
      
      
      this.selectedChartData = this.items[this.selectedListIndex].chartData
      
      
    },
    async onClickPorpertyRemovebtn(index){
      this.propertyRemoveDialog = true
      this.selectedListIndex = index
      this.selectedChartData = null
    },
    async onClickPorpertyAddbtn(index){
      this.selectedChartData = null
      this.selectedListIndex = index
      this.propertyDialog = true
      
    },
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
    },
  },
  watch: {
    
  },
  computed: {
    getSelectedChartData(){
      
      return this.selectedChartData
    }
  }

}
</script>
<style>
i.v-icon.notranslate.mdi.mdi-menu-down.theme--light{
  color: gray !important;
}
</style>
