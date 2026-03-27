import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CategoryCard from '../CategoryCard.vue'

describe('CategoryCard', () => {
  const mockCategory = {
    id: 'dev',
    name: '开发工具',
    icon: '🛠️',
    count: 156
  }

  it('renders category name correctly', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: mockCategory }
    })
    
    expect(wrapper.text()).toContain('开发工具')
  })

  it('renders category icon correctly', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: mockCategory }
    })
    
    expect(wrapper.text()).toContain('🛠️')
  })

  it('renders skill count correctly', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: mockCategory }
    })
    
    expect(wrapper.text()).toContain('156')
  })

  it('links to category page', () => {
    const wrapper = mount(CategoryCard, {
      props: { category: mockCategory }
    })
    
    const routerLink = wrapper.find('router-link')
    expect(routerLink.exists()).toBe(true)
    expect(routerLink.attributes('to')).toBe('/category/dev')
  })
})
