import { convertBriefTime, themeColor } from '../../functions/utils'
import Linkify from 'linkifyjs/react'
import { useEffect, useState } from 'react'

export default function Comment({ comments, postId, onComment, articleIsDeleted=false }) {
    const [comment, setComment] = useState('')

    // useEffect(() => {
    //     document.getElementById('form-comment').addEventListener('keypress', (e) => {
    //         if (e.ctrlKey && e.code === 'Enter') {
    //             postComment()
    //         }
    //     })
    // })

    const postComment = async () => {
        if (!comment) return

        return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth')}`
            },
            body: JSON.stringify({
                authorId: '5f28c3d328666f21bca62f7e',
                content: comment
            })
        }).then(async res => {
            if (!res.ok) window.alert('Sorry!  Σ(･口･)   ' + await res.text())
        })
            .then(() => {
                setComment('')
                onComment()
            })
    }

    return (
        <div>
            <div className="row">
                <div className="mt-1 col-xl-11 col-lg-11 col-md-10 col-sm-10 col-10">
                    <textarea rows="1" id="form-comment" type="text" className="form-control" value={comment} placeholder="留言" autoComplete="off" disabled={articleIsDeleted} onChange={(e) => { setComment(e.target.value) }} />
                </div>
                <button type="button" className="btn mt-1" style={{ backgroundColor: themeColor, color: "#ffffff" }} disabled={articleIsDeleted} onClick={postComment}>
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-chat-right-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2 1h12a1 1 0 0 1 1 1v11.586l-2-2A2 2 0 0 0 11.586 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                        <path fillRule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                    </svg>
                </button>
            </div>
            {/* <small className="ml-1 text-muted">按 Ctrl + Enter 傳送</small> */}

            <div className="list-group mt-3">
                {comments.map(comment => (
                    <div className="list-group-item list-group-item-action flex-column align-items-start" key={comment._id}>
                        <div className="d-flex w-100 justify-content-between">
                            <h6 className="mb-1" style={{ cursor: "pointer" }} onClick={() => { setComment(comment.authorName + ' ') }}>{!comment.isDeleted ? comment.authorName : ""}</h6>
                            <small className="text-muted">{convertBriefTime(comment.postTime)}</small>
                        </div>
                        {!comment.isDeleted ?
                            <Linkify className="my-1" tagName="p" style={{ whiteSpace: "pre-line" }}>{comment.content}</Linkify>
                            :
                            <p className="my-1" style={{ whiteSpace: "pre-line", color: "#696964" }}>
                                <i>{`! 文章內容已遭移除 !
                                    此文章違反社群守則：
                                    「禁止不雅、侮辱、歧視及攻擊詞語」`}</i>
                            </p>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}