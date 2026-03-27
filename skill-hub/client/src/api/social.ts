import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

export const socialApi = {
  // 获取技能互动统计（点赞数、评论数、是否已点赞）
  getStats: (skillId: string) => 
    api.get(`/social/${skillId}/stats`),
  
  // 点赞/取消点赞
  toggleLike: (skillId: string) => 
    api.post(`/social/${skillId}/like`),
  
  // 获取评论列表
  getComments: (skillId: string) => 
    api.get(`/social/${skillId}/comments`),
  
  // 添加评论
  createComment: (skillId: string, content: string) => 
    api.post(`/social/${skillId}/comments`, { content }),
  
  // 删除评论
  deleteComment: (commentId: string) => 
    api.delete(`/social/comments/${commentId}`)
}

export default api
