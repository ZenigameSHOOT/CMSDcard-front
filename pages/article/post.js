import Layout from '../../component/layout'
import { themeColor } from '../../functions/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Post() {
    const router = useRouter()

    useEffect(()=>{
        if (!localStorage.getItem('auth')) router.push('/user/login')
    }, [])

    const postArticle = async () => {
        return await fetch('http://localhost:6001/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth')}`
            },
            body: JSON.stringify({
                title: document.getElementById('form-title').value,
                content: document.getElementById('form-content').value
            })
        }).then(res => {
            if (res.ok) router.push(`/article/new`)
        })
    }

    return (
        <Layout>
            <div className="py-5 text-center mt-3" >
                <div className="container">
                    <div className="row">
                        <div className="mx-auto col-lg-6 col-10">
                            <h1>投稿</h1>
                            <p className="mb-3">你的每個想法都是寶貴的意見!</p>
                            <form className="text-left">
                                <div className="form-group">
                                    <label htmlFor="form16">標題</label>
                                    <input type="text" className="form-control" id="form-title" placeholder="你的主題" autoComplete="off" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="form17">內文</label>
                                    <div className="form-group">
                                        <textarea className="form-control" id="form-content" rows="10" placeholder="你想說的話..."></textarea>
                                    </div>
                                </div>
                                <button type="button" className="btn" style={{ background: themeColor, color: "#ffffff" }} onClick={postArticle}>潑文</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}