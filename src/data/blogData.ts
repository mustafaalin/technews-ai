import { BlogPost, Category } from '../types/blog';

export const categories: Category[] = [
  { id: '1', name: 'AI & Machine Learning', slug: 'ai-ml', count: 3 },
  { id: '2', name: 'Web Development', slug: 'web-dev', count: 1 },
  { id: '3', name: 'Mobile Tech', slug: 'mobile', count: 1 },
  { id: '4', name: 'Cloud Computing', slug: 'cloud', count: 1 },
  { id: '5', name: 'Cybersecurity', slug: 'security', count: 1 },
  { id: '6', name: 'Startups', slug: 'startups', count: 0 },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'OpenAI Releases GPT-4 Turbo with Enhanced Reasoning Capabilities',
    summary: 'OpenAI has unveiled GPT-4 Turbo, featuring improved reasoning abilities and reduced hallucinations. The new model shows significant improvements in mathematical problem-solving and code generation.',
    content: `OpenAI has announced the release of GPT-4 Turbo, marking a significant advancement in AI reasoning capabilities. The new model demonstrates remarkable improvements in mathematical problem-solving, code generation, and logical reasoning tasks.

Key improvements include:
- 40% reduction in hallucination rates
- Enhanced mathematical reasoning capabilities
- Improved code generation and debugging
- Better understanding of complex instructions
- Reduced computational costs for developers

The model is now available through OpenAI's API and is expected to revolutionize how developers integrate AI into their applications. Early testing shows significant improvements in accuracy across various domains, making it a game-changer for AI-powered applications.`,
    category: 'ai-ml',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    sourceUrl: 'https://openai.com/blog/gpt-4-turbo',
    publishDate: '2025-01-15',
    readTime: 3,
    tags: ['OpenAI', 'GPT-4', 'AI', 'Machine Learning'],
    author: 'AI Admin'
  },
  {
    id: '2',
    title: 'React 19 Beta Introduces Revolutionary Concurrent Features',
    summary: 'React 19 beta brings groundbreaking concurrent features including automatic batching, improved suspense, and new hooks that promise to transform how developers build user interfaces.',
    content: `React 19 beta has been released with revolutionary concurrent features that promise to transform frontend development. The new version introduces automatic batching, improved suspense capabilities, and several new hooks that enhance developer productivity.

Major new features:
- Automatic batching for better performance
- Enhanced Suspense with error boundaries
- New useFormStatus and useFormState hooks
- Improved server-side rendering
- Better TypeScript integration
- New use() hook for promises and context

These features aim to simplify state management and improve application performance. The React team has worked extensively on making these features backward-compatible while providing significant performance improvements.`,
    category: 'web-dev',
    imageUrl: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    sourceUrl: 'https://react.dev/blog/2024/02/15/react-19-beta',
    publishDate: '2025-01-14',
    readTime: 4,
    tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
    author: 'AI Admin'
  },
  {
    id: '3',
    title: 'Apple Vision Pro Sales Exceed Expectations in First Quarter',
    summary: 'Apple Vision Pro has sold over 600,000 units in its first quarter, exceeding analyst predictions. The mixed reality headset is gaining traction in enterprise and creative industries.',
    content: `Apple Vision Pro has achieved remarkable success in its first quarter, selling over 600,000 units and exceeding analyst expectations. The mixed reality headset has found strong adoption in enterprise applications and creative industries.

Key success metrics:
- 600,000+ units sold in Q1
- Strong enterprise adoption (40% of sales)
- Growing developer ecosystem with 1000+ native apps
- High customer satisfaction ratings (4.8/5)
- Significant interest from healthcare and education sectors

The device has particularly excelled in professional environments, with companies using it for training, design reviews, and remote collaboration. Apple has announced plans for a more affordable version targeting consumer markets.`,
    category: 'mobile',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    sourceUrl: 'https://apple.com/newsroom/vision-pro-q1-results',
    publishDate: '2025-01-13',
    readTime: 3,
    tags: ['Apple', 'VR', 'Mixed Reality', 'Technology'],
    author: 'AI Admin'
  },
  {
    id: '4',
    title: 'AWS Announces New AI-Powered Cloud Security Suite',
    summary: 'Amazon Web Services launches an AI-powered security suite that uses machine learning to detect and prevent cyber threats in real-time across cloud infrastructures.',
    content: `Amazon Web Services has launched a comprehensive AI-powered security suite that leverages machine learning to provide real-time threat detection and prevention across cloud infrastructures. The new suite represents a significant advancement in cloud security technology.

Key features include:
- Real-time threat detection using ML algorithms
- Automated incident response capabilities
- Behavioral analysis for anomaly detection
- Integration with existing AWS security tools
- Predictive threat modeling
- Compliance automation features

The suite has already been tested by major enterprise customers and has shown a 85% reduction in security incidents. This represents AWS's commitment to making cloud security more intelligent and automated.`,
    category: 'cloud',
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    sourceUrl: 'https://aws.amazon.com/security/ai-suite',
    publishDate: '2025-01-12',
    readTime: 4,
    tags: ['AWS', 'Cloud Security', 'AI', 'Cybersecurity'],
    author: 'AI Admin'
  },
  {
    id: '5',
    title: 'Microsoft Copilot Integration Expands to All Office Applications',
    summary: 'Microsoft announces that Copilot AI assistant will be integrated across all Office applications, bringing intelligent automation to Word, Excel, PowerPoint, and Outlook.',
    content: `Microsoft has announced a major expansion of its Copilot AI assistant, integrating it across all Office applications. This move brings intelligent automation and AI-powered assistance to Word, Excel, PowerPoint, and Outlook, transforming how users interact with these productivity tools.

New capabilities include:
- Intelligent document creation in Word
- Advanced data analysis in Excel
- Automated presentation design in PowerPoint
- Smart email composition in Outlook
- Cross-application workflow automation
- Natural language query processing

The integration is designed to enhance productivity while maintaining user control over content creation. Microsoft reports that early beta users have seen a 30% increase in productivity across various tasks.`,
    category: 'ai-ml',
    imageUrl: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800',
    sourceUrl: 'https://microsoft.com/copilot-office-integration',
    publishDate: '2025-01-11',
    readTime: 3,
    tags: ['Microsoft', 'Copilot', 'AI', 'Productivity'],
    author: 'AI Admin'
  },
  {
    id: '6',
    title: 'Google Quantum Computer Achieves New Milestone in Error Correction',
    summary: 'Google researchers have achieved a breakthrough in quantum error correction, bringing practical quantum computing closer to reality with their new 1000-qubit processor.',
    content: `Google researchers have achieved a significant breakthrough in quantum error correction with their new 1000-qubit processor. This advancement brings practical quantum computing applications closer to reality and represents a major step forward in the field.

Key achievements:
- 1000-qubit processor with improved stability
- 99.9% error correction accuracy
- Sustained quantum coherence for 100 seconds
- Successful execution of complex algorithms
- Demonstration of quantum advantage in specific problems

The breakthrough addresses one of the biggest challenges in quantum computing - maintaining quantum states long enough to perform useful calculations. This development paves the way for practical applications in cryptography, drug discovery, and complex optimization problems.`,
    category: 'ai-ml',
    imageUrl: 'https://images.pexels.com/photos/2348565/pexels-photo-2348565.jpeg?auto=compress&cs=tinysrgb&w=800',
    sourceUrl: 'https://quantum-ai.google/breakthrough-2024',
    publishDate: '2025-01-10',
    readTime: 4,
    tags: ['Google', 'Quantum Computing', 'Research', 'Technology'],
    author: 'AI Admin'
  },
  {
    id: '7',
    title: 'Major Data Breach Exposes 50 Million User Accounts Across Multiple Platforms',
    summary: 'A sophisticated cyberattack has compromised user data from several major social media platforms, highlighting critical vulnerabilities in current security infrastructure and prompting urgent security updates.',
    content: `A coordinated cyberattack has resulted in one of the largest data breaches of 2024, exposing personal information from over 50 million user accounts across multiple social media platforms. The breach has raised serious concerns about current cybersecurity practices and data protection measures.

Details of the breach:
- 50+ million user accounts compromised
- Personal data including emails, phone numbers, and encrypted passwords exposed
- Attack utilized advanced persistent threat (APT) techniques
- Multiple platforms affected simultaneously
- Breach discovered after 3 weeks of unauthorized access

Security experts believe the attack was carried out by a sophisticated threat actor group using zero-day exploits and social engineering tactics. The affected companies have implemented emergency security patches and are working with law enforcement agencies to investigate the incident.

This breach underscores the critical importance of implementing robust cybersecurity measures, including multi-factor authentication, regular security audits, and advanced threat detection systems. Users are advised to immediately change their passwords and enable two-factor authentication on all accounts.`,
    category: 'security',
    imageUrl: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800',
    sourceUrl: 'https://cybersecurity-news.com/major-breach-2024',
    publishDate: '2025-01-09',
    readTime: 5,
    tags: ['Data Breach', 'Cybersecurity', 'Privacy', 'Security'],
    author: 'AI Admin'
  }
];
