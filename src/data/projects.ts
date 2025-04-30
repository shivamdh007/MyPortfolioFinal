import { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Smart Home Automation',
    description: 'IoT-based home automation system using Arduino and React',
    longDescription: 'This project brings the Internet of Things to your home, allowing you to control lights, temperature, and security systems through a smartphone app. Built with Arduino microcontrollers for the hardware interface and a React-based frontend for the user dashboard.',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['React', 'Node.js', 'Arduino', 'MQTT', 'CSS'],
    demo: 'https://demo.com',
    category: ['All', 'IoT', 'Web']
  },
  {
    id: '2',
    title: 'Weather Dashboard App',
    description: 'Weather forecasting application with location-based data',
    longDescription: 'A modern weather application that provides real-time forecasts, hourly and weekly predictions, and weather alerts. Built with React and integrates with the OpenWeatherMap API to fetch accurate weather data based on user location or search queries.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['React', 'TypeScript', 'OpenWeatherMap API', 'Tailwind CSS'],
    demo: 'https://demo.com',
    category: ['All', 'Web']
  },
  {
    id: '3',
    title: 'Task Management System',
    description: 'Full-stack to-do application with user authentication',
    longDescription: 'A comprehensive task management system that helps users organize their work and personal tasks. Features include task creation, due dates, priority levels, categorization, and a progress tracking dashboard. Built with a React frontend and a Node.js backend with MongoDB database.',
    image: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['JavaScript'],
    demo: 'https://todo-dusky-mu.vercel.app/',
    category: ['All', 'Web', 'Java']
  },
  {
    id: '4',
    title: 'Job Portal Application',
    description: 'A web application designed to bridge the gap between job seekers and employers',
    longDescription: ' A web application designed to bridge the gap between job seekers and employers. It allows users to register, create profiles, upload resumes, and apply for jobs, while employers can post job openings and manage applications. The portal streamlines the hiring process by providing an organized and user-friendly platform for both parties..',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['React', 'Node.js', 'Stripe API', 'MongoDB', 'Express'],
    demo: 'https://client-ivory-phi-92.vercel.app/',
    category: ['All', 'Web']
  },
  {
    id: '5',
    title: 'Portfolio Website',
    description: 'Personal portfolio website to showcase projects and skills',
    longDescription: 'A modern portfolio website built to showcase my skills, projects, and experience as a web developer. Features a clean, responsive design with animations, a dark mode toggle, and contact form functionality.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    technologies: ['Html', 'JavaScript', ' CSS',],
    demo: 'https://shivamdhuri.vercel.app/',
    category: ['All', 'Web']
  },
  
];