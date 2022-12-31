import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import API from '../../../utils/axios'
import { RecipeType } from '../../../utils/Models/Recipe'
import AddRecipe from '../add'

type Props = {}

const EditUser = (props: Props) => {
    const router = useRouter()
    const { id } = router.query
    const [recipe, setRecipe] = useState({} as RecipeType)
    useEffect(() => {
        id && API.get(`/recipes/list?id=${id}`).then(res => {
            setRecipe(res.data.at(0))
        })
    }, [id])

    return (
        <AddRecipe id={id ?? ""} recipe={recipe ?? {}} />
    )
}

export default EditUser
