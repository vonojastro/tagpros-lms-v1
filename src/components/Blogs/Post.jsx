const Post = (props) => {
    return (
        <>
               <div className=" img-fluid mx-auto p-3" style={{maxWidth: "100%", maxHeight: "100%"}} >
                <img alt="img" src= {props.image}
                ></img>
              </div>
            <div className="col-md-12 text-center pt-4">
                <h1>{props.title}</h1>
                <h3>by {props.author}</h3>
            </div>
            <div className="col-md-8 offset-md-2 text-justify">
                <p>
                    {props.content}
                </p>
            </div>
        </>
    )
}
export default Post;