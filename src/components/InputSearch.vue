<template>
    <!-- <div class="container mx-auto flex flex-col justify-center" > -->
    <div class="mx-auto flex flex-col">
        <div class="flex justify-center mx-auto">
            <div class="w-60 my-2 py px-2" @keydown="clearError()">
                    <input  type="text" 
                            placeholder="Search for images..."
                            class="w-full border-solid border-2 border-black"
                            v-model="$v.inputValue.$model"
                            @keyup.enter="onSearchClick()"
                    />
            </div>
            <button class="mx-2 my-2 px-2 border-solid border-2 border-black rounded "
                @click="onSearchClick()"
            >Go</button>
        </div>

        <div class="flex justify-center">
            <span v-if="loadError" class="w-full px-2 text-red-600"> {{ error }}</span>
        </div>
    </div>
</template>
<script>

import { required, minLength } from 'vuelidate/lib/validators'

export default {
    name: 'input-search',
    data() {
        return {
            inputValue  : '',
            loadError   : false,
            error       : '',
        }
    },
    validations: {
        inputValue: {
            required,
            minLength: minLength(2)
        }
    },
    methods: {
        onSearchClick() {
            if (this.$v.inputValue.required && this.$v.inputValue.minLength) {
                this.loadError = false
                this.$root.$emit('onSearch', {
                        'searchTerm'   : this.inputValue,                    
                    })
            } else {
                this.error     = !this.$v.inputValue.required ? 'Please enter search value' : 'Value must be longer than a symbol'
                this.loadError = true
            }
        },
        clearError() {
            this.loadError = false
        }
    }
}
</script>