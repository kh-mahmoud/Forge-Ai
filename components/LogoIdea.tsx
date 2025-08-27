import Heading from "./Heading";
import IdeasList from "./IdeasList";

const LogoIdea = () => {
  return (
    <div className="step-wrapper ">
      <Heading
        title="Logo Ideas for Your Brand"
        description="Here are unique logo concepts tailored to your brand. Select one that best represents your identity."
      />
      
      <IdeasList />
    </div>
  );
};

export default LogoIdea;
