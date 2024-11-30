import { Timeline } from "antd";
import "./index.scss";

function Projects() {
  return (
    <>
      <div style={{marginTop: "20px"}}></div>
      <Timeline
        // pending="To be continue..."
        items={[
          {
            color: "#1E3175",
            children: (
              <>
                <div class="box">
                    <h4>E-Commerce Analytics Platform</h4>
                    <h4 class="year">- 2022 -</h4>
                </div>
                <p>MySQL</p>
                <a href="https://project-mini-1-phi.vercel.app/" target="_blank" rel="noreferrer" class="link">Source</a>
              </>
            ),
          },
          {
            color: "#1E3175",
            children: (
              <>
                <div class="box"> 
                    <h4>Pizza Sales</h4>
                    <h4 class="year">- 2022 -</h4>
                </div>
                <p>MySQL, PowerBI</p>
                <a href="https://project-mini-2-tawny.vercel.app/" target="_blank" rel="noreferrer" class="link">Demo</a>
              </>
            ),
          },
          {
            color: "#1E3175",
            children: (
              <>
                <div class="box"> 
                    <h4>Amazon Books</h4>
                    <h4 class="year">- 2023 -</h4>
                </div>
                <p>Python, MySQL</p>
                <a href="https://github.com/hcthinhjr03/BTLJava2023" target="_blank" rel="noreferrer" class="link">Source</a>
              </>
            ),
          },
        ]}
      />
    </>
  );
}

export default Projects;