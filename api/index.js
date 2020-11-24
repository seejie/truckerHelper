import {domain} from '../utils/config'

export const api = {
  // 读取配置信息
  getSysConfigInfo: `${domain}`,
  // 获取用户上一次填写信息
  getUserLastTimeSubmitedInfo: `${domain}`,
  // 图片上传
  uploadImg: `${domain}`,
  // 保存录入信息
  submitUserInfo: `${domain}`,
  // 上一次通过考试日期
  getLastTimeOfPassExam: `${domain}`,
  // 查询培训题目
  getTrainingData: `${domain}`,
  // 查询考试题目
  getExamData: `${domain}`,
  // 提交考试答案
  submitAnswer: `${domain}`,
  // 添加订单
  submitOrder: `${domain}`,
  // 获取订单信息
  getOrderInfo: `${domain}`,
  // 获取物料明细
  getMaterialDetail: `${domain}`,
  // 确认发车
  confirmDepart: `${domain}`,
  // 轮训上报实时位置、是否发生转运
  reportLocation: `${domain}`,
  // 自动叫号
  autoQueue: `${domain}`,
  // 获取上一单完成信息
  getLastOrderInfo: `${domain}`,
}
