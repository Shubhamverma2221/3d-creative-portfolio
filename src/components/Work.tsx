import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface WorkProject {
  name: string;
  category: string;
  description: string;
  tech: string;
  link?: string;
  webpage?: string;
  video?: string;
  image?: string;
}

const Work = () => {
  useGSAP(() => {
    const workFlex = document.querySelector(".work-flex") as HTMLElement;
    const workSection = document.querySelector(".work-section") as HTMLElement;
    if (!workFlex || !workSection) return;

    const calculateDistance = () => {
      return Math.max(0, workFlex.scrollWidth - window.innerWidth + 160);
    };

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${calculateDistance()}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -calculateDistance(),
      ease: "none",
    });

    // Scroll progress bar
    timeline.to(
      ".work-scroll-progress",
      {
        scaleX: 1,
        ease: "none",
      },
      0
    );

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-scroll-track">
        <div className="work-scroll-progress" />
      </div>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {([
            {
              name: "StayEase – Airbnb Clone",
              category: "Full-Stack MERN Platform",
              description:
                "Full-stack accommodation booking web app built with the MERN stack. Features secure JWT authentication, property listing management, booking workflows, search functionality, and responsive UI for guests & hosts.",
              tech: "React.js, Node.js, Express.js, MongoDB, REST APIs, CSS3",
              link: "https://github.com/Shubhamverma2221/stayease-airbnb-clone",
              webpage: "https://stayease-client.vercel.app/",
              image: "/images/stayease.png",
            },
            {
              name: "AI Expense Tracker & Predictor",
              category: "AI / ML Financial Platform",
              description:
                "Web-based smart expense management platform with automated category classification, CRUD transaction management, interactive data visualizations, and predictive budget forecasting using Machine Learning.",
              tech: "Python, Machine Learning, JavaScript, HTML5, CSS3",
              link: "https://github.com/Shubhamverma2221/expense-tracker-ai",
              webpage: "https://expense-tracker-ai-c9f0.onrender.com/",
              image: "/images/expense_tracker.png",
            },
            {
              name: "LeetCode DSA Mastery",
              category: "Competitive Programming & Algorithms",
              description:
                "150+ solved algorithmic challenges demonstrating deep problem-solving expertise in Arrays, Strings, Linked Lists, Stacks, Queues, Binary Trees, Recursion, and Dynamic Programming.",
              tech: "Java, C, Python, Data Structures & Algorithms",
              link: "https://leetcode.com/u/Shubhamverma2221/",
              image: "/images/leetcode_dsa.png",
            },
            {
              name: "Cyber Security Threat Suite",
              category: "Security Analysis & Vulnerability Assessment",
              description:
                "Hands-on cybersecurity project developed during internship at Acmegrade, performing threat modeling, network security assessment, risk management, and vulnerability remediation analysis.",
              tech: "Cyber Security, Threat Analysis, Risk Management, Network Security",
              link: "https://github.com/Shubhamverma2221",
              image: "/images/cyber_security.png",
            },
          ] as WorkProject[]).map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                {project.description && <p>{project.description}</p>}
                <h4>Tools and features</h4>
                <p>{project.tech}</p>
                {"link" in project && project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                    className="work-project-link"
                  >
                    View GitHub
                  </a>
                )}
                {"webpage" in project && project.webpage && (
                  <a
                    href={project.webpage}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                    className="work-project-link"
                  >
                    View Webpage
                  </a>
                )}
              </div>
              <WorkImage
                image={"image" in project && project.image ? project.image : "/images/placeholder.webp"}
                alt={project.name}
                video={"video" in project ? project.video : undefined}
                link={"webpage" in project ? project.webpage : "link" in project ? project.link : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
