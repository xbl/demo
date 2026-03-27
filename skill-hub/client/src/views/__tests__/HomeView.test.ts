import { describe, it, expect } from 'vitest'
import HomeView from '../HomeView.vue'

describe('HomeView', () => {
  it('has correct component name', () => {
    expect(HomeView.name).toBe('HomeView')
  })
})
