import { 
  FaReact, FaNodeJs, FaDatabase, FaServer, 
  FaMobileAlt, FaDocker, FaAws, FaShieldAlt 
} from 'react-icons/fa';

export const skillsData = [
  {
    id: 1,
    title: 'Frontend Development',
    category: 'frontend',
    icon: <FaReact />,
    skills: [
      'React.js & Next.js',
      'Three.js & WebGL',
      'HTML5, CSS3, SCSS',
      'JavaScript (ES6+)',
      'TypeScript',
      'Redux & Context API'
    ]
  },
  {
    id: 2,
    title: 'Backend Development',
    category: 'backend',
    icon: <FaNodeJs />,
    skills: [
      'Node.js & Express',
      'Python & FastAPI',
      'RESTful API Design',
      'GraphQL',
      'Authentication & Authorization',
      'Microservices Architecture'
    ]
  },
  {
    id: 3,
    title: 'Database Management',
    category: 'database',
    icon: <FaDatabase />,
    skills: [
      'MongoDB & Mongoose',
      'PostgreSQL',
      'MySQL',
      'Redis',
      'Database Design & Optimization',
      'ORM (Sequelize, Prisma)'
    ]
  },
  {
    id: 4,
    title: 'Server Management',
    category: 'backend',
    icon: <FaServer />,
    skills: [
      'Linux Administration',
      'Nginx & Apache',
      'Server Configuration',
      'Deployment Strategies',
      'Performance Optimization',
      'Monitoring & Logging'
    ]
  },
  {
    id: 5,
    title: 'Mobile Development',
    category: 'mobile',
    icon: <FaMobileAlt />,
    skills: [
      'React Native',
      'iOS & Android Development',
      'App Store Deployment',
      'Push Notifications',
      'Mobile UI/UX',
      'Offline Capabilities'
    ]
  },
  {
    id: 6,
    title: 'DevOps',
    category: 'devops',
    icon: <FaDocker />,
    skills: [
      'Docker & Kubernetes',
      'CI/CD Pipelines',
      'GitHub Actions',
      'Jenkins',
      'Infrastructure as Code',
      'Monitoring & Alerting'
    ]
  },
  {
    id: 7,
    title: 'Cloud Services',
    category: 'cloud',
    icon: <FaAws />,
    skills: [
      'AWS (EC2, S3, Lambda)',
      'Google Cloud Platform',
      'Microsoft Azure',
      'Serverless Architecture',
      'Cloud Deployment',
      'Cost Optimization'
    ]
  },
  {
    id: 8,
    title: 'Security',
    category: 'security',
    icon: <FaShieldAlt />,
    skills: [
      'Authentication Systems',
      'Data Encryption',
      'Security Best Practices',
      'OWASP Top 10',
      'Penetration Testing',
      'Vulnerability Assessment'
    ]
  }
];
