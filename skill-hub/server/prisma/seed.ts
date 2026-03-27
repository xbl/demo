import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 清空数据
  await prisma.skill.deleteMany()
  await prisma.category.deleteMany()

  // 创建分类
  const categories = await Promise.all([
    prisma.category.create({
      data: { id: 'dev', name: '开发工具', icon: '🛠️', count: 0 }
    }),
    prisma.category.create({
      data: { id: 'ai', name: 'AI 智能', icon: '🤖', count: 0 }
    }),
    prisma.category.create({
      data: { id: 'media', name: '多媒体', icon: '🎨', count: 0 }
    }),
    prisma.category.create({
      data: { id: 'productivity', name: '效率提升', icon: '⚡', count: 0 }
    }),
    prisma.category.create({
      data: { id: 'data', name: '数据分析', icon: '📊', count: 0 }
    }),
    prisma.category.create({
      data: { id: 'security', name: '安全合规', icon: '🔒', count: 0 }
    })
  ])

  console.log('✅ 分类创建完成')

  // 创建 Skills
  const skills = [
    {
      name: 'Weather Query',
      description: '获取全球天气信息和天气预报，支持多种语言和地区',
      author: 'CloudTeam',
      tags: JSON.stringify(['天气', 'API', '实用工具']),
      icon: '🌤️',
      downloads: 12500,
      stars: 892,
      featured: true,
      categoryId: 'productivity'
    },
    {
      name: 'Document Parser',
      description: '智能解析 PDF、Word、Excel 等文档，提取关键信息并转换为结构化数据',
      author: 'AI Labs',
      tags: JSON.stringify(['文档', 'AI', 'OCR']),
      icon: '📄',
      downloads: 8920,
      stars: 654,
      featured: true,
      categoryId: 'ai'
    },
    {
      name: 'Video Editor',
      description: '视频剪辑、添加字幕、特效处理一站式完成，支持多种格式',
      author: 'MediaPro',
      tags: JSON.stringify(['视频', '多媒体', '编辑']),
      icon: '🎬',
      downloads: 6540,
      stars: 421,
      featured: true,
      categoryId: 'media'
    },
    {
      name: 'Code Review',
      description: '自动代码审查，提供优化建议和最佳实践，提升代码质量',
      author: 'DevTools',
      tags: JSON.stringify(['开发', '代码', '审查']),
      icon: '👀',
      downloads: 9870,
      stars: 756,
      featured: true,
      categoryId: 'dev'
    },
    {
      name: 'Image Understanding',
      description: '强大的图像理解能力，识别物体、场景、文字等',
      author: 'VisionAI',
      tags: JSON.stringify(['图像', 'AI', '识别']),
      icon: '🖼️',
      downloads: 15230,
      stars: 1102,
      featured: true,
      categoryId: 'ai'
    },
    {
      name: 'Data Analyzer',
      description: '数据分析工具，支持 CSV、JSON、Excel 等格式',
      author: 'DataWorks',
      tags: JSON.stringify(['数据', '分析', '可视化']),
      icon: '📊',
      downloads: 7650,
      stars: 543,
      featured: false,
      categoryId: 'data'
    },
    {
      name: 'Security Scanner',
      description: '安全漏洞扫描，检测常见安全问题',
      author: 'SecTeam',
      tags: JSON.stringify(['安全', '扫描', '合规']),
      icon: '🔒',
      downloads: 4320,
      stars: 312,
      featured: false,
      categoryId: 'security'
    },
    {
      name: 'API Tester',
      description: 'API 接口测试工具，支持 REST 和 GraphQL',
      author: 'APIFox',
      tags: JSON.stringify(['API', '测试', '开发']),
      icon: '🔌',
      downloads: 11890,
      stars: 867,
      featured: false,
      categoryId: 'dev'
    }
  ]

  for (const skillData of skills) {
    await prisma.skill.create({
      data: skillData
    })
  }

  console.log('✅ Skills 创建完成')
  
  // 更新分类计数
  for (const category of categories) {
    const count = await prisma.skill.count({
      where: { categoryId: category.id }
    })
    await prisma.category.update({
      where: { id: category.id },
      data: { count }
    })
  }

  console.log('✅ 分类计数更新完成')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
