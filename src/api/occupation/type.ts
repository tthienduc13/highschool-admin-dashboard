export interface BulletPointSection {
    title: string
    bulletPoints: string[]
}

export interface CareerInfo {
    id?: string | null
    majorCodes: string[]
    name: string
    description: string
    detail: string
    chanceToFindJob: number
    minSalary: number
    averageSalary: number
    maxSalary: number
    knowledge: BulletPointSection[]
    skills: BulletPointSection[]
    abilities: BulletPointSection[]
    personality: BulletPointSection[]
    technology: BulletPointSection[]
}