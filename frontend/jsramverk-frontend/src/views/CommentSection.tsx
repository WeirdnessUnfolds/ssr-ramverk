// Displays the comments added to the document

interface Props {
    children: Array<any>,
    deleteComment: (id: number) => void
}

function CommentSection({ children: commentArray, deleteComment }: Props) {
    const comments = commentArray.map(comment =>

        <div className="commentBox" key={comment.comment_id}>
            <button role="closebtn" type="button" className="closebtn" onClick={() => deleteComment(comment.comment_id)}>X</button>
            <p> {comment.user} har kommenterat i paragraf {comment.line}</p>
            <p>" {comment.selection} "</p>
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