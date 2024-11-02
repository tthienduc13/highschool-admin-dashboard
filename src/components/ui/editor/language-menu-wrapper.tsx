// import { Language, languages } from '@/settings/language'
// import { BadgeHelpIcon, HexagonIcon, VariableIcon } from 'lucide-react'
// import { useRef, useState } from 'react'

// const topLanguages: Language[] = ['en', 'es', 'vi', 'de', 'it', 'pt', 'ru', 'ja', 'zh_cn']
// const specialLanguages: Language[] = ['chem', 'math', 'unknown']

// export interface LanguageMenuProps {
//   isOpen: boolean
//   onClose: () => void
//   selected: Language
//   onChange: (l: Language) => void
//   isLazy?: boolean
//   children: React.ReactNode
// }

// export const LanguageMenuWrapper = ({ isOpen, onChange, selected, onClose, isLazy, children }: LanguageMenuProps) => {
//   const allLanguages = Object.entries(languages) as [Language, string][]
//   const [query, setQuery] = useState('')

//   const inputRef = useRef<HTMLInputElement>(null)
//   const containerRef = useRef<HTMLDivElement>(null)

//   function filterFn<T extends { name: string }>(item: T) {
//     const q = query.toLowerCase()
//     return item.name.toLowerCase().includes(q)
//   }

//   const topLanguagesGroup = topLanguages
//     .map((l) => ({
//       name: languages[l],
//       value: l,
//       isSelected: selected === l
//     }))
//     .filter(filterFn)

//   const specialLanguagesGroup = [
//     {
//       isSelected: selected === 'chem',
//       name: languages.chem,
//       value: 'chem' as const,
//       icon: <HexagonIcon size={18} />
//     },
//     {
//       isSelected: selected === 'math',
//       name: languages.math,
//       value: 'math' as const,
//       icon: <VariableIcon size={18} />
//     },
//     {
//       isSelected: selected === 'unknown',
//       name: languages.unknown,
//       value: 'unknown' as const,
//       icon: <BadgeHelpIcon size={18} />
//     }
//   ].filter(filterFn)

//   const allLanguagesGroup = allLanguages
//     .filter(([k]) => !topLanguages.includes(k) && !specialLanguages.includes(k))
//     .map(([value, name]) => ({
//       name,
//       value,
//       isSelected: selected === value
//     }))
//     .filter(filterFn)

//   const allFiltered = allLanguages.map((x) => ({ name: x[1], value: x[0] })).filter(filterFn)
//   const onSelect = (l: Language) => {
//     onChange(l)
//     onClose()
//   }
//   return <div></div>
// }
