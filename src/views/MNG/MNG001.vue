<template>
  <v-container>
    <v-subheader>
      메모리 관리 > memoryMenu 1
    </v-subheader>
    
    <line-chart :width="400" :height="100" :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
    {{datacollection}}
  </v-container>
</template>

<script>
/* eslint-disable */


export default {
  components: {

  },
  data () {
    return {
      datacollection: null
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.datacollection = {
        labels: ['A','B','C','D'],
        datasets: [
          {
            label: 'Data1',
            data: [20,50,5,2],
            borderColor : 'red',
            backgroundColor : 'rgba(0, 0, 0, 0.1)'
          },
          {
            label: 'Data2',
            data: [10,25,5,10]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>
