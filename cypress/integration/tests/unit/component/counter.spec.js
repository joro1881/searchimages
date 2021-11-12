import {render, fireEvent} from '@testing-library/vue'
import Counter from '@/components/Counter'

test('increments value on click', async () => {
  // The render method returns a collection of utilities to query your component.
  const {getByText} = render(Counter)

  getByText('Times clicked: 0')

  const button = getByText('increment')

  await fireEvent.click(button)
  await fireEvent.click(button)

  getByText('Times clicked: 2')
})