// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './../../../utils/conn'
import RecipeModal from "./../../../utils/Models/Recipe"
type Data = {}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
): Promise<void> {
    await dbConnect()
    const {
        query,
        method,
    } = req;
    switch (method) {
        case 'POST':
            res.status(400).json({ message: "GET method not supported" });
            break;
        case 'GET':
            RecipeModal.find({ ...query }, (err: Data, recipe: Object[]) => {
                res.status(200).json(recipe)
                res.end()
            }).sort({ createdAt: -1 })
            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
