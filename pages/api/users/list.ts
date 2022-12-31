// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './../../../utils/conn'
import UserModal from "./../../../utils/Models/User"
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
            console.log(query, "query")
            const usersList = await UserModal.find({ ...query }).sort({ createdAt: -1 })
            res.status(200).json(usersList)
            res.end()
            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
