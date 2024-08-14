// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

import { Status, Criticality, Role } from "@prisma/client";

export const testUser = {
  id: "clri6fs8e0000j8la4hdgf2i0",
  name: "Test User",
  email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL || "test@projectAdmin.com",
  password: process.env.NEXT_PUBLIC_TEST_USER_PASSWORD || "password",
};

export const project = [
  {
    id: "clqhavzc5000008l4co714ot9",
    name: "Project Management App",
    description:
      "The Project Management App is a dynamic and innovative solution aimed at streamlining the complexities of project execution. Focused on enhancing user experience and functionality, the project entails the development of a robust user interface, ensuring a seamless and intuitive interaction for all stakeholders involved. The app's server configuration component is pivotal, emphasizing the need for a secure and efficient infrastructure to support the diverse functionalities. With a critical eye on project criticality, the team is actively engaged in functionality testing, striving for a meticulous 6 out of 6 progress milestone. Code review and performance optimization, though momentarily paused, reflect our commitment to maintaining code quality and optimizing the app's performance for optimal user satisfaction. Development of new features is a dynamic aspect of the project, with ongoing progress towards a comprehensive set of seven features, each contributing to the project's overarching objectives. While navigating the intricacies of technical feasibility analysis, the project encounters periodic pauses to ensure a thorough evaluation of the technical landscape. This deliberate approach is complemented by a conscious consideration of criticality levels, ranging from high to low, to prioritize tasks effectively. The Project Management App, encapsulating these multifaceted dimensions, is poised to deliver a cutting-edge solution that not only meets but exceeds the expectations of stakeholders, setting a benchmark in project management excellence.",
  },
];

export const userOnProject = [
  {
    user_id: testUser.id,
    project_id: project[0].id,
    role: Role.OWNER,
  },
];

export const task_groups = [
  {
    id: "clqhamf0z000008lf46h3d42t",
    project_id: project[0].id,
    name: "User Interface Development",
    description:
      "Task group focused on designing and implementing the user interface. Requires collaboration between UI/UX designers and front-end developers. Critical for delivering a seamless and visually appealing product.",
    status: Status.PENDING,
    criticality: Criticality.HIGH,
  },
  {
    id: "clqhamyrj000108lf72730m2z",
    project_id: project[0].id,
    name: "Server Configuration",
    description:
      "Task group responsible for configuring and optimizing server settings. Involves collaboration with system administrators and backend developers. Critical for ensuring robust server performance.",
    status: Status.IN_PROGRESS,
    criticality: Criticality.CRITICAL,
  },
  {
    id: "clqhan80t000208lf0l5m11lm",
    project_id: project[0].id,
    name: "Functionality Testing",
    description:
      "Task group focused on thoroughly testing the functionality of the developed features. Involves coordination between QA testers and developers. Crucial for identifying and resolving bugs.",
    status: Status.IN_PROGRESS,
    criticality: Criticality.HIGH,
  },
  {
    id: "clqhanli4000308lf9r8ders1",
    project_id: project[0].id,
    name: "Code Review",
    description:
      "Task group responsible for conducting code reviews to ensure code quality and adherence to coding standards. Collaboration between senior developers and the development team is essential.",
    status: Status.PAUSED,
    criticality: Criticality.MEDIUM,
  },
  {
    id: "clqhanx05000408lfh4994o42",
    project_id: project[0].id,
    name: "Performance Optimization",
    description:
      "Task group focused on optimizing the performance of the application. Requires collaboration between performance engineers and developers. Critical for delivering a fast and efficient product.",
    status: Status.PAUSED,
    criticality: Criticality.MEDIUM,
  },
  {
    id: "clqhao6gx000508lf913fdeby",
    project_id: project[0].id,
    name: "Development of New Features",
    description:
      "Task group responsible for implementing new features as per project requirements. Collaboration between product managers and developers is crucial for delivering innovative functionalities.",
    status: Status.IN_PROGRESS,
    criticality: Criticality.MEDIUM,
  },
  {
    id: "clqhaog3j000608lf5w2gfwra",
    project_id: project[0].id,
    name: "Technical Feasibility Analysis",
    description:
      "Task group focused on analyzing the technical feasibility of proposed features. Requires collaboration between technical analysts and development teams. Critical for informed decision-making.",
    status: Status.PAUSED,
    criticality: Criticality.LOW,
  },
];

