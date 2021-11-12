import {render, fireEvent} from '@testing-library/vue'
import AppStart from '@/App'

describe('App start component', () => {

    test('start button is clicked', async () => {
        // The render method returns a collection of utilities to query your component.
        const {getByText} = render(AppStart)

        // getByText returns the first matching node for the provided text, and
        // throws an error if no elements match or if more than one match is found.
        getByText('Start')
      
        const buttonStart = getByText('Start')
      
        // Dispatch a native click event to our button element.
        await fireEvent.click(buttonStart)
      })
})
