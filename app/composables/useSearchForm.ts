
type UseSearchFormOption = {
  categoryOptions?: {
    label: string,
    value: string
  }[]
}

export function useSearchForm(options: UseSearchFormOption = {}){
  const {
    categoryOptions = []
  } = options

  const conditionOptions = [
    {
      label: '等于',
      value: 'equals'
    },
    {
      label: '包含',
      value: 'contains'
    }
  ]

  const defaultFormData = {
    category: categoryOptions?.[0]?.value ?? '',
    keyword: '',
    condition: conditionOptions[0]?.value,
    size: 20,
    page: 1,
  }
  
  const searchFormData = reactive({...defaultFormData})
  const searhchQuery = reactive({...defaultFormData})

  const handleSearch = () => {
    console.log('sssss')
    Object.assign(searhchQuery, searchFormData)
    console.log(searhchQuery)
  }
  

  const handleRestore = () => {
    Object.assign(searchFormData, defaultFormData)
    Object.assign(searhchQuery, defaultFormData)
  }

  return {
    conditionOptions,
    searchFormData,
    searhchQuery,
    handleSearch,
    handleRestore
  }
}