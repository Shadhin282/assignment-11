
// Mock Users
export const MOCK_USERS = [{
  id: 'u1',
  name: 'Alex Designer',
  email: 'alex@example.com',
  photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'user',
  joinedAt: '2023-01-15T10:00:00Z',
  bio: 'Passionate graphic designer looking for challenges.'
}, {
  id: 'u2',
  name: 'Sarah Creator',
  email: 'sarah@example.com',
  photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'creator',
  joinedAt: '2023-02-20T14:30:00Z',
  bio: 'I host the best design contests on the web.'
}, {
  id: 'u3',
  name: 'Admin User',
  email: 'admin@contesthub.com',
  photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'admin',
  joinedAt: '2023-01-01T00:00:00Z'
}, {
  id: 'u4',
  name: 'John Writer',
  email: 'john@example.com',
  photo: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'user',
  joinedAt: '2023-03-10T09:15:00Z'
}, {
  id: 'u5',
  name: 'Emily Gamer',
  email: 'emily@example.com',
  photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  role: 'user',
  joinedAt: '2023-04-05T16:45:00Z'
}];

// Mock Contests
export const MOCK_CONTESTS = [{
  id: 'c1',
  name: 'Modern Logo Design Challenge',
  image: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?auto=format&fit=crop&q=80&w=1000',
  description: 'Create a minimalist logo for a new tech startup focused on AI solutions. The design should be clean, scalable, and use blue tones.',
  price: 15,
  prizeMoney: 500,
  taskInstruction: 'Submit a high-resolution PNG and vector file link of your logo design.',
  type: 'Image Design',
  deadline: new Date(Date.now() + 86400000 * 5).toISOString(),
  // 5 days from now
  creatorId: 'u2',
  status: 'approved',
  participants: ['u1', 'u4', 'u5'],
  createdAt: '2023-10-01T10:00:00Z'
}, {
  id: 'c2',
  name: 'Future of Gaming Article',
  image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000',
  description: 'Write a 1500-word article predicting the state of gaming in 2030. Focus on VR, cloud gaming, and AI integration.',
  price: 10,
  prizeMoney: 300,
  taskInstruction: 'Submit a Google Doc link to your article.',
  type: 'Article Writing',
  deadline: new Date(Date.now() + 86400000 * 10).toISOString(),
  // 10 days from now
  creatorId: 'u2',
  status: 'approved',
  participants: ['u4'],
  createdAt: '2023-10-05T14:00:00Z'
}, {
  id: 'c3',
  name: 'Sustainable Business Pitch',
  image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000',
  description: 'Pitch a business idea that solves a local environmental issue. Must be profitable and scalable.',
  price: 25,
  prizeMoney: 1000,
  taskInstruction: 'Submit a PDF presentation or video pitch link.',
  type: 'Business Idea',
  deadline: new Date(Date.now() - 86400000 * 2).toISOString(),
  // Ended 2 days ago
  creatorId: 'u2',
  status: 'approved',
  participants: ['u1', 'u5'],
  winnerId: 'u1',
  createdAt: '2023-09-20T09:00:00Z'
}, {
  id: 'c4',
  name: 'RPG Game Review: Elden Ring',
  image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1000',
  description: 'Detailed review of Elden Ring focusing on open-world design and combat mechanics.',
  price: 5,
  prizeMoney: 150,
  taskInstruction: 'Submit link to your published review or blog post.',
  type: 'Gaming Review',
  deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
  // 2 days from now
  creatorId: 'u2',
  status: 'approved',
  participants: ['u5'],
  createdAt: '2023-10-10T11:30:00Z'
}, {
  id: 'c5',
  name: 'Abstract Art Cover',
  image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=1000',
  description: 'Design an abstract book cover for a sci-fi novel.',
  price: 20,
  prizeMoney: 400,
  taskInstruction: 'Submit your artwork link.',
  type: 'Image Design',
  deadline: new Date(Date.now() + 86400000 * 15).toISOString(),
  creatorId: 'u2',
  status: 'pending',
  // Pending approval
  participants: [],
  createdAt: '2023-10-12T16:00:00Z'
}];

// Mock Submissions
export const MOCK_SUBMISSIONS = [{
  id: 's1',
  contestId: 'c3',
  userId: 'u1',
  taskLink: 'https://docs.google.com/presentation/d/xyz',
  submittedAt: '2023-09-25T10:00:00Z',
  status: 'winner'
}, {
  id: 's2',
  contestId: 'c3',
  userId: 'u5',
  taskLink: 'https://youtube.com/watch?v=abc',
  submittedAt: '2023-09-26T14:00:00Z',
  status: 'pending'
}];