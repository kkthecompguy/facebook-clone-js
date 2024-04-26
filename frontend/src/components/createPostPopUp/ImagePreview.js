import EmojiPickerBackground from "./EmojiPickerBackground";

function ImagePreview({ text, setText, user }) {
  return (
    <div className="overflow_a">
      <EmojiPickerBackground
        text={text}
        setText={setText}
        user={user}
        typetwo={true}
      />
    </div>
  );
}

ImagePreview.propTypes = {};

export default ImagePreview;
