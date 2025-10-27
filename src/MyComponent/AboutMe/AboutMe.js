import BlurText from "../SplitText/BlurText";
import Lanyard from "../Lanyard/Lanyard";
import './AboutMe.css'

export default function AboutMe() {
  const handleAnimationComplete = () => {
    console.log('Animation completed!');
  };

  return (
    <div className='About-all'>
      <div 
        className='Blur'
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-once="true"
      >
        {/* Grid Column 1: Text Only */}
        <div 
          className="text-content"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="200"
          data-aos-once="true"
        >
          <h1 
            className="about-title"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="300"
            data-aos-once="true"
          >
            About Me
          </h1>
          <BlurText
            text="I'm Sarishma Zimba, a full-stack developer passionate about building modern, high-performance web applications with a focus on clean design and seamless user experience. I enjoy working with technologies and combining creativity with technical precision to craft impactful digital solutions. With a strong focus on both functionality and aesthetics, I aim to develop products that are efficient, intuitive, and engaging. I'm continuously exploring new tools and frameworks to stay ahead of the curve and deliver innovative solutions that help users and businesses thrive in the digital era."
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="paragraph"
          />
        </div>

        {/* Grid Column 2: Divider */}
        <div 
          className="vertical-divider"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="400"
          data-aos-once="true"
        ></div>

        {/* Grid Column 3: Lanyard */}
        <div 
          className="lanyard-container"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="500"
          data-aos-once="true"
        >
          <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
        </div>

        {/* Full Width Statistics - Outside Grid */}
        <div 
          className="stats-section"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="600"
          data-aos-once="true"
        >
          <div className="stats-grid">
            <div 
              className="stat-item"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay="700"
              data-aos-once="true"
            >
              <div className="stat-number">20+</div>
              <div className="stat-label">Projects Finished</div>
            </div>
            <div 
              className="stat-item"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay="800"
              data-aos-once="true"
            >
              <div className="stat-number">1+</div>
              <div className="stat-label">Years of Experience</div>
            </div>
            <div 
              className="stat-item"
              data-aos="fade-up"
              data-aos-duration="400"
              data-aos-delay="900"
              data-aos-once="true"
            >
              <div className="stat-number">3.75/4.00</div>
              <div className="stat-label">GPA</div>
            </div>
          </div>
          <div 
            className="stats-quote"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="1000"
            data-aos-once="true"
          >
            Working with heart, creating with mind.
          </div>
        </div>
      </div>
    </div>
  )
}