/* eslint-disable */
export default class ChartData {

   /**
   * ChartData 컴포넌트의 모델형태
   * @param {labels} labels = Array
   * @param {datasets} datasets = Array<{ label: String, data: Array}>
   */

  constructor(labels = [], datasets = [ ]){
    this.labels = labels
    this.datasets = datasets
  }

  addDataset(data){
    this.datasets.push(data)
  }

  addLabel(data){
    this.labels.push(data)
  }
}