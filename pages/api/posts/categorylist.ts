// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './../../../utils/conn'
import PostCategory from "./../../../utils/Models/PostCategory"
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
            PostCategory.find({ ...query }, (err: Data, category: Object[]) => {
                res.status(200).json(category)
                res.end()
            }).sort({ createdAt: -1 })
            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
