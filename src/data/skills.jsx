import { 
  FaCode, 
  FaRobot, 
  FaShieldAlt, 
  FaCloud, 
  FaDatabase, 
  FaDesktop, 
  FaServer, 
  FaTools 
} from 'react-icons/fa';

export const skillsData = [
  {
    id: 1,
    category: 'ml',
    title: 'Machine Learning & AI',
    icon: <FaRobot />,
    skills: [
      'PyTorch & TensorFlow',
      'Vision Transformers',
      'Graph Neural Networks',
      'Quantum ML (Qiskit)',
      'OpenCV & Computer Vision',
      'NLTK & NLP',
      'Scikit-learn',
      'Deep Learning (CNNs, RNNs)',
      'BERT & GPT Models',
      'Neural Architecture Search'
    ]
  },
  {
    id: 2,
    category: 'security',
    title: 'Cybersecurity',
    icon: <FaShieldAlt />,
    skills: [
      'Digital Forensics',
      'Penetration Testing',
      'Network Security',
      'Metasploit & Nmap',
      'EnCase & FTK Imager',
      'Threat Analysis',
      'Incident Response',
      'Vulnerability Assessment',
      'Ethical Hacking'
    ]
  },
  {
    id: 3,
    category: 'programming',
    title: 'Programming Languages',
    icon: <FaCode />,
    skills: [
    		'Java',
      'Python',
      'C/C++',
      'JavaScript',
      'R',
      'SQL',
      'Bash Scripting'
    ]
  },
  {
    id: 4,
    category: 'cloud',
    title: 'Cloud & DevOps',
    icon: <FaCloud />,
    skills: [
      'IBM Cloud',
      'Docker & Containers',
      'Kubernetes',
      'CI/CD Pipelines',
      'Linux Administration',
      'Git & Version Control'
    ]
  },
    {
    id: 4,
    category: 'devops',
    title: 'Cloud & DevOps',
    icon: <FaCloud />,
    skills: [
      'IBM Cloud',
      'Docker & Containers',
      'Kubernetes',
      'CI/CD Pipelines',
      'Linux Administration',
      'Git & Version Control'
    ]
  },
  {
    id: 5,
    category: 'backend',
    title: 'Backend Development',
    icon: <FaServer />,
    skills: [
      'Flask & FastAPI',
      'Node.js',
      'REST APIs',
      'Microservices',
      'API Gateway',
      'Server Architecture'
    ]
  },
  {
    id: 6,
    category: 'database',
    title: 'Databases',
    icon: <FaDatabase />,
    skills: [
      'PostgreSQL',
      'MongoDB',
      'MySQL',
      'Elasticsearch',
      'Database Design',
      'Query Optimization',
      'Data Modeling'
    ]
  },

  {
    id: 7,
    category: 'tools',
    title: 'Tools & Platforms',
    icon: <FaTools />,
    skills: [
      'GNS3 & Wireshark',
      'ELK Stack',
      'Postman',
      'Vim',
      'Podman',
      'ALTAIR AI Studio',
      'Docker Compose',
      'Monitoring Tools'
    ]
  },
  {
    id: 9,
    category: 'data',
    title: 'Data Science',
    icon: <FaRobot />,
    skills: [
      'Pandas & NumPy',
      'Matplotlib & Seaborn',
      'Statistical Analysis',
      'Feature Engineering',
      'Data Visualization',
      'Jupyter',
      'Research Methodology'
    ]
  }
];
