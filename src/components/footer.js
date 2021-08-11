import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJsSquare, faCss3Alt } from "@fortawesome/free-brands-svg-icons";
import { faCloudUpload, faHeart } from "@fortawesome/pro-solid-svg-icons";
import Link from "./link";

const Button = ({ link, text, icon, colour }) => {
  return (
    <div>
      <a
        className={`btn bg-${colour}-200 hover:bg-${colour}-300 text-${colour}-700 hover:text-${colour}-900`}
        href={link}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span>{text}</span>
        <FontAwesomeIcon className="text-lg ml-1" icon={icon} fixedWidth />
      </a>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-gray-200 text-gray-600 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div>
          Copyright &copy; {new Date().getFullYear()}. Built and maintained by{" "}
          <a
            className="text-primary hover:text-red-800 transition-colors underline hover:no-underline"
            href="https://dwalsh.dev/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Dan&nbsp;Walsh
          </a>
          .
        </div>
        <div className="text-center md:text-right flex flex-col items-center md:items-end mt-6 md:mt-0 lg:pl-10">
          <p className="mb-3">Made with:</p>
          <Button
            text="Gatsby"
            icon={faJsSquare}
            link="https://www.gatsbyjs.com"
            colour="purple"
          />
          <Button
            text="Tailwind CSS"
            icon={faCss3Alt}
            link="https://www.tailwindcss.com"
            colour="blue"
          />
          <Button
            text="Netlify"
            icon={faCloudUpload}
            link="https://www.netlify.com"
            colour="green"
          />
          <div>
            <Link
              className={`btn bg-gray-200 hover:bg-gray-300 text-gray-400 hover:text-primary`}
              to="/about"
            >
              <FontAwesomeIcon className="text-lg" icon={faHeart} fixedWidth />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
