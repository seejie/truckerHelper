import {baseUrl} from '../utils/config'

export const api = {
  // 登录验证
  login: `${baseUrl}/Login?driverId=`,
  // 图片上传
  uploadImg: `${baseUrl}`,
  // 保存录入信息
  submitUserInfo: `${baseUrl}/UpdateDriverInfo`,
  // 查询培训题目
  getTrainingData: `${baseUrl}/LoadExamConfig?driverId=`,
  // 查询考试题目
  getExamData: `${baseUrl}/LoadExamConfig?driverId=`,
  // 提交考试答案
  submitAnswer: `${baseUrl}/UpdateExam`,
  // 添加订单
  submitOrder: `${baseUrl}`,
  // 获取订单信息
  getOrderInfo: `${baseUrl}`,
  // 获取物料明细
  getMaterialDetail: `${baseUrl}`,
  // 确认发车
  confirmDepart: `${baseUrl}`,
  // 轮训上报实时位置、是否发生转运
  reportLocation: `${baseUrl}`,
  // 自动叫号
  autoQueue: `${baseUrl}`,
  // 获取上一单完成信息
  getLastOrderInfo: `${baseUrl}`,
  // 系统配置
  sysConfig: `${baseUrl}/LoadConfig?driverId=`
}
