// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data


export const user = [
  {
    id: "clri6fs8e0000j8la4hdgf2i0",
  },
];


export const project = [
  {
    id: "clqhavzc5000008l4co714ot9",
    name: "Project Management App",
    description: "Project Management App",
  },
];

export const projectUser = [
  {
    user_id: user[0].id,
    project_id: project[0].id,
    role: "ADMIN",
  },
];

export const task_groups = [
  {
    id: "clqhamf0z000008lf46h3d42t",
    project_id: project[0].id,
    /*author_id: user[0].id,*/
    name: "User Interface Development",
    description: "User Interface Development",
    status: "Pending",
    progress: "3 / 7",
    criticality: "High",
  },
  {
    id: "clqhamyrj000108lf72730m2z",
    project_id: project[0].id,
    /*author_id: user[0].id,*/
    name: "Server Configuration",
    description: "Server Configuration",
    status: "In progress",
    progress: "10 / 10",
    criticality: "Critical",
  },
  {
    id: "clqhan80t000208lf0l5m11lm",
    project_id: project[0].id,
    /*author_id: user[0].id,*/
    name: "Functionality Testing",
    description: "Functionality Testing",
    status: "Completed",
    progress: "4 / 6",
    criticality: "High",
  },
  {
    id: "clqhanli4000308lf9r8ders1",
    project_id: project[0].id,
    /*author_id: user[0].id,*/
    name: "Code Review",
    description: "Code Review",
    status: "Paused",
    progress: "4 / 7",
    criticality: "Medium",
  },
  {
    id: "clqhanx05000408lfh4994o42",
    project_id: project[0].id,
    /*author_id: user[0].id,*/
    name: "Performance Optimization",
    description: "Performance Optimization",
    status: "Paused",
    progress: "1 /3",
    criticality: "Medium",
  },
  {
    id: "clqhao6gx000508lf913fdeby",
    project_id: project[0].id,
    /*author_id: user[0].id,*/
    name: "Development of New Features",
    description: "Development of New Features",
    status: "In progress",
    progress: "2/7",
    criticality: "Medium",
  },
  {
    id: "clqhaog3j000608lf5w2gfwra",
    project_id: project[0].id,
    /*author_id: user[0].id,*/
    name: "Technical Feasibility Analysis",
    description: "Technical Feasibility Analysis",
    status: "Paused",
    progress: "2 / 4",
    criticality: "Low",
  },
];

