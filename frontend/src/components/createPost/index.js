import { Feeling, LiveVideo, Photo } from "../../svg";
import "./styles.css";

function CreatePost({ user }) {
  return (
    <div className="create_post">
      <div className="create_post_header">
        <img src={user?.picture} alt="" />
        <div className="open_post hover2">
          What's on your mind, {user?.firstName}
        </div>
      </div>
      <div className="create_splitter"></div>
      <div className="create_post_body">
        <div className="create_post_icon hover1">
          <LiveVideo color="#f3425f" /> Live Video
        </div>
        <div className="create_post_icon hover1">
          <Photo color="#4bbf67" /> Photo/Video
        </div>
        <div className="create_post_icon hover1">
          <Feeling color="#f7b928" /> Feeling/Activity
        </div>
      </div>
    </div>
  );
}

CreatePost.propTypes = {};

export default CreatePost;
