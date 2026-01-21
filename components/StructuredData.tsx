import Script from 'next/script'

interface StructuredDataProps {
  language: string
}

export default function StructuredData({ language }: StructuredDataProps) {
  const isZh = language === 'zh'

  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: isZh ? '蒋正兴' : 'Zhengxing Jiang',
    alternateName: isZh ? 'Zhengxing Jiang' : '蒋正兴',
    url: 'https://hi.sparkify.me',
    image: 'https://hi.sparkify.me/avatar.jpg',
    email: 'medianeras57@gmail.com',
    jobTitle: isZh ? '全栈工程师' : 'Full-Stack Engineer',
    description: isZh
      ? '9年全栈开发经验，曾任AI创业公司技术负责人。擅长AI/LLM应用开发、React、Next.js、Node.js、Python。'
      : '9 years of full-stack development experience. Former Tech Lead at AI startup. Expert in AI/LLM applications, React, Next.js, Node.js, Python.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: isZh ? '重庆' : 'Chongqing',
      addressCountry: isZh ? '中国' : 'China',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: isZh ? '重庆邮电大学' : 'Chongqing University of Posts and Telecommunications',
    },
    knowsAbout: [
      'AI/LLM',
      'React',
      'Next.js',
      'Node.js',
      'Python',
      'TypeScript',
      'RAG',
      'LangChain',
      'Full-Stack Development',
      'Software Engineering',
    ],
    sameAs: [
      'https://github.com/Jiangultimo',
    ],
  }

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isZh ? '蒋正兴的个人简历' : "Zhengxing Jiang's Resume",
    url: 'https://hi.sparkify.me',
    description: isZh
      ? '蒋正兴的在线个人简历，包含工作经验、技能和项目展示'
      : "Zhengxing Jiang's online resume, including work experience, skills and project showcase",
    author: {
      '@type': 'Person',
      name: isZh ? '蒋正兴' : 'Zhengxing Jiang',
    },
    inLanguage: isZh ? 'zh-CN' : 'en-US',
  }

  const profilePageData = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: isZh ? '蒋正兴' : 'Zhengxing Jiang',
      jobTitle: isZh ? '全栈工程师' : 'Full-Stack Engineer',
    },
  }

  return (
    <>
      <Script
        id="structured-data-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <Script
        id="structured-data-profile"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageData) }}
      />
    </>
  )
}
