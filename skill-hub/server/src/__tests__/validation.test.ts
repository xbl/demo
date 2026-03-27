import { describe, it, expect } from 'vitest'

describe('API Validation', () => {
  describe('Skill validation', () => {
    const validateSkill = (skill: any): { valid: boolean; errors: string[] } => {
      const errors: string[] = []
      
      if (!skill.name || skill.name.trim() === '') {
        errors.push('Name is required')
      }
      if (skill.name && skill.name.length > 100) {
        errors.push('Name must be less than 100 characters')
      }
      if (!skill.description || skill.description.trim() === '') {
        errors.push('Description is required')
      }
      if (!skill.author || skill.author.trim() === '') {
        errors.push('Author is required')
      }
      if (!skill.categoryId || skill.categoryId.trim() === '') {
        errors.push('Category is required')
      }
      
      return {
        valid: errors.length === 0,
        errors
      }
    }

    it('should validate a valid skill', () => {
      const skill = {
        name: 'Test Skill',
        description: 'A test skill',
        author: 'Test Author',
        categoryId: 'dev'
      }
      
      const result = validateSkill(skill)
      expect(result.valid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject skill without name', () => {
      const skill = {
        description: 'A test skill',
        author: 'Test Author',
        categoryId: 'dev'
      }
      
      const result = validateSkill(skill)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Name is required')
    })

    it('should reject skill without description', () => {
      const skill = {
        name: 'Test Skill',
        author: 'Test Author',
        categoryId: 'dev'
      }
      
      const result = validateSkill(skill)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Description is required')
    })

    it('should reject skill with name too long', () => {
      const skill = {
        name: 'a'.repeat(101),
        description: 'A test skill',
        author: 'Test Author',
        categoryId: 'dev'
      }
      
      const result = validateSkill(skill)
      expect(result.valid).toBe(false)
      expect(result.errors).toContain('Name must be less than 100 characters')
    })
  })

  describe('Comment validation', () => {
    const validateComment = (content: string): { valid: boolean; errors: string[] } => {
      const errors: string[] = []
      
      if (!content || content.trim() === '') {
        errors.push('Content is required')
      }
      if (content && content.length > 500) {
        errors.push('Content must be less than 500 characters')
      }
      
      return {
        valid: errors.length === 0,
        errors
      }
    }

    it('should validate a valid comment', () => {
      const result = validateComment('Great skill!')
      expect(result.valid).toBe(true)
    })

    it('should reject empty comment', () => {
      const result = validateComment('')
      expect(result.valid).toBe(false)
    })

    it('should reject comment too long', () => {
      const result = validateComment('a'.repeat(501))
      expect(result.valid).toBe(false)
    })
  })

  describe('SKILL.md format validation', () => {
    const validateSkillMd = (content: string): { valid: boolean; errors: string[] } => {
      const errors: string[] = []
      
      if (!content || content.trim() === '') {
        return { valid: true, errors: [] } // SKILL.md is optional
      }
      
      // Check for required sections
      const hasName = content.includes('name:')
      const hasDescription = content.includes('description:')
      const hasObjective = content.includes('<objective>')
      
      if (!hasName) {
        errors.push('SKILL.md should include name field')
      }
      if (!hasDescription) {
        errors.push('SKILL.md should include description field')
      }
      if (!hasObjective) {
        errors.push('SKILL.md should include <objective> section')
      }
      
      return {
        valid: errors.length === 0,
        errors
      }
    }

    it('should validate proper SKILL.md format', () => {
      const content = `# name: test-skill
# description: A test skill

<objective>
Test objective
</objective>`
      
      const result = validateSkillMd(content)
      expect(result.valid).toBe(true)
    })

    it('should allow empty SKILL.md', () => {
      const result = validateSkillMd('')
      expect(result.valid).toBe(true)
    })

    it('should warn about missing sections', () => {
      const content = `Just some random content without proper format`
      
      const result = validateSkillMd(content)
      expect(result.valid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })
  })

  describe('Score validation', () => {
    const validateScores = (scores: any): { valid: boolean; errors: string[] } => {
      const errors: string[] = []
      
      if (!scores) return { valid: true, errors: [] } // Optional
      
      const fields = ['security', 'clarity', 'practicality', 'quality', 'maintainability', 'innovation']
      
      for (const field of fields) {
        if (scores[field] !== undefined) {
          if (typeof scores[field] !== 'number') {
            errors.push(`${field} must be a number`)
          }
          if (scores[field] < 0 || scores[field] > 10) {
            errors.push(`${field} must be between 0 and 10`)
          }
        }
      }
      
      return {
        valid: errors.length === 0,
        errors
      }
    }

    it('should validate valid scores', () => {
      const scores = {
        security: 8,
        clarity: 9,
        practicality: 7
      }
      
      const result = validateScores(scores)
      expect(result.valid).toBe(true)
    })

    it('should reject scores out of range', () => {
      const scores = {
        security: 15
      }
      
      const result = validateScores(scores)
      expect(result.valid).toBe(false)
    })
  })
})
