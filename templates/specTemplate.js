import React from 'react'
import { shallow } from 'enzyme'
import {{displayName}} from './index'

/**
 * @module {{displayName}}
 * Sample smoke test
 */
describe('<{{displayName}} />', () => {
  test('should render without throwing an error', () => {
    const {{displayName}}}Component = () => <{{displayName}} />
    const component = shallow(<{{displayName}}Component />)
    expect(component.name()).toBe('{{displayName}}')
  })
})
