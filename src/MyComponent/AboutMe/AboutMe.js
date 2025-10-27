import Lanyard from "../Lanyard/Lanyard";
import './AboutMe.css';

const stats = [
  { number: '20+', label: 'Projects Finished', delay: 700 },
  { number: '1+', label: 'Years of Experience', delay: 800 },
  { number: '3.75/4.00', label: 'GPA', delay: 900 },
];

export default function AboutMe() {
  return (
    <div className="About-all">
      <div className="Blur">

        {/* Text Section */}
        <div 
          className="text-content"
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-delay="100"
        >
          <h1 className="about-title" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
            About Me
          </h1>
          <p className="paragraph" data-aos="fade-up" data-aos-duration="700" data-aos-delay="300">
            I'm Sarishma Zimba, a full-stack developer passionate about building modern, high-performance web applications with a focus on clean design and seamless user experience. I enjoy combining creativity with technical precision to craft impactful digital solutions. With attention to both functionality and aesthetics, I aim to develop products that are efficient, intuitive, and engaging. I’m continuously exploring new tools and frameworks to deliver innovative solutions that help users and businesses thrive in the digital era.
          </p>
        </div>

        {/* Divider */}
        <div 
          className="vertical-divider"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="400"
        ></div>

        {/* Lanyard */}
        <div 
          className="lanyard-container"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="500"
        >
          <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
        </div>

        {/* Stats Section */}
        <div className="stats-section" data-aos="fade-up" data-aos-duration="700" data-aos-delay="600">
          <div className="stats-grid">
            {stats.map(stat => (
              <div 
                key={stat.label} 
                className="stat-item"
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-delay={stat.delay}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="stats-quote" data-aos="fade-up" data-aos-duration="700" data-aos-delay="1000">
            Working with heart, creating with mind.
          </div>
        </div>

      </div>
    </div>
  );
}
