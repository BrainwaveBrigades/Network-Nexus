import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Briefcase,
  Users,
  Calendar,
  Lightbulb,
  ExternalLink,
  Menu,
  X,
  Network,
  ChevronRight,
  Mail,
  Linkedin,
  Twitter,
  Facebook
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarIntegrated />
      <div className="flex-grow">
        <HeroSectionIntegrated />
        <InfoCardsSectionIntegrated />
      </div>
      <FooterIntegrated />
    </div>
  );
};

// Integrated Navbar Component
const NavbarIntegrated = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Network size={28} className="text-primary-color mr-2" />
          <Link to="/" className="font-bold text-xl md:text-2xl text-near-black tracking-tight flex items-center">
            <span className="text-primary-color mr-1">Nexus</span>Hub
            <div className="w-2 h-2 bg-primary-color rounded-full ml-1 animate-pulse"></div>
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <Link to="/NexusHub/hall-Of-Fame" className="nav-link text-darkest-gray font-medium">Hall of Fame</Link>
          <Link to="/NexusHub/alumni" className="nav-link text-darkest-gray font-medium">Explore Alumni</Link>
          <Link to="/NexusHub/mentorship" className="nav-link text-darkest-gray font-medium">Mentorship</Link>
          <Link to="/NexusHub/internships" className="nav-link text-darkest-gray font-medium">Internships</Link>
          <Link to="/NexusHub/knowledge-Hub" className="nav-link text-darkest-gray font-medium">Knowledge Hub</Link>
          <Link to="/NexusHub/events" className="nav-link text-darkest-gray font-medium">Events</Link>
          
         
          
        </div>
        
        <button 
          className="md:hidden text-gray-800 hover:text-primary-color focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <div 
        className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-2 space-y-2">
          <Link to="/knowledge-hub" className="block py-2 text-darkest-gray hover:text-primary-color">Knowledge Hub</Link>
          <Link to="/hall-of-fame" className="block py-2 text-darkest-gray hover:text-primary-color">Hall of Fame</Link>
          <Link to="/internships" className="block py-2 text-darkest-gray hover:text-primary-color">Internships</Link>
          <Link to="/alumni" className="block py-2 text-darkest-gray hover:text-primary-color">Explore Alumni</Link>
          <Link to="/events" className="block py-2 text-darkest-gray hover:text-primary-color">Events</Link>
          <Link to="/mentorship" className="block py-2 text-darkest-gray hover:text-primary-color">Mentorship</Link>
        </div>
      </div>
    </nav>
  );
};

