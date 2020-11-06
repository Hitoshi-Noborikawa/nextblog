import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // /posts　配下のファイル名を取得する
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
    // id を取得するためにファイル名から ".md" を削除する
    const id = fileName.replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return {
        id,
        ...matterResult.data
    }
    })
  // 投稿を日付でソートする
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
        return 1
        } else {
        return -1
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    // 以下のような配列を返します:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
            id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // マークダウンを HTML 文字列に変換するために remark を使う
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
        const contentHtml = processedContent.toString()
    
        // データを id および contentHtml と組み合わせる
        return {
        id,
        contentHtml,
        ...matterResult.data
    }
}



// // 外部APIの例 ーーーーーーーーーー
// import fetch from 'node-fetch'

// export async function getAllPostIds() {
//     // 外部の API エンドポイントから投稿データを取得する
//     const res = await fetch('..')
//     const posts = await res.json()
//     return posts.map(post => {
//         return {
//             params: {
//             id: post.id
//             }
//         }
//     })
// }
// //  ーーーーーーーーーーーーーーーー

// // DBの例 ーーーーーーーーーーーーー
// import someDatabaseSDK from 'someDatabaseSDK'

// const databaseClient = someDatabaseSDK.createClient(...)

// export async function getSortedPostsData() {
//   // データベースから投稿データを取得する
//     return databaseClient.query('SELECT posts...')
// }
// //  ーーーーーーーーーーーーーーーー

// // サーバーサイドレンダリングを行う場合ー
// export async function getServerSideProps(context) {
//     return {
//         props: {
//             // コンポーネントに渡すための props
//         }
//     }
// }
// //   ーーーーーーーーーーーーーーーーーー

// // クライアントサイドレンダリングーーーーーー
// import useSWR from 'swr'

// function Profile() {
//     const { data, error } = useSWR('/api/user', fetch)

//     if (error) return <div>failed to load</div>
//     if (!data) return <div>loading...</div>
//     return <div>hello {data.name}!</div>
// }
// 詳細　https://swr.now.sh/
// //   ーーーーーーーーーーーーーーーーーーーー


// getStaticProps&getServerSidePropsのドキュメント
// https://nextjs.org/docs/basic-features/data-fetching

// デモサイト
// https://github.com/zeit/next.js/tree/canary/examples/blog-starter
// https://github.com/zeit/next.js/tree/canary/examples/cms-datocms
// https://github.com/zeit/next.js/tree/canary/examples/cms-takeshape
// https://github.com/zeit/next.js/tree/canary/examples/cms-sanity
