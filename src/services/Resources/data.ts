import type { Resource } from '@/types'

// Consolidated resource data
export const allResources = {
  videos: [
    // freeCodeCamp videos
    {
      title: 'HTML & CSS Full Course - Beginner to Pro',
      description:
        'Complete HTML and CSS tutorial for beginners. Learn to build beautiful, responsive websites from scratch.',
      url: 'https://www.youtube.com/watch?v=G3e-cpL7ofc',
      category: 'Frontend, Video, HTML, CSS',
      by: 'SuperSimpleDev',
      channel: 'SuperSimpleDev',
      color: 'from-green-600 to-green-700',
      duration: '6:31:28',
      thumbnail: 'https://i.ytimg.com/vi/G3e-cpL7ofc/maxresdefault.jpg',
    },
    {
      title: 'JavaScript Full Course for Beginners',
      description:
        'Learn JavaScript from scratch with this comprehensive tutorial covering all the fundamentals.',
      url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
      category: 'JavaScript, Video, Programming',
      by: 'freeCodeCamp',
      channel: 'freeCodeCamp.org',
      color: 'from-green-600 to-green-700',
      duration: '3:26:42',
      thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
    },
    {
      title: "React Course - Beginner's Tutorial for React JavaScript Library",
      description:
        'Learn React JS in this full course for beginners. Work with components, props, state, hooks, and more.',
      url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
      category: 'React, Video, Frontend',
      by: 'freeCodeCamp',
      channel: 'freeCodeCamp.org',
      color: 'from-green-600 to-green-700',
      duration: '11:55:35',
      thumbnail: 'https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg',
    },

    // Traversy Media videos
    {
      title: 'HTML Crash Course For Absolute Beginners',
      description:
        'Learn HTML in just one hour! This crash course will get you started with web development.',
      url: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
      category: 'HTML, Video, Frontend',
      by: 'Brad Traversy',
      channel: 'Traversy Media',
      duration: '1:00:41',
      thumbnail: 'https://i.ytimg.com/vi/UB1O30fR-EE/maxresdefault.jpg',
    },
    {
      title: 'CSS Crash Course For Absolute Beginners',
      description:
        'Learn CSS in this crash course for beginners. Build beautiful, responsive layouts.',
      url: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
      category: 'CSS, Video, Frontend',
      by: 'Brad Traversy',
      channel: 'Traversy Media',
      duration: '1:25:06',
      thumbnail: 'https://i.ytimg.com/vi/yfoY53QXEnI/maxresdefault.jpg',
    },
    {
      title: 'Modern JavaScript From The Beginning 2.0',
      description:
        'Learn modern JavaScript from the beginning. ES6+, async/await, fetch API, and more.',
      url: 'https://www.youtube.com/watch?v=BI1o2H9z9fo',
      category: 'JavaScript, Video, Programming',
      by: 'Brad Traversy',
      channel: 'Traversy Media',
      duration: '21:54:28',
      thumbnail: 'https://i.ytimg.com/vi/BI1o2H9z9fo/maxresdefault.jpg',
    },

    // The Net Ninja videos
    {
      title: 'Vue 3 Tutorial for Beginners',
      description:
        'Learn Vue.js 3 from scratch in this comprehensive tutorial series. Build reactive web applications.',
      url: 'https://www.youtube.com/watch?v=YrxBCBibVo0',
      category: 'Vue, Video, Frontend',
      by: 'Shaun Pelling',
      channel: 'The Net Ninja',
      duration: '1:53:37',
      thumbnail: 'https://i.ytimg.com/vi/YrxBCBibVo0/maxresdefault.jpg',
    },
    {
      title: 'Next.js Tutorial for Beginners',
      description:
        'Learn Next.js from the ground up. Build full-stack React applications with SSR and API routes.',
      url: 'https://www.youtube.com/watch?v=A63UxsQsEbU',
      category: 'Next.js, Video, React, Frontend',
      by: 'Shaun Pelling',
      channel: 'The Net Ninja',
      duration: '4:13:09',
      thumbnail: 'https://i.ytimg.com/vi/A63UxsQsEbU/maxresdefault.jpg',
    },

    // Kevin Powell videos
    {
      title: 'Learn CSS Grid the easy way',
      description:
        'Master CSS Grid layout with this comprehensive tutorial. Build complex layouts with ease.',
      url: 'https://www.youtube.com/watch?v=rg7Fvvl3taU',
      category: 'CSS, Video, Layout',
      by: 'Kevin Powell',
      channel: 'Kevin Powell',
      duration: '25:21',
      thumbnail: 'https://i.ytimg.com/vi/rg7Fvvl3taU/maxresdefault.jpg',
    },
    {
      title: 'CSS Flexbox basics',
      description:
        'Learn the fundamentals of CSS Flexbox. Create responsive layouts easily.',
      url: 'https://www.youtube.com/watch?v=u044iM9xsWU',
      category: 'CSS, Video, Layout',
      by: 'Kevin Powell',
      channel: 'Kevin Powell',
      duration: '18:26',
      thumbnail: 'https://i.ytimg.com/vi/u044iM9xsWU/maxresdefault.jpg',
    },

    // Web Dev Simplified videos
    {
      title: 'Learn useState In 15 Minutes - React Hooks Explained',
      description:
        'Master React useState hook with practical examples and best practices.',
      url: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
      category: 'React, Video, Hooks',
      by: 'Kyle Cook',
      channel: 'Web Dev Simplified',
      duration: '15:46',
      thumbnail: 'https://i.ytimg.com/vi/O6P86uwfdR0/maxresdefault.jpg',
    },
    {
      title: 'JavaScript Promises In 10 Minutes',
      description:
        'Understand JavaScript Promises completely with clear examples and explanations.',
      url: 'https://www.youtube.com/watch?v=DHvZLI7Db8E',
      category: 'JavaScript, Video, Async',
      by: 'Kyle Cook',
      channel: 'Web Dev Simplified',
      duration: '10:28',
      thumbnail: 'https://i.ytimg.com/vi/DHvZLI7Db8E/maxresdefault.jpg',
    },

    // Fireship videos
    {
      title: 'JavaScript in 100 Seconds',
      description:
        'Learn JavaScript fundamentals in 100 seconds. Perfect for quick review or introduction.',
      url: 'https://www.youtube.com/watch?v=DHjqpvDnNGE',
      category: 'JavaScript, Video, Quick',
      by: 'Jeff Delaney',
      channel: 'Fireship',
      duration: '2:12',
      thumbnail: 'https://i.ytimg.com/vi/DHjqpvDnNGE/maxresdefault.jpg',
    },
    {
      title: 'React in 100 Seconds',
      description:
        'Learn React basics in 100 seconds. Components, JSX, and state explained quickly.',
      url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
      category: 'React, Video, Quick',
      by: 'Jeff Delaney',
      channel: 'Fireship',
      duration: '2:24',
      thumbnail: 'https://i.ytimg.com/vi/Tn6-PIqc4UM/maxresdefault.jpg',
    },
  ],

  documentation: [
    {
      title: 'MDN Web Docs - CSS Grid',
      description:
        'Official documentation for CSS Grid Layout with examples and browser compatibility',
      url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout',
      category: 'css, grid, layout',
      by: 'Mozilla',
    },
    {
      title: 'React Documentation',
      description:
        'Official React docs with interactive examples and best practices',
      url: 'https://react.dev',
      category: 'framework, javascript, frontend',
      by: 'React Team',
    },
    {
      title: 'React Router Documentation',
      description:
        'Declarative routing for React applications with hooks and components',
      url: 'https://reactrouter.com',
      category: 'react, routing, navigation',
      by: 'Remix Team',
    },
    {
      title: 'React Hook Form Documentation',
      description: 'Performant, flexible forms with easy validation for React',
      url: 'https://react-hook-form.com',
      category: 'react, forms, validation',
      by: 'React Hook Form Team',
    },
    {
      title: 'CSS-Tricks - Complete Guide to Flexbox',
      description: 'Comprehensive guide to CSS Flexbox with visual examples',
      url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox',
      category: 'css, layout',
      by: 'Chris Coyier',
    },
    {
      title: 'TypeScript Handbook',
      description:
        'Complete guide to TypeScript with examples and advanced concepts',
      url: 'https://www.typescriptlang.org/docs/',
      category: 'typescript',
      by: 'TypeScript Team',
    },
    {
      title: 'Next.js Documentation',
      description:
        'Production-ready React framework with server-side rendering',
      url: 'https://nextjs.org/docs',
      category: 'framework, react',
      by: 'Vercel',
    },
    {
      title: 'Tailwind CSS Docs',
      description:
        'Utility-first CSS framework documentation and component examples',
      url: 'https://tailwindcss.com/docs',
      category: 'css, framework',
      by: 'Tailwind Team',
    },
    {
      title: 'JavaScript30',
      description: '30 Day Vanilla JS Challenge - Build 30 things in 30 days',
      url: 'https://javascript30.com',
      category: 'javascript, tutorial',
      by: 'Wes Bos',
    },
    {
      title: 'Flexbox Froggy',
      description: 'Learn CSS Flexbox by helping Froggy and friends',
      url: 'https://flexboxfroggy.com',
      category: 'css',
      by: 'Thomas Park',
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'React Tutorial',
      description:
        'Interactive tutorial to learn React by building a tic-tac-toe game',
      url: 'https://react.dev/learn/tutorial-tic-tac-toe',
      category: 'react, tutorial, frontend',
      by: 'React Team',
    },
    {
      title: 'CSS Grid Garden',
      description: 'Learn CSS Grid by watering your carrot garden',
      url: 'https://cssgridgarden.com',
      category: 'css, grid, interactive',
      by: 'Codepip',
    },
    {
      title: 'Frontend Mentor',
      description: 'Real-world HTML, CSS and JavaScript challenges',
      url: 'https://www.frontendmentor.io',
      category: 'practice, html, css, javascript',
      by: 'Frontend Mentor',
    },
    {
      title: 'Codecademy',
      description: 'Interactive coding lessons and projects',
      url: 'https://www.codecademy.com',
      category: 'education, interactive, programming, courses',
      by: 'Codecademy Inc.',
    },
  ],

  tools: [
    {
      title: 'VS Code',
      description:
        'Free, powerful source-code editor with excellent frontend support',
      url: 'https://code.visualstudio.com',
      category: 'editor, development',
      by: 'Microsoft',
    },
    {
      title: 'Figma',
      description: 'Collaborative interface design tool for teams',
      url: 'https://figma.com',
      category: 'design, prototyping',
      by: 'Figma Inc.',
    },
    {
      title: 'Chrome DevTools',
      description:
        'Built-in browser developer tools for debugging and optimization',
      url: 'https://developer.chrome.com/docs/devtools',
      category: 'debugging, performance',
      by: 'Google',
    },
    {
      title: 'GitHub',
      description: 'Version control and collaboration platform for developers',
      url: 'https://github.com',
      category: 'version control',
      by: 'GitHub Inc.',
    },
    {
      title: 'Netlify',
      description: 'Deploy and host your frontend projects with ease',
      url: 'https://netlify.com',
      category: 'hosting',
      by: 'Netlify Inc.',
    },
    {
      title: 'Vercel',
      description: 'Deploy your React and Next.js projects instantly',
      url: 'https://vercel.com',
      category: 'hosting',
      by: 'Vercel Inc.',
    },
  ],
}

