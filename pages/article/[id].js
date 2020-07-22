import { useRouter } from 'next/router'
import Layout from '../../component/layout'
import Comment from '../../component/article/comment'

export default function Article({ article, comments }) {
    const router = useRouter()

    if (router.isFallback) {
        return (
            <Layout>
                <div class="py-5" >
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-1">
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <h3>{article.authorName}</h3>
                            <h6 className="text-muted">{convertTime(article.postTime)}</h6>
                            <hr />
                            <h3>{article.title}</h3>
                            <p>{article.content}</p><a className="btn py-0 px-1 pt-0 btn-link mt-1 mb-1 text-warning" style={{ textDecoration: "none" }}>
                                <i className="fa fa-thumbs-o-up fa-fw fa-1x py-1 text-warning"></i>
                                {article.likeIds.length}
                            </a>
                            <a className="btn py-0 px-1 pt-0 btn-link mt-1 mb-2 text-warning" style={{ textDecoration: "none" }} href="#">
                                <i className="fa fa-comment-o fa-fw fa-1x py-1 text-warning"></i>
                            </a>
                            <hr />
                            <Comment comments={comments} />
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </Layout>
    )
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { id: '5f0d72d2e9a36c35686d933d' } }],
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:6001/post/${params.id}`)
    const article = await res.json()

    const comRes = await fetch(`http://localhost:6001/comment/post/${params.id}`)
    const comments = await comRes.json()

    return {
        props: {
            article,
            comments,
        }
    }
}

function convertTime(iso) {
    let date = new Date(iso)
    return date.toLocaleString()
}