// Integrated Hero Section Component
const HeroSectionIntegrated = () => {
  const sphereRef = useRef(null);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  
  const featureIcons = [
    { 
      id: 1, 
      icon: <BookOpen size={30} />, 
      name: 'Knowledge Hub',
      description: 'Access a wealth of resources uploaded by alumni to boost your learning and career preparation.'
    },
    { 
      id: 2, 
      icon: <Award size={30} />, 
      name: 'Hall of Fame',
      description: 'Celebrate extraordinary achievements and success stories from our alumni community.'
    },
    { 
      id: 3, 
      icon: <Briefcase size={30} />, 
      name: 'Internships',
      description: 'Discover and apply for internship opportunities shared by our alumni network.'
    },
    { 
      id: 4, 
      icon: <Users size={30} />, 
      name: 'Alumni',
      description: "Connect with graduates to gain insights and build professional relationships."
    },
    { 
      id: 5, 
      icon: <Calendar size={30} />, 
      name: 'Events',
      description: 'Stay updated on networking events and workshops hosted by Nexus Hub.'
    },
    { 
      id: 6, 
      icon: <Lightbulb size={30} />, 
      name: 'Mentorship',
      description: 'Connect with experienced alumni for personalized guidance and support.'
    },
  ];

  useEffect(() => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    let rotateX = 0;
    let rotateY = 0;
    let requestId;

    const handleMouseMove = (e) => {
      if (!sphere) return;
      
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
      
      rotateX = mouseY;
      rotateY = -mouseX;

      requestId = requestAnimationFrame(updateSphereRotation);
    };

    const updateSphereRotation = () => {
      if (!sphere) return;
      
      sphere.style.transform = `
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        rotateZ(0deg)
      `;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex((prevIndex) => 
        prevIndex === featureIcons.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [featureIcons.length]);

  const calculateIconPosition = (index, totalIcons, activeIndex) => {
    const angleDifference = (2 * Math.PI) / totalIcons;
    const baseAngle = Math.PI / 2;
    
    const relativePosition = (index - activeIndex + totalIcons) % totalIcons;
    const angle = baseAngle - (relativePosition * angleDifference);
    
    const radius = 100;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    const isActive = index === activeIndex;
    const opacity = isActive ? 1 : 0.7;
    const scale = isActive ? 1.2 : 0.8;
    
    return { x, y, opacity, scale, isActive };
  };

  return (
    <section className="min-h-screen pt-20 overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 py-6 md:pr-12 z-10">
          {/* <div className="inline-flex items-center rounded-full bg-primary-color bg-opacity-10 px-3 py-1 mb-6 animate-fade-in">
            <span className="mr-2 h-2 w-2 rounded-full bg-primary-color"></span>
            <span className="text-sm font-medium text-primary-color mr-2">New Feature</span>
            <a href="#" className="text-xs text-primary-dark font-medium flex items-center">
              Read more <ExternalLink size={12} className="ml-1" />
            </a>
          </div> */}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-darkest-gray leading-tight mb-6 animate-fade-in">
            Welcome to <span className="text-primary-color">Nexus</span> Hub
          </h1>

          <p className="text-lg text-darker-gray mb-8 max-w-lg animate-slide-right delay-200">
            The future of student-alumni connection is here. Access resources, discover opportunities, 
            and connect with successful graduates who've walked your path.
          </p>

          <div className="flex flex-wrap gap-4 mb-12 animate-fade-in delay-300">
            <a 
              href="#features" 
              className="btn-primary bg-primary-color hover:bg-primary-dark text-white font-medium px-8 py-3 rounded-md transition-all"
            >
              Explore Features
            </a>
            <Link 
              to="/register" 
              className="btn-primary bg-white text-darkest-gray hover:text-primary-color font-medium px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-12 md:mt-0 relative sphere-container">
          <div 
            ref={sphereRef}
            className="relative mx-auto w-80 h-80 md:w-[26rem] md:h-[26rem] sphere"
            style={{ 
              transformStyle: 'preserve-3d',
            }}
          >
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(211, 234, 255, 0.7), rgba(114, 174, 255, 0.9))',
                boxShadow: '0 0 50px rgba(79, 70, 229, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.5)'
              }}
            >
              <div 
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(173, 216, 230, 0))',
                  opacity: 0.6,
                  animationDuration: '3s'
                }}
              ></div>
            </div>

            {featureIcons.map((feature, index) => {
              const { x, y, opacity, scale, isActive } = calculateIconPosition(
                index, 
                featureIcons.length, 
                activeFeatureIndex
              );
              
              return (
                <div 
                  key={feature.id}
                  className="absolute transition-all duration-700 ease-in-out"
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    top: '50%',
                    left: '50%',
                    opacity,
                  }}
                >
                  <div 
                    className={`bg-white rounded-full p-5 shadow-lg ${isActive ? 'animate-pulse' : ''}`}
                    style={{
                      transition: 'all 0.5s ease-out',
                      boxShadow: isActive 
                        ? '0 0 25px rgba(79, 70, 229, 0.6)' 
                        : '0 0 15px rgba(79, 70, 229, 0.3)',
                    }}
                  >
                    <div className="text-primary-color w-12 h-12 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <h3 
              className="text-xl font-bold text-primary-color transition-all duration-500 animate-fade-in"
              key={featureIcons[activeFeatureIndex].id}
            >
              {featureIcons[activeFeatureIndex].name}
            </h3>
            <p className="text-sm md:text-base text-darker-gray mt-2 max-w-md mx-auto">
              {featureIcons[activeFeatureIndex].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// New Informational Cards Section Component
const InfoCardsSectionIntegrated = () => {
  const [animationTriggered, setAnimationTriggered] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('info-cards');
      if (!section || animationTriggered) return;
      
      const sectionPosition = section.getBoundingClientRect();
      
      if (sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0) {
        setAnimationTriggered(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [animationTriggered]);

  const infoCards = [
    {
      id: 1,
      title: "Kolhapur Institute of Technology's College of Engineering (KITCOEK)",
      description: "Established in 1983, KITCOEK is a premier autonomous engineering and management institute in Kolhapur, Maharashtra. As the first self-financed engineering college in the state, it boasts a sprawling 30-acre campus equipped with modern infrastructure, including state-of-the-art laboratories, a central library, hostels, and recreational facilities. The institute offers undergraduate, postgraduate, and doctoral programs across various engineering disciplines, fostering a culture of academic excellence and innovation.",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      numberColor: "text-purple-400",
    },
    {
      id: 2,
      title: "KIT's Innovation and Research Foundation (IRF)",
      description: "KIT's IRF is a Section (8) company established under the Companies Act 2013, functioning as a technology business incubator supported by the Department of Science and Technology (DST), Government of India, under the NIDHI i-TBI initiative. Located within the KITCOEK campus, IRF aims to nurture innovation-driven technology startups by providing comprehensive support services, including funding assistance, intellectual property rights guidance, market connectivity, branding, networking, product development, and technology transfer.",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      numberColor: "text-amber-400",
    },
    {
      id: 3,
      title: "Team Network Nexus – Vision & Mission",
      description: (
        <>
          <strong className="block mb-2">Vision</strong>
          <p className="mb-4">To build a thriving student-alumni ecosystem that fosters support, growth, and long-term collaboration through innovation and connection.</p>
          <strong className="block mb-2">Mission</strong>
          <p>To empower students by enabling alumni-driven mentorship, internships, and knowledge sharing, while celebrating achievements and strengthening professional bonds.</p>
        </>
      ),
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      numberColor: "text-teal-400",
    }
  ];

  return (
    <section id="info-cards" className="py-20 bg-soft-gray">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-darkest-gray mb-4">
            About Nexus Hub
          </h2>
          <p className="text-darker-gray max-w-2xl mx-auto">
            Learn more about our institution, innovation foundation, and the team behind Nexus Hub.
          </p>
        </div>
          
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 max-w-7xl mx-auto">
          {infoCards.map((card, index) => (
            <div
              key={card.id}
              className={`
                info-card rounded-xl border ${card.borderColor} p-6 shadow-md transition-all duration-300
                ${card.bgColor} hover:shadow-lg transform hover:-translate-y-1
                ${animationTriggered ? 'animate-fade-in' : 'opacity-0'}
              `}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start mb-4">
                <div className={`w-10 h-10 rounded-full ${card.bgColor} border-2 ${card.borderColor} flex items-center justify-center font-bold text-xl ${card.numberColor} mr-4`}>
                  {card.id}
                </div>
                <h3 className="text-xl font-semibold text-darkest-gray">{card.title}</h3>
              </div>
              
              <div className="text-darker-gray mb-6 space-y-2">
                {card.description}
              </div>
              
              <Link 
                to={`/info/${card.id}`} 
                className={`inline-flex items-center py-2 px-4 rounded-md bg-white border ${card.borderColor} text-primary-color hover:bg-primary-color hover:text-white transition-colors duration-300`}
              >
                Learn More
                <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Integrated Footer Component
const FooterIntegrated = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <Network size={24} className="text-primary-color mr-2" />
              <span className="font-bold text-xl">
                <span className="text-primary-color">Nexus</span>Hub
              </span>
            </div>
            <p className="text-cool-gray text-sm">
              Connecting students with alumni for guidance, opportunities, and networking.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/knowledge-hub" className="text-cool-gray hover:text-primary-color transition-colors">Knowledge Hub</Link></li>
              <li><Link to="/hall-of-fame" className="text-cool-gray hover:text-primary-color transition-colors">Hall of Fame</Link></li>
              <li><Link to="/internships" className="text-cool-gray hover:text-primary-color transition-colors">Internships</Link></li>
              <li><Link to="/alumni" className="text-cool-gray hover:text-primary-color transition-colors">Explore Alumni</Link></li>
              <li><Link to="/events" className="text-cool-gray hover:text-primary-color transition-colors">Events</Link></li>
              <li><Link to="/mentorship" className="text-cool-gray hover:text-primary-color transition-colors">Mentorship</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-cool-gray hover:text-primary-color transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-cool-gray hover:text-primary-color transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="text-cool-gray hover:text-primary-color transition-colors">Cookie Policy</Link></li>
              <li><Link to="/accessibility" className="text-cool-gray hover:text-primary-color transition-colors">Accessibility</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex items-center mb-3">
              <Mail size={16} className="mr-2 text-cool-gray" />
              <a href="mailto:support@nexushub.com" className="text-cool-gray hover:text-primary-color transition-colors">
                support@nexushub.com
              </a>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-cool-gray hover:text-primary-color transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-cool-gray hover:text-primary-color transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-cool-gray hover:text-primary-color transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-gray mt-8 pt-8 text-center text-cool-gray text-sm">
          © 2023 Nexus Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Index;
