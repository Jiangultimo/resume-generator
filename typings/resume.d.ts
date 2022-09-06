declare interface ContentUrl {
  name: string,
  url: string
}

declare interface Project {
  content: string,
  links?: ContentUrl[]
}

declare interface Experience {
  skills: string[],
  time: string,
  company: string,
  projects: Project[],
  position?: string
  companyDes?: string
}

declare interface Intro {
  [key: string]: string
}

declare interface StringContent {
  title: string,
  data: string[]
}

declare interface Resume {
  intros: Intro[],
  skills: StringContent,
  evaluations: StringContent,
  experiences: Experience[]
}
