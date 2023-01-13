// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './../../../utils/conn'
import PostCategory from "./../../../utils/Models/PostCategory"
type Data = {}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    await dbConnect()
    const { method } = req;
    switch (method) {
        case 'GET':
            res.status(400).json({ message: "GET method not supported" });
            break;
        case 'POST':
            PostCategory.findOne({ name: req.body.name, }, (err: Data, category: {
                email: string, save: Function
            }) => {
                if (err) {
                    console.log(err, "err");
                    res.status(500).json({ message: "Something Went Wrong", errors: err })
                    return
                }
                if (category) {
                    res.status(500).json({ message: "Category Already created", category: category })
                    return;
                }
                PostCategory.create(req.body, (err: Data, newCategory: Object) => {
                    if (err) {
                        console.log(err, "err");
                        res.status(500).json({ message: "Something Went Wrong", errors: err })
                        return
                    }
                    res.status(201).json({ message: "Category Created Successfullu ", category: newCategory })
                });
            })
            break;

        case 'PATCH':
            const updateRecipe = await PostCategory.findByIdAndUpdate({ _id: req.body._id }, req.body);
            res.status(200).json({ message: "User updated successfully", recipe: updateRecipe })

            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
