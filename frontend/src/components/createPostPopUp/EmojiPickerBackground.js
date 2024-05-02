import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

function EmojiPickerBackground({ text, user, setText, typetwo }) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmojiClick = ({ emoji }, e) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  return (
    <div className={typetwo ? "images_input" : ""}>
      <div className={`${!typetwo && "flex_center"}`}>
        <textarea
          ref={textRef}
          maxLength={100}
          value={text}
          placeholder={`What's on your mind, ${user?.firstName}`}
          onChange={(e) => setText(e.target.value)}
          className={`post_input ${typetwo && "inputtwo"}`}
        ></textarea>
      </div>
      <div className={`${!typetwo && "post_emojis_wrap"}`}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              typetwo ? "movepicker2" : "rlmove"
            }`}
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        {!typetwo && <img src="../../../icons/colorful.png" alt="" />}
        <i
          className={`emoji_icon_large ${typetwo && "moveleft"}`}
          onClick={() => setPicker((prev) => !prev)}
        ></i>
      </div>
    </div>
  );
}

EmojiPickerBackground.propTypes = {};

export default EmojiPickerBackground;
