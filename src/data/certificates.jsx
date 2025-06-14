import { FaAward, FaCode, FaDatabase, FaCloud, FaShieldAlt, FaRobot, FaMobileAlt, FaMoneyBillWave, FaBrain, FaCogs, FaLinux, FaAtom, FaMicrochip, FaUsers } from 'react-icons/fa';

export const certificatesData = [
  {
    id: 1,
    title: 'Micromasters in Big Data Technology',
    issuer: 'Hong Kong University of Science and Technology',
    date: 'Dec 2023',
    description: 'Comprehensive program covering big data technologies, distributed systems, and data analytics with hands-on projects and real-world applications.',
    icon: <FaDatabase />,
    credential: 'https://credentials.edx.org/credentials/f8061338d6ea443181fc3b11b24a49bb/',
    canEmbed: false
  },
  {
    id: 2,
    title: 'Micromasters in Cybersecurity',
    issuer: 'Rochester Institute of Technology',
    date: 'Nov 2023',
    description: 'Advanced program in cybersecurity covering network security, cryptography, secure coding practices, and ethical hacking techniques.',
    icon: <FaShieldAlt />,
    credential: 'https://credentials.edx.org/credentials/79e1897ca05a4100b92b97687771d6eb/',
    canEmbed: false
  },
  {
    id: 3,
    title: 'Certified Oracle Database Foundations',
    issuer: 'Oracle',
    date: 'Oct 2023',
    description: 'Official certification validating skills in database design, SQL, and database administration fundamentals for Oracle database systems.',
    icon: <FaDatabase />,
    credential: 'https://tinyurl.com/yc28d5nr',
    canEmbed: false
  },
  {
    id: 4,
    title: 'Programming in C++ Certification',
    issuer: 'NPTEL',
    date: 'Sep 2023',
    description: 'Comprehensive certification in C++ programming covering object-oriented concepts, memory management, and advanced features.',
    icon: <FaCode />,
    credential: '#',
    canEmbed: false
  },
  {
    id: 5,
    title: 'Machine Learning Master',
    issuer: 'Altair',
    date: 'Aug 2023',
    description: 'Advanced certification in machine learning techniques, algorithms, and practical applications using Altair tools and platforms.',
    icon: <FaRobot />,
    credential: 'https://openbadgefactory.com/v1/assertion/036df2b4b0ce29eaedb39900a1ded618e9404977',
    canEmbed: false
  },
  {
    id: 6,
    title: 'Professional Certificate in Blockchain for Business',
    issuer: 'Linux FoundationX',
    date: 'Jul 2023',
    description: 'Comprehensive program on blockchain technologies, smart contracts, and business applications of distributed ledger technologies.',
    icon: <FaCode />,
    credential: 'https://credentials.edx.org/credentials/35a6225738e248c182c1ef87b86f2802/',
    canEmbed: false
  },
  {
    id: 7,
    title: 'Cloud Application Development Foundations',
    issuer: 'IBM',
    date: 'Jun 2023',
    description: 'Foundation course covering cloud-native application development, microservices architecture, and deployment on IBM Cloud.',
    icon: <FaCloud />,
    credential: 'https://credentials.edx.org/credentials/5f22791da593413fb972818c45787f31/',
    canEmbed: false
  },
  {
    id: 8,
    title: 'Professional Certificate in Cloud Solutions Architecture',
    issuer: 'AWS',
    date: 'May 2023',
    description: 'Comprehensive certification program covering AWS services, cloud architecture best practices, and solution design patterns.',
    icon: <FaCloud />,
    credential: 'https://credentials.edx.org/credentials/016a5eddbab94900be3851938c8e09f5/',
    canEmbed: false
  },
  {
    id: 9,
    title: 'DevOps on AWS',
    issuer: 'AWS',
    date: 'Apr 2023',
    description: 'Comprehensive course on DevOps practices and tools for AWS cloud infrastructure and application deployment.',
    icon: <FaCogs />,
    credential: 'https://credentials.edx.org/credentials/777bcc0b4a4940829b87c330e8e21945/',
    canEmbed: false
  },
  {
    id: 10,
    title: 'Fundamentals of Neuroscience',
    issuer: 'Harvard University',
    date: 'Mar 2023',
    description: 'Comprehensive introduction to the nervous system, brain function, and neurological processes.',
    icon: <FaBrain />,
    credential: 'https://credentials.edx.org/credentials/df91da51bbff4983a11bc680de2576af/',
    canEmbed: false
  },
  {
    id: 11,
    title: 'Professional Certificate in Human-Robot Interaction',
    issuer: 'University of Canterbury',
    date: 'Feb 2023',
    description: 'Specialized program covering the design and implementation of human-robot interaction systems, including perception, cognition, and social robotics.',
    icon: <FaRobot />,
    credential: 'https://credentials.edx.org/credentials/73b4dca90f2845cbb9f71bc56b1eb21c/',
    canEmbed: false
  },
  {
    id: 12,
    title: 'Introduction to Kubernetes and Cloud Native Technologies',
    issuer: 'The Linux Foundation',
    date: 'Jan 2023',
    description: 'Comprehensive introduction to container orchestration with Kubernetes and cloud-native application development.',
    icon: <FaCloud />,
    credential: 'https://credentials.edx.org/credentials/55d1716cb63a4937a73e44429384a63d/',
    canEmbed: false
  },
  {
    id: 13,
    title: 'Professional Certificate in OpenSource Software Development',
    issuer: 'Linux Foundation',
    date: 'Dec 2022',
    description: 'Comprehensive program covering Linux, Git, and open-source software development practices.',
    icon: <FaLinux />,
    credential: 'https://credentials.edx.org/credentials/831eb21bec2f4964b196af5156752015/',
    canEmbed: false
  },
  {
    id: 14,
    title: 'Rust Programming',
    issuer: 'Pragmatic AI Labs',
    date: 'Nov 2022',
    description: 'Comprehensive course on Rust programming language, memory safety, and systems programming.',
    icon: <FaCode />,
    credential: 'https://credentials.edx.org/credentials/f07b334cce124723819bca65c7c88537/',
    canEmbed: false
  },
  {
    id: 15,
    title: 'Secure Software Development Fundamentals',
    issuer: 'The Linux Foundation',
    date: 'Oct 2022',
    description: 'Essential principles and practices for developing secure software applications.',
    icon: <FaShieldAlt />,
    credential: 'https://credentials.edx.org/credentials/886a2c72e779461ab309cbbff7ca319c/',
    canEmbed: false
  },
  {
    id: 16,
    title: 'Fundamentals of Google AI for Web-Based Machine Learning',
    issuer: 'Google',
    date: 'Sep 2022',
    description: 'Introduction to AI and machine learning technologies for web-based applications using Google tools.',
    icon: <FaRobot />,
    credential: 'https://credentials.edx.org/credentials/0a02e3e92d64430a8523af929e5c54d0/',
    canEmbed: false
  },
  {
    id: 17,
    title: 'Professional Certificate in Leadership and Communication',
    issuer: 'HarvardX',
    date: 'Aug 2022',
    description: 'Comprehensive program on leadership skills, effective communication, and team management.',
    icon: <FaUsers />,
    credential: 'https://credentials.edx.org/credentials/9ca2fdd7f7c94f06aeb63a3501f9556e/',
    canEmbed: false
  },
  {
    id: 18,
    title: 'Oracle Certified Artificial Intelligence with Machine Learning in Java',
    issuer: 'Oracle',
    date: 'Jul 2022',
    description: 'Professional certification in AI and machine learning using Java programming language and Oracle technologies.',
    icon: <FaRobot />,
    credential: 'https://tinyurl.com/mpsxvenw',
    canEmbed: false
  },
  {
    id: 19,
    title: 'Quantum Computing with Semiconductor Technology',
    issuer: 'Delft University of Technology',
    date: 'Jun 2022',
    description: 'Advanced course on quantum computing principles and semiconductor-based quantum technologies.',
    icon: <FaAtom />,
    credential: 'https://credentials.edx.org/credentials/d5696bfe0235404b9f8674c50313a637/',
    canEmbed: false
  },
  {
    id: 20,
    title: 'Advanced Embedded Systems on Arm',
    issuer: 'ArmEducationX',
    date: 'May 2022',
    description: 'Advanced course on embedded systems development using ARM architecture and processors.',
    icon: <FaMicrochip />,
    credential: 'https://credentials.edx.org/credentials/0c1f00d38be94eaeae3e743d29afbbe9/',
    canEmbed: false
  },
  {
    id: 21,
    title: 'Professional Certificate in Stock Trading',
    issuer: 'New York Institute of Finance',
    date: 'Apr 2022',
    description: 'Comprehensive program on stock trading strategies, market analysis, and financial instruments from a leading financial education institution.',
    icon: <FaMoneyBillWave />,
    credential: 'https://credentials.edx.org/credentials/b99522ef5e04478daaae5e7f8eb2944c/',
    canEmbed: false
  }
];
