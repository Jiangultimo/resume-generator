declare interface ContentUrl {
  name: string,
  url: string
}

declare interface Intro {
  label?: string
  value: string
  icon?: string
  link?: string
  // 兼容旧格式
  [key: string]: string | undefined
}

declare interface StringContent {
  title: string,
  data: string[]
}

declare interface Project {
  content: string,
  links?: ContentUrl[]
}

declare interface Experience {
  labels: string[],
  time: string,
  company: string,
  projects: Project[],
  position?: string
  companyDes?: string
}

declare interface ExperienceObject {
  title: string,
  data: Experience[]
}

declare interface Resume {
  title: string,
  intros: Intro[],
  skills: StringContent,
  evaluations: StringContent,
  experience: ExperienceObject
}
