

interface Props {
    children: Array<any>
}

function CommentSection({ children: commentArray }: Props) {
    const comments = commentArray.map(comment =>

        <div className="commentBox">
            <p>text: {comment.selection}</p>
            <p>Rad: {comment.line}</p>
            <p>Kommentar: {comment.comment}</p>
        </div>

    );

    return (
        <div className="commentSection">
            <h2>Kommentarer</h2>
            {comments}
        </div>

    );

}

export default CommentSection