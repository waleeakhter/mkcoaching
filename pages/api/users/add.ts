// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './../../../utils/conn'
import UserModal from "./../../../utils/Models/User"
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
            UserModal.findOne({ name: req.body.email, }, (err: Data, user: {
                email: string, save: Function
            }) => {
                if (err) {
                    console.log(err, "err");
                    res.status(500).json({ message: "Something Went Wrong", errors: err })
                    return
                }
                if (user) {
                    res.status(500).json({ message: "Email Already used", user: user })
                    return;
                }
                UserModal.create(req.body, (err: Data, newUser: Object) => {
                    if (err) {
                        console.log(err, "err");
                        res.status(500).json({ message: "Something Went Wrong", errors: err })
                        return
                    }
                    res.status(201).json({ message: "User Created Successfullu ", user: newUser })
                });
            })
            break;

        case 'PATCH':
            const updateUser = await UserModal.findByIdAndUpdate({ _id: req.body._id }, req.body);
            res.status(200).json({ message: "User updated successfully", user: updateUser })

            break;
        default:
            res.status(400).json({ message: "Somthing Went Wrong" });
            break;
    }


}
