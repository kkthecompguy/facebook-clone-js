import { ArrowRight, Plus } from "../../../svg";
import { stories } from "../../../data/home";
import Story from "./Story";
import "./styles.css";

function Stories(props) {
  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          src="../../../images/default_pic.png"
          alt=""
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color={"#fff"} />
        </div>
        <div className="create_story_text">Create Story</div>
      </div>
      {stories.map((story, i) => (
        <Story story={story} key={i} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}

Stories.propTypes = {};

export default Stories;
