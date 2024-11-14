import {describe, it, expect} from 'vitest'

describe('Simple truthy test', () => {
  it('should return true for true === true', () => {
    expect(true).toBe(true)
  })
})
