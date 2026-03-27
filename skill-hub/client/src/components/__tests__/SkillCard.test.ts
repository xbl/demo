import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SkillCard from '../SkillCard.vue'

describe('SkillCard', () => {
  const mockSkill = {
    id: '1',
    name: 'Test Skill',
    description: 'A test skill for unit testing',
    author: 'Test Author',
    tags: ['test', 'mock'],
    downloads: 1500,
    stars: 89,
    featured: true,
    createdAt: '2026-03-27',
    updatedAt: '2026-03-27'
  }

  it('renders skill name correctly', () => {
    const wrapper = mount(SkillCard, {
      props: { skill: mockSkill }
    })
    
    expect(wrapper.text()).toContain('Test Skill')
  })

  it('renders author correctly', () => {
    const wrapper = mount(SkillCard, {
      props: { skill: mockSkill }
    })
    
    expect(wrapper.text()).toContain('Test Author')
  })

  it('renders tags correctly', () => {
    const wrapper = mount(SkillCard, {
      props: { skill: mockSkill }
    })
    
    expect(wrapper.text()).toContain('test')
    expect(wrapper.text()).toContain('mock')
  })

  it('formats download count correctly', () => {
    const wrapper = mount(SkillCard, {
      props: { skill: mockSkill }
    })
    
    // 1500 should be formatted as 1.5k
    expect(wrapper.text()).toContain('1.5k')
  })

  it('formats star count correctly', () => {
    const wrapper = mount(SkillCard, {
      props: { skill: mockSkill }
    })
    
    expect(wrapper.text()).toContain('89')
  })

  it('links to detail page', () => {
    const wrapper = mount(SkillCard, {
      props: { skill: mockSkill }
    })
    
    const routerLink = wrapper.find('router-link')
    expect(routerLink.exists()).toBe(true)
    expect(routerLink.attributes('to')).toBe('/skills/1')
  })
})
