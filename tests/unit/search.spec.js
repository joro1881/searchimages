import Vuelidate from 'vuelidate'
import ImageCard from '@/components/ImageCard'
import InputSearch from '@/components/InputSearch'
import SearchDetails from '@/components/SearchDetails'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()
localVue.use(Vuelidate)

describe('Search app components unit tests', () => {
    test('input receives data correctly', () => {
        const wrapper = shallowMount(InputSearch, { localVue }) 

        wrapper.setData({ inputValue: 'cat'})
        expect(wrapper.vm.$v.inputValue.$model).toBe('cat')
    })

    test('input trigger error message', () => {
        const wrapper = mount(InputSearch, { localVue }) 

        wrapper.setData({ inputValue: 'z'})

        wrapper.vm.$forceUpdate(); // this part
        expect(wrapper.vm.$v.inputValue.$error).toBe(false);
        // expect(wrapper.vm.$v.inputValue.$minLength).toBe(false)
        expect(wrapper.vm.$v.inputValue.$model).toMatch('z')
    })

    test('input emits on-search event', () => {
        const wrapper = mount(InputSearch, { localVue }) 
        wrapper.find('button').trigger('click')
        expect(wrapper.emitted('onSearch'))
    })

    test('details assemble correctly', () => {
        const wrapper = mount(SearchDetails, { 
            propsData: {
                hits: 50,
                total:500,
                term: 'cat'
            },
            localVue
         }) 

        wrapper.vm.$forceUpdate
        expect(wrapper.vm.$data.sentence).toMatch('Showing 50 of 500 results for cat')
    })

    test('Image card formats tags', () => {
        const wrapper = mount(ImageCard, { 
            propsData: {
                content: {
                    largeImageURL : "",
                    user          : "",
                    userImageURL  : "",
                    tags          : "bambi1, bambi2, simba3, longbambi4"
                }
            },
            localVue
         }) 

        wrapper.vm.$forceUpdate
        expect(wrapper.vm.$data.tags).toMatch('bambi1, bambi2, simba3')
        expect(wrapper.vm.$data.avatar).toMatch('images/default_avatar.png')
    })

    // test('Search pagination and url handling', () => {
    //     const wrapper = mount(Search, { 
    //         localVue,
    //     }) 

    //     const wrapper2 = mount(InputSearch, { 
    //         localVue,
    //     })
        
    //     wrapper2.trigger('onSearch', {
    //         'searchTerm'   : 'cat and dogs',                  
    //     })

    //     // wrapper.vm.$forceUpdate
    //     expect(wrapper.$v.vm.searchTerm).toMatch('cat+and+dogs')
    // })
})