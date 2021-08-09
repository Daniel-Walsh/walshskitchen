import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/pro-solid-svg-icons";

const SectionHeading = ({ text, icon }) => {
  return (
    <h2 className="font-display leading-snug text-3xl mb-2 mt-6">
      <span className="fa-layers fa-fw">
        <FontAwesomeIcon
          icon={faCircle}
          className="text-primary"
          style={{
            opacity: "0.25",
            transform: "scale(1.25) translate(2px,2px)",
          }}
        />
        <FontAwesomeIcon
          icon={icon}
          className="text-primary"
          style={{ transform: "translate(-6px,-4px)" }}
        />
      </span>{" "}
      <span className="ml-1">{text}</span>
    </h2>
  );
};

export default SectionHeading;