export const resources: Resource[] = [
  // Sample video resources for testing
  {
    id: '1',
    title: 'HTML & CSS Full Course - Beginner to Pro',
    description:
      'Complete HTML and CSS tutorial for beginners. Learn to build beautiful, responsive websites from scratch.',
    type: 'video',
    category: 'Frontend, Video, HTML, CSS',
    url: 'https://www.youtube.com/watch?v=G3e-cpL7ofc',
    duration: '6:31:28',
    author: 'SuperSimpleDev',
    channel: 'SuperSimpleDev',
    thumbnail: 'https://i.ytimg.com/vi/G3e-cpL7ofc/maxresdefault.jpg',
    difficulty: 'Beginner',
    tags: ['HTML', 'CSS', 'Frontend', 'Web Development'],
    rating: 4.8,
    views: 1200000,
    free: true,
  },
  {
    id: '2',
    title: 'Modern JavaScript From The Beginning 2.0',
    description:
      'Learn modern JavaScript from the beginning. ES6+, async/await, fetch API, and more.',
    type: 'video',
    category: 'JavaScript, Video, Programming',
    url: 'https://www.youtube.com/watch?v=BI1o2H9z9fo',
    duration: '21:54:28',
    author: 'Brad Traversy',
    channel: 'Traversy Media',
    thumbnail: 'https://i.ytimg.com/vi/BI1o2H9z9fo/maxresdefault.jpg',
    difficulty: 'Intermediate',
    tags: ['JavaScript', 'ES6', 'Programming', 'Web Development'],
    rating: 4.9,
    views: 850000,
    free: true,
  },
  {
    id: '3',
    title: 'Learn CSS Grid the easy way',
    description:
      'Master CSS Grid layout with this comprehensive tutorial. Build complex layouts with ease.',
    type: 'video',
    category: 'CSS, Video, Layout',
    url: 'https://www.youtube.com/watch?v=rg7Fvvl3taU',
    duration: '25:21',
    author: 'Kevin Powell',
    channel: 'Kevin Powell',
    thumbnail: 'https://i.ytimg.com/vi/rg7Fvvl3taU/maxresdefault.jpg',
    difficulty: 'Intermediate',
    tags: ['CSS', 'Grid', 'Layout', 'Frontend'],
    rating: 4.7,
    views: 320000,
    free: true,
  },
  {
    id: '4',
    title: 'React in 100 Seconds',
    description:
      'Learn React basics in 100 seconds. Components, JSX, and state explained quickly.',
    type: 'video',
    category: 'React, Video, Quick',
    url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
    duration: '2:24',
    author: 'Jeff Delaney',
    channel: 'Fireship',
    thumbnail: 'https://i.ytimg.com/vi/Tn6-PIqc4UM/maxresdefault.jpg',
    difficulty: 'Beginner',
    tags: ['React', 'JavaScript', 'Frontend', 'Quick'],
    rating: 4.6,
    views: 890000,
    free: true,
  },
]
