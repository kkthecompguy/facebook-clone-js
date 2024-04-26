import { useState } from "react";
import EmojiPickerBackground from "./EmojiPickerBackground";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import "./styles.css";

function CreatePostPopUp({ user }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(true);

  return (
    <div className="blur">
      <div className="post_box">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPrev ? (
          <>
            <EmojiPickerBackground text={text} user={user} setText={setText} />
          </>
        ) : (
          <ImagePreview text={text} user={user} setText={setText} />
        )}
        <AddToYourPost />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
}

CreatePostPopUp.propTypes = {};

export default CreatePostPopUp;
