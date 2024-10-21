

interface Props {
    children: Array<any>
}

function CommentSection({ children: commentArray }: Props) {
    const comments = commentArray.map(comment =>

        <div className="commentBox">
            <p>selection: {comment.comment}</p>
            <p>line: {comment.line}</p>
        </div>

    );

    return (
        <div className="commentSection">
            {comments}
        </div>

    );

}

export default CommentSection