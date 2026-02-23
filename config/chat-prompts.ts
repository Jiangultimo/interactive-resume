// AI 聊天助手的 prompt 配置

import { cnPrompts as cnPromptsSource } from './prompts/chat-prompts-cn'
import { enPrompts as enPromptsSource } from './prompts/chat-prompts-en'
import { cnSuggestionsPrompt } from './prompts/chat-prompts-cn'
import { enSuggestionsPrompt } from './prompts/chat-prompts-en'

export interface ChatPromptConfig {
  // 自我介绍的系统提示词
  introSystem: string
  // 自我介绍的用户消息
  introUser: string
  // 聊天的系统提示词
  chatSystem: string
  // 拒绝无关问题的回复模板
  rejectMessage: string
}

// 中文 prompt 配置
export const cnPrompts: ChatPromptConfig = cnPromptsSource

// 英文 prompt 配置
export const enPrompts: ChatPromptConfig = enPromptsSource

// 根据语言获取对应的 prompt 配置
export function getPromptConfig(lang: string): ChatPromptConfig {
  return lang === 'en' ? enPrompts : cnPrompts
}

// 推荐问题配置
export interface SuggestedQuestion {
  id: string
  text: string
  // 优先级：1 = 项目相关（最高），2 = 个人经历相关
  priority: 1 | 2
}

// 中文推荐问题
export const cnSuggestedQuestions: SuggestedQuestion[] = [
  // 项目相关（优先级 1）
  { id: 'projects', text: '主要负责了哪些项目？', priority: 1 },
  { id: 'highlights', text: '项目中有哪些亮点？', priority: 1 },
  { id: 'tech-stack', text: '用到了哪些技术栈？', priority: 1 },
  { id: 'challenges', text: '遇到过哪些技术挑战？', priority: 1 },
  // 个人经历相关（优先级 2）
  { id: 'experience', text: '有多少年工作经验？', priority: 2 },
  { id: 'skills', text: '擅长哪些技术领域？', priority: 2 },
  { id: 'role', text: '期望的职位是什么？', priority: 2 },
]

// 英文推荐问题
export const enSuggestedQuestions: SuggestedQuestion[] = [
  // 项目相关（优先级 1）
  { id: 'projects', text: 'What projects have you worked on?', priority: 1 },
  { id: 'highlights', text: 'What are the project highlights?', priority: 1 },
  { id: 'tech-stack', text: 'What tech stack do you use?', priority: 1 },
  { id: 'challenges', text: 'What technical challenges did you face?', priority: 1 },
  // 个人经历相关（优先级 2）
  { id: 'experience', text: 'How many years of experience?', priority: 2 },
  { id: 'skills', text: 'What are your core skills?', priority: 2 },
  { id: 'role', text: 'What role are you looking for?', priority: 2 },
]

// 获取推荐问题（按优先级排序，最多返回 4 个）- 作为后备
export function getSuggestedQuestions(lang: string): SuggestedQuestion[] {
  const questions = lang === 'en' ? enSuggestedQuestions : cnSuggestedQuestions
  return [...questions].sort((a, b) => a.priority - b.priority).slice(0, 4)
}

// 生成推荐问题的 prompt
export const suggestionsPrompt = {
  cn: cnSuggestionsPrompt,
  en: enSuggestionsPrompt
}

// 填充 prompt 模板中的变量
export function fillPromptTemplate(template: string, variables: Record<string, string>): string {
  let result = template
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(new RegExp(`{{${key}}}`, 'g'), value)
  }
  return result
}
