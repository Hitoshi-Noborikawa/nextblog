// 全てのページに共通するコンポーネント
import '../styles/global.css'

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
}