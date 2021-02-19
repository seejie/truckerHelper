import {baseUrl} from '../lib/config'

export const api = {
  // 登录验证
  login: `${baseUrl}/Login?code=`,
  // 图片上传
  uploadImg: `${baseUrl}/UploadImage`,
  // 保存录入信息
  submitUserInfo: `${baseUrl}/UpdateDriverInfo`,
  // 查询培训题目
  getTrainingData: `${baseUrl}/LoadExamConfig?driverId=`,
  // 查询考试题目
  getExamData: `${baseUrl}/LoadExamConfig?driverId=`,
  // 提交考试答案
  submitAnswer: `${baseUrl}/UpdateExam`,
  // 添加订单
  submitOrder: `${baseUrl}/BindOrder?driverId=`,
  // 获取订单信息
  getOrderInfo: `${baseUrl}/LoadOrderStatus?driverId=`,
  // 获取物料明细
  getMaterialDetail: `${baseUrl}/LoadOrder?driverId=`,
  // 轮训上报实时位置、是否发生转运
  reportLocation: `${baseUrl}/UpdateGPS?driverId=`,
  // 系统配置
  sysConfig: `${baseUrl}/LoadConfig?driverId=`,
  // 获取用户真实信息
  getUserRealInfo: `${baseUrl}/`
}