export const tasks = [
  //! Task Group 1 - Tasks - User Interface Development - clqhamf0z000008lf46h3d42t
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    name: "Design captivating homepage layout with interactive elements",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "In this completed task, the focus was on crafting an engaging homepage layout that goes beyond aesthetics. Collaborating closely with UI/UX designers, the team ensured the integration of interactive elements such as sliders, carousels, and call-to-action buttons. The goal was to create a visually stunning and user-centric design that aligns with brand identity and encourages user interaction. Thorough usability testing was conducted to validate the effectiveness of the design.",
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    name: "Implement responsive design for mobile and tablet devices",
    status: Status.IN_PROGRESS,
    progress: 50,
    description:
      "This ongoing task involves the implementation of a responsive design to guarantee optimal user experiences across diverse devices, including mobile phones and tablets. Developers are leveraging advanced CSS techniques, media queries, and flexible layouts to create a seamless and adaptive design. Addressing challenges related to varying screen sizes, touch interactions, and device-specific considerations is paramount to ensure a consistent and user-friendly experience. Rigorous testing on different devices is part of the ongoing process.",
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    name: "Develop sleek user registration form with validation logic",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "In this completed task, the team focused on developing a sleek user registration form with robust validation logic. The objective was to create a seamless onboarding experience for users, ensuring accurate and secure data collection. The form includes features such as real-time validation, error handling, and feedback to enhance user interaction. Rigorous testing was conducted to validate the functionality, security, and user-friendliness of the registration form.",
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    name: "Enhance user profile page with personalized widgets and preferences",
    status: Status.IN_PROGRESS,
    progress: 30,
    description:
      "This ongoing task revolves around enhancing the user profile page with personalized widgets and preferences. The team is working on creating a tailored experience for each user, providing customizable elements that align with individual preferences. The focus is on improving user engagement and satisfaction by incorporating features such as personalized dashboards and widget customization. Usability testing and user feedback are essential components of this iterative enhancement process.",
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    name: "Implement smooth transitions and animations for a seamless user experience",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "This completed task involved the implementation of smooth transitions and animations to create a seamless and visually appealing user experience. Collaborating closely with front-end developers and UI/UX designers, the team focused on enhancing the overall user journey. The animations were strategically implemented to provide visual cues, guide user interactions, and create a dynamic interface. Rigorous testing was conducted to ensure that the animations contribute positively to the overall user experience without causing distractions or delays.",
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    name: "Create a visually stunning gallery feature with image upload functionality",
    status: Status.IN_PROGRESS,
    progress: 60,
    description:
      "In this ongoing task, the team is dedicated to creating a visually stunning gallery feature with robust image upload functionality. The goal is to provide users with a rich multimedia experience, allowing them to showcase and share their content seamlessly. The feature includes capabilities such as batch image uploads, image sorting, and dynamic grid layouts. Extensive testing is underway to ensure the reliability, performance, and user-friendliness of the gallery feature across various devices and browsers.",
  },
  {
    task_group_id: "clqhamf0z000008lf46h3d42t",
    name: "Implement real-time chat functionality with intuitive user interface",
    status: Status.PENDING,
    progress: 0,
    description:
      "This pending task focuses on implementing real-time chat functionality with an intuitive user interface. The team aims to create a seamless communication experience, allowing users to interact in real-time. Key features include instant message delivery, user presence indicators, and an easy-to-use interface. The task involves careful consideration of server architecture, security protocols, and user experience design. Extensive testing, including stress testing for scalability, will be conducted before the feature is rolled out to users.",
  },
  //! Task Group 2 - Tasks - Server Configuration - clqhamyrj000108lf72730m2z
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    name: "Install and configure web server",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "This pivotal task, now completed, involved the meticulous installation and configuration of the web server. The server setup process included selecting the appropriate web server software, configuring essential parameters, and optimizing settings for performance and security. A thorough examination of compatibility with the chosen technology stack and consideration of scalability were integral to the success of this task. Rigorous testing and continuous monitoring were conducted to ensure the web server operates seamlessly under various conditions.",
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    name: "Configure database server for optimal performance",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "In this completed task, the focus was on configuring the database server to achieve optimal performance. The team meticulously tuned database settings, implemented indexing strategies, and fine-tuned query optimization to ensure efficient data retrieval and storage. Emphasis was placed on selecting the appropriate database management system (DBMS) and configuring it according to the project's specific requirements. Thorough testing and benchmarking were conducted to validate the database server's responsiveness and scalability under various workloads.",
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    name: "Optimize server security settings",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "This accomplished task involved a comprehensive approach to server security. The team focused on configuring and optimizing security settings to safeguard against potential threats and vulnerabilities. Implementation of firewalls, intrusion detection systems, and regular security audits were key components of this optimization process. The team also ensured the timely application of security patches and updates to maintain a robust defense against evolving cybersecurity risks. Rigorous testing and continuous monitoring were integral to guaranteeing the server's resilience against security threats.",
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    name: "Configure load balancer for efficient resource distribution",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "In this successfully completed task, the team focused on configuring a load balancer to achieve efficient resource distribution across servers. The load balancer was meticulously configured to evenly distribute incoming traffic, optimize resource utilization, and ensure high availability. Strategies for session persistence and health checks were implemented to enhance the load balancing algorithm. Rigorous testing and simulation of various traffic scenarios were conducted to validate the load balancer's effectiveness in maintaining system stability and responsiveness under varying workloads.",
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    name: "Implement server backup and recovery procedures",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "This completed task focused on the implementation of robust server backup and recovery procedures. The team developed and implemented a comprehensive backup strategy, including regular scheduled backups and real-time backup solutions for critical data. The recovery procedures were meticulously tested to ensure a swift and reliable recovery process in the event of data loss or system failure. Regular drills and testing were conducted to validate the efficiency and reliability of the backup and recovery mechanisms.",
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    name: "Monitor server performance and troubleshoot issues",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "In this successfully completed task, the team established a robust server monitoring system to continuously track and analyze server performance. Real-time monitoring tools were implemented to detect and diagnose potential issues, allowing for proactive troubleshooting. The team established performance benchmarks, thresholds, and alerts to ensure prompt response to any deviations from the expected performance. The task also involved creating comprehensive documentation for troubleshooting common issues, ensuring efficient incident response and resolution.",
  },
  {
    task_group_id: "clqhamyrj000108lf72730m2z",
    name: "Implement server updates and patches",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "This completed task involved the meticulous implementation of server updates and patches to maintain optimal performance and security. The team developed a systematic approach to monitor and apply updates, ensuring that the server's operating system, software, and dependencies were always up-to-date. The process included thorough testing in a staging environment to identify and mitigate potential compatibility issues. Regularly scheduled maintenance windows were established to minimize downtime during update implementation. The team also implemented rollback procedures to address unforeseen issues that might arise from updates.",
  },
  //! Task Group 3 - Tasks - Functionality Testing - clqhan80t000208lf0l5m11lm
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    name: "Test user authentication and login functionality",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "Conduct comprehensive testing on user authentication and login functionality. Begin by creating test cases covering various scenarios such as valid credentials, incorrect passwords, and user account lockouts. Utilize automation tools for repetitive tasks and manual testing for edge cases. Ensure thorough validation of user inputs, error handling, and session management. Document test results and provide feedback for any identified issues.",
  },
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    name: "Verify data input validation and error handling",
    status: Status.IN_PROGRESS,
    progress: 50,
    description:
      "Continuously assess data input validation mechanisms and error handling procedures. Develop test cases to cover a wide range of input scenarios including valid, invalid, and edge cases. Utilize both automated and manual testing techniques to verify input validation rules and error messages. Collaborate with developers to address identified issues promptly. Document test results and update validation procedures as necessary.",
  },
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    name: "Evaluate system response time under various loads",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "Perform load testing to evaluate system response time under different load conditions. Utilize load testing tools to simulate realistic user traffic and stress test the system. Measure and analyze response times for critical functionalities under normal and peak load scenarios. Identify performance bottlenecks and optimize system configurations as needed. Document performance metrics and share insights with the development team.",
  },
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    name: "Test compatibility with different browsers and devices",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "Conduct extensive testing to ensure compatibility across various browsers and devices. Test the application on popular browsers (Chrome, Firefox, Safari, Edge) and different device types (desktop, mobile, tablet). Pay special attention to responsive design elements and user interactions. Utilize browser testing tools and device emulators to simulate diverse environments. Document any compatibility issues and work with developers to implement necessary fixes.",
  },
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    name: "Perform security testing and vulnerability assessments",
    status: Status.IN_PROGRESS,
    progress: 75,
    description:
      "Execute comprehensive security testing and vulnerability assessments to identify potential risks and weaknesses in the system. Utilize automated security scanning tools and manual penetration testing techniques to uncover vulnerabilities. Assess the application's resilience against common security threats such as SQL injection, cross-site scripting (XSS), and authentication bypass. Prioritize identified vulnerabilities based on severity and impact. Collaborate with the development team to remediate security flaws and reinforce security measures.",
  },
  {
    task_group_id: "clqhan80t000208lf0l5m11lm",
    name: "Conduct usability testing for enhanced user experience",
    status: Status.PENDING,
    progress: 0,
    description:
      "Plan and conduct usability testing sessions to evaluate the application's user experience (UX) design. Recruit representative users to perform realistic tasks and provide feedback on usability, navigation, and overall user satisfaction. Utilize usability testing tools to capture user interactions and identify pain points. Analyze usability test results to prioritize UX improvements and refine user interface elements. Collaborate with designers and developers to implement enhancements that optimize user experience and drive user engagement.",
  },
  //! Task Group 4 - Tasks - Code Review - 43c5ecfd-3888-4f45-b463-d2245778ebc8
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    name: "Review and provide feedback on frontend code structure",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "As part of this task, carefully examine the frontend codebase. Focus on evaluating code structure, organization, and adherence to coding standards. Pay particular attention to modularity, readability, and maintainability. Identify areas for potential code refactoring and optimization to enhance overall performance and scalability. Provide constructive feedback to the frontend developers, emphasizing best practices and offering specific suggestions for improvement. Document your review findings comprehensively and collaborate with the team to promptly address any identified issues. Aim for a codebase that not only meets standards but also fosters efficient collaboration and future development.",
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    name: "Analyze and suggest improvements for backend code quality",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "Your objective in this task is to conduct a detailed analysis of the backend code quality. Assess the architecture, scalability, and maintainability of the codebase. Review adherence to design patterns, SOLID principles, and established coding standards. Identify opportunities for code reuse, abstraction, and optimization. Work closely with backend developers to streamline the code structure and enhance overall system performance. Provide actionable recommendations for improving code quality, ensuring that the backend codebase is robust, efficient, and aligns with industry best practices.",
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    name: "Check adherence to coding standards and best practices",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "In this task, thoroughly evaluate the entire codebase for adherence to coding standards and best practices. Scrutinize coding style, naming conventions, and documentation practices to ensure consistency and readability. Utilize static code analysis tools to identify any deviations from established standards. Provide constructive feedback to developers on areas that require improvement and reinforce coding guidelines through code reviews and documentation. Foster a culture of code quality and continuous improvement within the development team, ensuring a collective commitment to maintaining a high standard of coding practices",
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    name: "Collaborate with developers to address identified issues",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "As you collaborate with the development team, prioritize addressing any issues identified during code reviews. Foster open communication and a collaborative spirit to facilitate problem-solving and knowledge sharing. Prioritize tasks based on their impact and urgency, ensuring timely resolution of identified issues. Encourage developers to seek clarification and guidance when addressing complex technical challenges. Monitor progress closely and provide support as needed to ensure successful resolution of identified issues, promoting a unified effort toward maintaining a healthy and efficient codebase.",
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    name: "Review code documentation and ensure completeness",
    status: Status.IN_PROGRESS,
    progress: 70,
    description:
      "For this task, meticulously review the code documentation to ensure its completeness, accuracy, and alignment with project requirements. Verify that code comments, inline documentation, and README files offer comprehensive coverage of code functionality and provide clear usage instructions. Identify areas where documentation may be lacking or outdated and collaborate with developers to fill any gaps. Encourage developers to maintain documentation as the code evolves and new features are implemented. Foster a culture of documentation excellence to facilitate knowledge transfer and streamline onboarding for new team members.",
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    name: "Perform security analysis on the codebase",
    status: Status.PENDING,
    progress: 0,
    description:
      "Prepare for a comprehensive security analysis of the codebase in this task. Utilize static code analysis tools, security scanners, and manual code review techniques to identify potential vulnerabilities and security risks. Prioritize identified vulnerabilities based on their severity and impact on system security. Collaborate with developers to implement security best practices and remediate any identified vulnerabilities promptly. Ensure ongoing security testing and monitoring to mitigate emerging threats and maintain the integrity of the codebase. Strive for a robust and secure codebase that safeguards against potential security threats.",
  },
  {
    task_group_id: "clqhanli4000308lf9r8ders1",
    name: "Evaluate code performance and suggest optimizations",
    status: Status.IN_PROGRESS,
    progress: 50,
    description:
      "Your focus in this task is to evaluate code performance metrics and identify areas for optimization, enhancing system scalability and responsiveness. Use profiling tools and performance monitoring techniques to analyze code execution time, memory usage, and resource consumption. Identify performance bottlenecks and areas of inefficient code logic. Collaborate closely with developers to implement optimizations that enhance the overall performance of the codebase. Aim for a well-optimized codebase that delivers efficient and responsive system behavior, ensuring a positive user experience.",
  },
  //! Task Group 5 - Tasks - Performance Optimization - clqhanx05000408lfh4994o42
  {
    task_group_id: "clqhanx05000408lfh4994o42",
    name: "Identify and optimize database queries for improved performance",
    status: Status.COMPLETED,
    progress: 100,
    description:
      "Embark on a comprehensive analysis of the database queries within the codebase. Identify queries contributing to performance bottlenecks by utilizing profiling tools and query optimization techniques. Collaborate with database administrators and developers to implement optimized queries, indexing strategies, and caching mechanisms. Monitor database performance metrics to ensure significant improvements. Document your findings, optimizations applied, and communicate insights to the team for knowledge sharing. Strive for a well-tuned database layer that enhances overall system performance and responsiveness.",
  },

  {
    task_group_id: "clqhanx05000408lfh4994o42",
    name: "Implement caching strategies to reduce load times",
    status: Status.PAUSED,
    progress: 0,
    description:
      "In this task, focus on implementing effective caching strategies to reduce system load times. Identify critical areas of the application where caching can be applied to store and retrieve frequently accessed data. Collaborate with the development team to integrate caching mechanisms, such as in-memory caching or distributed caching solutions. Evaluate cache expiration policies and update strategies to ensure data consistency. Test the impact of caching on overall system performance. Document your caching implementation details and collaborate with the team to determine optimal caching configurations. Aim for a well-implemented caching system that significantly improves application responsiveness and user experience.",
  },

  {
    task_group_id: "clqhanx05000408lfh4994o42",
    name: "Optimize front-end code for faster rendering",
    status: Status.PAUSED,
    progress: 0,
    description:
      "Dive into the front-end codebase to optimize rendering performance and enhance the user experience. Identify areas of the code impacting rendering speed, such as inefficient DOM manipulations or excessive reflows. Collaborate with front-end developers to implement performance-oriented techniques, including code splitting, lazy loading, and optimizing critical rendering paths. Utilize performance profiling tools to measure improvements. Document your optimization strategies, including code changes and their impact on rendering times. Share insights with the team and foster a culture of continuous front-end performance improvement. Strive for a visually responsive and snappy user interface that positively influences user engagement.",
  },

  //! Task Group 6 - Tasks - Development of New Features - clqhao6gx000508lf913fdeby
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    name: "Implement user authentication and authorization",
    status: Status.IN_PROGRESS,
    progress: 30,
    description:
      "Undertake the implementation of robust user authentication and authorization mechanisms. Ensure secure user access to the system by integrating industry-standard authentication protocols. Collaborate closely with backend developers to establish a secure authorization framework, defining user roles and permissions. Implement token-based authentication for enhanced security. Regularly test and validate authentication processes to identify and address potential vulnerabilities. Document your implementation details, including security measures applied, and communicate with the team to ensure a cohesive integration with the overall system architecture.",
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    name: "Enhance user interface with modern design patterns",
    status: Status.IN_PROGRESS,
    progress: 50,
    description:
      "Elevate the user interface by incorporating modern design patterns and principles. Collaborate with UI/UX designers to implement visually appealing and intuitive interface elements. Focus on enhancing user interactions, navigation, and overall aesthetics. Integrate responsive design principles to ensure a seamless experience across various devices. Regularly gather user feedback and iterate on design improvements. Document your design decisions and collaborate with the development team to ensure smooth implementation. Strive for a user interface that not only meets functional requirements but also delights users with a modern and engaging visual experience.",
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    name: "Integrate third-party APIs for additional functionality",
    status: Status.PENDING,
    progress: 0,
    description:
      "Prepare to integrate third-party APIs to enhance the system's functionality. Identify relevant APIs that align with project requirements and collaborate with backend developers for seamless integration. Consider aspects such as authentication mechanisms, data formats, and error handling during the integration process. Document the integration steps and potential dependencies. Verify API functionality through thorough testing, ensuring reliability and performance. Communicate with the team to coordinate the integration effort and address any challenges that may arise. Aim for a well-integrated system that leverages external APIs to provide enhanced features and capabilities.",
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    name: "Optimize backend to handle increased load",
    status: Status.PENDING,
    progress: 0,
    description:
      "Prepare for optimizing the backend to handle increased system load and ensure optimal performance. Collaborate with backend developers to identify potential scalability bottlenecks. Implement strategies such as load balancing, caching, and database optimizations to enhance backend efficiency. Conduct stress testing to simulate increased loads and identify performance constraints. Document optimization strategies and work closely with the team to implement them effectively. Prioritize scalability and responsiveness to ensure the backend can accommodate growing user demands. Aim for a well-architected backend that seamlessly scales with increasing system usage.",
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    name: "Implement real-time updates for user interactions",
    status: Status.PENDING,
    progress: 0,
    description:
      "Embark on implementing real-time updates to provide users with instant and dynamic interactions. Explore suitable technologies such as WebSockets or server-sent events to enable real-time communication between the client and server. Collaborate closely with frontend developers to integrate real-time features seamlessly into the user interface. Test and validate real-time functionality to ensure responsiveness and reliability. Document your implementation details, including the chosen technologies and considerations. Communicate with the team to ensure a coordinated effort in integrating real-time updates for an enhanced user experience.",
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    name: "Conduct usability testing for new features",
    status: Status.PENDING,
    progress: 0,
    description:
      "Prepare for conducting usability testing on newly implemented features to ensure an optimal user experience. Define usability testing scenarios and criteria for evaluation. Collaborate with UX designers and gather feedback from potential users. Conduct usability tests, observe user interactions, and collect valuable insights. Document test results and collaborate with the development team to address any identified usability issues. Iterate on features based on usability feedback to enhance overall user satisfaction. Aim for features that not only meet functional requirements but also provide an intuitive and user-friendly experience.",
  },
  {
    task_group_id: "clqhao6gx000508lf913fdeby",
    name: "Document new features and updates for user reference",
    status: Status.PENDING,
    progress: 0,
    description:
      "Prioritize comprehensive documentation of newly implemented features and updates. Create user-friendly documentation that explains the functionality, purpose, and usage of each feature. Include step-by-step guides, screenshots, and examples to facilitate user understanding. Collaborate with technical writers if necessary to ensure clarity and completeness. Regularly update documentation as features evolve. Communicate with the team to align on documentation standards and share knowledge effectively. Aim for documentation that serves as a valuable resource for both users and developers, enhancing the overall user experience.",
  },
  //! Task Group 7 - Tasks - Technical Feasibility Analysis - clqhaog3j000608lf5w2gfwra

  {
    task_group_id: "clqhaog3j000608lf5w2gfwra",
    name: "Evaluate hardware requirements for the new system",
    status: Status.PAUSED,
    progress: 0,
    description:
      "Initiate a comprehensive evaluation of hardware requirements for the upcoming system. Collaborate with system architects to understand the projected workload and performance expectations. Assess hardware components such as processors, memory, and storage to ensure they align with the system's demands. Consider scalability and future expansion needs in your evaluation. Document your hardware requirements, specifying models and configurations. Communicate with the team to validate and refine hardware choices. Aim for a well-defined hardware foundation that supports the system's functionality and anticipated growth.",
  },
  {
    task_group_id: "clqhaog3j000608lf5w2gfwra",
    name: "Assess the compatibility of existing software with the proposed changes",
    status: Status.PAUSED,
    progress: 0,
    description:
      "Conduct a thorough assessment of existing software compatibility with proposed system changes. Identify software components that may be affected by upcoming modifications. Collaborate with software developers to understand potential challenges and dependencies. Document your compatibility assessment, including identified risks and mitigations. Communicate with the team to discuss necessary adjustments and ensure a seamless integration process. Aim for compatibility between existing software and proposed changes to minimize disruptions and maintain system stability.",
  },
  {
    task_group_id: "clqhaog3j000608lf5w2gfwra",
    name: "Investigate potential technical challenges and risks",
    status: Status.PENDING,
    progress: 0,
    description:
      "Embark on a proactive investigation of potential technical challenges and risks associated with the upcoming project. Collaborate with domain experts and developers to anticipate and identify potential hurdles. Analyze technical aspects such as system architecture, data flow, and third-party integrations. Document identified challenges and risks along with proposed mitigation strategies. Communicate with the team to ensure a collective understanding of potential roadblocks. Prioritize preemptive solutions to minimize project delays and enhance overall project resilience.",
  },
  {
    task_group_id: "clqhaog3j000608lf5w2gfwra",
    name: "Document findings and present technical feasibility report",
    status: Status.PENDING,
    progress: 0,
    description:
      "Conclude the investigation by documenting your findings and presenting a comprehensive technical feasibility report. Structure the report to include an executive summary, technical challenges, proposed solutions, and risk assessments. Collaborate with technical writers if necessary to ensure clarity and coherence. Prepare a presentation summarizing key findings and recommendations. Communicate with stakeholders to gather feedback and refine your report. Aim for a well-documented technical feasibility report that serves as a valuable resource for decision-making and project planning.",
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
