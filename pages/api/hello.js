import { ApiError } from "next/dist/next-server/server/api-utils"

export default (req, res) => {
    res.status(200).json({ text: 'Hello' })
}

// 使用例
// export default (req, res) => {
//     const email = req.body.email
//     // 続いて、データベースなどに e メールを保存する
// }

// Apiのドキュメント
// https://nextjs.org/docs/api-routes/dynamic-api-routes
// https://nextjs.org/docs/api-routes/dynamic-api-routes（動的API）