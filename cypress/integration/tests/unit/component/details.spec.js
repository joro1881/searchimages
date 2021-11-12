import {render} from '@testing-library/vue'
import SearchDetails from '@/components/SearchDetails'

describe('SearchDetails component', () => {

    test('increments value on click', async () => {
        // The render method returns a collection of utilities to query your component.
        const {getByText} = render(SearchDetails, {
            props: {
              hits: 100,
              total: 500,
              term:  'cat'
            }
        })
        getByText('Showing 100 of 500 results for cat')
      })
})
