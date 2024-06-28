import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-shadowBlack w-4/5 lg:w-3/5 text-center font-primary p-2 relative border-2 border-black">
      <small className="text-sm lg:text-xl xl:text-2xl text-primaryWhite">
        © ALL RIGHTS RESERVED
      </small>
      <div className="flex gap-4 absolute top-1/2 right-4 translate-x-[-50%] translate-y-[-50%] text-sm lg:text-xl xl:text-2xl text-primaryWhite">
        <a href="https://github.com/kalviumcommunity/compilerd" target="_blank">
          <FaGithub className="hover:opacity-75 cursor-pointer" />
        </a>
        <a href="https://github.com/kalviumcommunity/compilerd" target="_blank">
          <FaLinkedin className="hover:opacity-75 cursor-pointer" />
        </a>
        <a href="https://github.com/kalviumcommunity/compilerd" target="_blank">
          <FaTwitter className="hover:opacity-75 cursor-pointer" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