export const tasks = [
  //! Task Group 1 - Tasks - User Interface Development - clqhamf0z000008lf46h3d42t
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    /*author_id: user[0].id,*/
    name: "Design captivating homepage layout with interactive elements",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    /*author_id: user[0].id,*/
    name: "Implement responsive design for mobile and tablet devices",
    status: "In Progress",
    progress: 50,
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    /*author_id: user[0].id,*/
    name: "Develop sleek user registration form with validation logic",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    /*author_id: user[0].id,*/
    name: "Enhance user profile page with personalized widgets and preferences",
    status: "In Progress",
    progress: 30,
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    /*author_id: user[0].id,*/
    name: "Implement smooth transitions and animations for a seamless user experience",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    /*author_id: user[0].id,*/
    name: "Create a visually stunning gallery feature with image upload functionality",
    status: "In Progress",
    progress: 60,
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    /*author_id: user[0].id,*/
    name: "Implement real-time chat functionality with intuitive user interface",
    status: "Pending",
    progress: 0,
  },
  //! Task Group 2 - Tasks - Server Configuration - clqhamyrj000108lf72730m2z
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    /*author_id: user[0].id,*/
    name: "Install and configure web server",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    /*author_id: user[0].id,*/
    name: "Configure database server for optimal performance",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    /*author_id: user[0].id,*/
    name: "Optimize server security settings",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    /*author_id: user[0].id,*/
    name: "Configure load balancer for efficient resource distribution",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    /*author_id: user[0].id,*/
    name: "Implement server backup and recovery procedures",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    /*author_id: user[0].id,*/
    name: "Monitor server performance and troubleshoot issues",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    /*author_id: user[0].id,*/
    name: "Implement server updates and patches",
    status: "Completed",
    progress: 100,
  },
  //! Task Group 3 - Tasks - Functionality Testing - clqhan80t000208lf0l5m11lm
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    /*author_id: user[0].id,*/
    name: "Test user authentication and login functionality",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    /*author_id: user[0].id,*/
    name: "Verify data input validation and error handling",
    status: "In Progress",
    progress: 50,
  },
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    /*author_id: user[0].id,*/
    name: "Evaluate system response time under various loads",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    /*author_id: user[0].id,*/
    name: "Test compatibility with different browsers and devices",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    /*author_id: user[0].id,*/
    name: "Perform security testing and vulnerability assessments",
    status: "In Progress",
    progress: 75,
  },
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    /*author_id: user[0].id,*/
    name: "Conduct usability testing for enhanced user experience",
    status: "Pending",
    progress: 0,
  },
  //! Task Group 4 - Tasks - Code Review - 43c5ecfd-3888-4f45-b463-d2245778ebc8
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    /*author_id: user[0].id,*/
    name: "Review and provide feedback on frontend code structure",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    /*author_id: user[0].id,*/
    name: "Analyze and suggest improvements for backend code quality",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    /*author_id: user[0].id,*/
    name: "Check adherence to coding standards and best practices",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    /*author_id: user[0].id,*/
    name: "Collaborate with developers to address identified issues",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    /*author_id: user[0].id,*/
    name: "Review code documentation and ensure completeness",
    status: "In Progress",
    progress: 70,
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    /*author_id: user[0].id,*/
    name: "Perform security analysis on the codebase",
    status: "Pending",
    progress: 0,
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    /*author_id: user[0].id,*/
    name: "Evaluate code performance and suggest optimizations",
    status: "In Progress",
    progress: 50,
  },
  //! Task Group 5 - Tasks - Performance Optimization - clqhanx05000408lfh4994o42
  {
    task_group_id: "clqhanx05000408lfh4994o42",
    /*author_id: user[0].id,*/
    name: "Identify and optimize database queries for improved performance",
    status: "Completed",
    progress: 100,
  },
  {
    task_group_id: "clqhanx05000408lfh4994o42",
    /*author_id: user[0].id,*/
    name: "Implement caching strategies to reduce load times",
    status: "Paused",
    progress: 0,
  },
  {
    task_group_id: "clqhanx05000408lfh4994o42",
    /*author_id: user[0].id,*/
    name: "Optimize front-end code for faster rendering",
    status: "Paused",
    progress: 0,
  },
  //! Task Group 6 - Tasks - Development of New Features - clqhao6gx000508lf913fdeby
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    /*author_id: user[0].id,*/
    name: "Implement user authentication and authorization",
    status: "In Progress",
    progress: 30,
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    /*author_id: user[0].id,*/
    name: "Enhance user interface with modern design patterns",
    status: "In Progress",
    progress: 50,
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    /*author_id: user[0].id,*/
    name: "Integrate third-party APIs for additional functionality",
    status: "Pending",
    progress: 0,
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    /*author_id: user[0].id,*/
    name: "Optimize backend to handle increased load",
    status: "Pending",
    progress: 0,
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    /*author_id: user[0].id,*/
    name: "Implement real-time updates for user interactions",
    status: "Pending",
    progress: 0,
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    /*author_id: user[0].id,*/
    name: "Conduct usability testing for new features",
    status: "Pending",
    progress: 0,
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    /*author_id: user[0].id,*/
    name: "Document new features and updates for user reference",
    status: "Pending",
    progress: 0,
  },
  //! Task Group 7 - Tasks - Technical Feasibility Analysis - clqhaog3j000608lf5w2gfwra
  {
    task_group_id: "clqhaog3j000608lf5w2gfwra",
    /*author_id: user[0].id,*/
    name: "Evaluate hardware requirements for the new system",
    status: "Paused",
    progress: 0,
  },
  {
    task_group_id: "clqhaog3j000608lf5w2gfwra",
    /*author_id: user[0].id,*/
    name: "Assess the compatibility of existing software with the proposed changes",
    status: "Paused",
    progress: 0,
  },
  {
    task_group_id: "clqhaog3j000608lf5w2gfwra",
    /*author_id: user[0].id,*/
    name: "Investigate potential technical challenges and risks",
    status: "Pending",
    progress: 0,
  },
  {
    task_group_id: "clqhaog3j000608lf5w2gfwra",
    /*author_id: user[0].id,*/
    name: "Document findings and present technical feasibility report",
    status: "Pending",
    progress: 0,
  },
];

/* const customers = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Delba de Oliveira",
    email: "delba@oliveira.com",
    image_url: "/customers/delba-de-oliveira.png",
    phone: "123456789",
  },
  {
    id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
    name: "Lee Robinson",
    email: "lee@robinson.com",
    image_url: "/customers/lee-robinson.png",
    phone: "987654321",
  },
  {
    id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
    name: "Hector Simpson",
    email: "hector@simpson.com",
    image_url: "/customers/hector-simpson.png",
    phone: "555555555",
  },
  {
    id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
    name: "Steven Tey",
    email: "steven@tey.com",
    image_url: "/customers/steven-tey.png",
    phone: "111111111",
  },
  {
    id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
    name: "Steph Dietz",
    email: "steph@dietz.com",
    image_url: "/customers/steph-dietz.png",
    phone: "222222222",
  },
  {
    id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
    name: "Michael Novotny",
    email: "michael@novotny.com",
    image_url: "/customers/michael-novotny.png",
    phone: "333333333",
  },
  {
    id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
    name: "Evil Rabbit",
    email: "evil@rabbit.com",
    image_url: "/customers/evil-rabbit.png",
    phone: "444444444",
  },
  {
    id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
    name: "Emil Kowalski",
    email: "emil@kowalski.com",
    image_url: "/customers/emil-kowalski.png",
    phone: "555555555",
  },
  {
    id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
    name: "Amy Burns",
    email: "amy@burns.com",
    image_url: "/customers/amy-burns.png",
    phone: "666666666",
  },
  {
    id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
    name: "Balazs Orban",
    email: "balazs@orban.com",
    image_url: "/customers/balazs-orban.png",
    phone: "777777777",
  },
]; */

/* const revenue = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2200 },
  { month: "Apr", revenue: 2500 },
  { month: "May", revenue: 2300 },
  { month: "Jun", revenue: 3200 },
  { month: "Jul", revenue: 3500 },
  { month: "Aug", revenue: 3700 },
  { month: "Sep", revenue: 2500 },
  { month: "Oct", revenue: 2800 },
  { month: "Nov", revenue: 3000 },
  { month: "Dec", revenue: 4800 },
]; */
