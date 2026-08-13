import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack & AI Developer</h4>
                <h5>Independent & Open-Source</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Architecting full-stack MERN platforms (StayEase Airbnb Clone), AI-powered expense predictors, and interactive web tools with REST APIs, secure auth, and modern UI.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cyber Security Intern</h4>
                <h5>Acmegrade Pvt. Ltd.</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed a 2-month internship focusing on threat analysis, risk management, network security evaluations, and vulnerability assessment methodologies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Competitive Programmer</h4>
                <h5>LeetCode (150+ Solved)</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Conquered 150+ algorithmic challenges, mastering time/space complexity, arrays, strings, linked lists, trees, recursion, and dynamic programming.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Science</h4>
                <h5>DIT University, Dehradun</h5>
              </div>
              <h3>2023 - 2027</h3>
            </div>
            <p>
              Undergraduate in Computer Science Engineering (CGPA: 7.80/10). Rigorous coursework in Data Structures & Algorithms, OOP, DBMS, and Computer Networks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
