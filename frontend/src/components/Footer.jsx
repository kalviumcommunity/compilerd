import React from "react";
import {
    AiFillGithub,
    AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
    let date = new Date();
    let year = date.getFullYear();
    return (
        <div className="bg-gray-800 text-white p-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="footer-copywright text-center md:text-left">
                        <h3>Frontend by - <span>S Gyanesh Rao</span></h3>
                    </div>
                    <div className="footer-copywright text-center">
                        <h3>Copyright © {year} <a href="https://gyaneshrao-gyaneshrao28s-projects.vercel.app/">SGR</a></h3>
                    </div>
                    <div className="footer-body text-center md:text-right">
                        <ul className="flex justify-center md:justify-end space-x-4">
                            <li className="social-icons">
                                <a
                                    href="https://github.com/Gyanesh-Rao28"
                                    className="text-white hover:text-gray-400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiFillGithub size={30} />
                                </a>
                            </li>
                            <li className="social-icons">
                                <a
                                    href="https://leetcode.com/u/gyaneshrao28/"
                                    className="text-white hover:text-gray-400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <SiLeetcode size={30} />
                                </a>
                            </li>
                            <li className="social-icons">
                                <a
                                    href="https://www.linkedin.com/in/gyanesh-rao-2b3927222/"
                                    className="text-white hover:text-gray-400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FaLinkedinIn size={30} />
                                </a>
                            </li>
                            <li className="social-icons">
                                <a
                                    href="https://www.instagram.com/_gyanesh.rao28_/"
                                    className="text-white hover:text-gray-400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <AiFillInstagram size={30} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer