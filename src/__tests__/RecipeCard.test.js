import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import RecipeCard from '@/components/RecipeCard.vue'

// Stub vue-router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush })
}))

const sampleRecipe = {
  id: 1,
  title: 'Classic French Omelette',
  slug: 'classic-french-omelette',
  description: 'A silky, perfectly rolled French omelette.',
  category: 'breakfast',
  cookTime: '10 min',
  servings: 1,
  difficulty: 'medium',
  ingredients: ['3 large eggs', 'Butter'],
  steps: ['Whisk eggs', 'Cook'],
  imageUrl: '/images/omelette.jpg',
  tags: ['eggs', 'classic']
}

function mountCard(recipe = sampleRecipe) {
  return mount(RecipeCard, {
    props: { recipe },
    global: {
      stubs: {
        'router-link': true
      }
    }
  })
}

describe('RecipeCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    setActivePinia(createPinia())
  })

  it('renders recipe title', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('Classic French Omelette')
  })

  it('renders recipe description', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('A silky, perfectly rolled French omelette.')
  })

  it('renders category badge', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('breakfast')
  })

  it('renders cook time', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('10 min')
  })

  it('renders servings count', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('1 serving')
  })

  it('renders difficulty level', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('medium')
  })

  it('renders tags', () => {
    const wrapper = mountCard()
    expect(wrapper.text()).toContain('eggs')
    expect(wrapper.text()).toContain('classic')
  })

  it('navigates to recipe detail on click', async () => {
    const wrapper = mountCard()
    await wrapper.trigger('click')
    expect(mockPush).toHaveBeenCalledWith({
      name: 'recipe-detail',
      params: { id: 1 }
    })
  })

  it('navigates on Enter keypress', async () => {
    const wrapper = mountCard()
    await wrapper.trigger('keydown.enter')
    expect(mockPush).toHaveBeenCalled()
  })

  it('navigates on Space keypress', async () => {
    const wrapper = mountCard()
    await wrapper.trigger('keydown.space')
    expect(mockPush).toHaveBeenCalled()
  })

  it('has proper aria-label', () => {
    const wrapper = mountCard()
    expect(wrapper.attributes('aria-label')).toBe('View recipe: Classic French Omelette')
  })

  it('has role button for accessibility', () => {
    const wrapper = mountCard()
    expect(wrapper.attributes('role')).toBe('button')
  })

  it('has tabindex 0 for keyboard accessibility', () => {
    const wrapper = mountCard()
    expect(wrapper.attributes('tabindex')).toBe('0')
  })

  it('renders plural servings correctly', () => {
    const multi = { ...sampleRecipe, servings: 4 }
    const wrapper = mountCard(multi)
    expect(wrapper.text()).toContain('4 servings')
  })

  it('renders only first 2 tags', () => {
    const manyTags = { ...sampleRecipe, tags: ['eggs', 'classic', 'french', 'quick'] }
    const wrapper = mountCard(manyTags)
    const tagEls = wrapper.findAll('.text-\\[10px\\].px-2')
    expect(tagEls.length).toBeLessThanOrEqual(2)
  })
})
