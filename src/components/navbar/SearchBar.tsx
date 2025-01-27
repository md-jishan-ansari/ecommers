'use client'

import { useRouter } from "next/navigation"
import queryString from "query-string"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import Button from "../Button"

const SearchBar = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {
            // errors,
        },
        reset

    } = useForm<FieldValues>({
        defaultValues: {
            searchTerm: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if(!data.searchTerm) return router.push('/');

        const url = queryString.stringifyUrl({
            url: '/',
            query: {
                searchTerm: data.searchTerm
            }
        }, { skipNull: true })

        router.push(url);
        reset();
    }

  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('searchTerm')}
        autoComplete="off"
        type="text"
        placeholder="Explore E~Shop"
        className="p-2 text-slate-600 border border-gray-300 rounded-l-md focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80"
      />
      <Button
        variant="dark"
        size="md"
        className="px-1 rounded-r-md hover:bg-slate-900"
        type="submit"
        >
          Search
        </Button>
    </form>
  )
}

export default SearchBar
