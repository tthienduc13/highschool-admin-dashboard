import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Filter, Search } from 'lucide-react'
import { generateYearOptions, getRandomHexColor } from "@/lib/utils"
import { useSchoolFilterQuery } from '@/api/schools/query'
import { Combobox } from '@/components/ui/combobox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useProvincesQuery } from '@/api/province/query'
import { FancyBox, FancyBoxType } from '@/components/ui/fancy-box'
import { UseGetSubjectsQuery } from '@/api/subject/query'
import { useCurriculumQuery } from '@/api/curriculum/query'

export interface DocumentFilter {
    schoolId: string | null,
    subjectIds: string[],
    semester: number | null,
    documentYear: number | null,
    provinceId: string | null,
    categoryIds: string[],
    curriculumIds: string[],
    search: string
}

interface FilterDocumentProps {
    filters: DocumentFilter,
    setFilters: React.Dispatch<React.SetStateAction<DocumentFilter>>,
    handleFilter: () => void
}

export const FilterDocument = ({ filters, setFilters, handleFilter }: FilterDocumentProps) => {

    const { data: provinces } = useProvincesQuery({
        pageSize: 20,
        pageNumber: 1
    })

    const { data: schools, isPending: isSchoolLoading } = useSchoolFilterQuery({
        pageSize: 20,
        pageNumber: 1,
        provinceId: filters.provinceId
    });

    const { data: subjects, isPending: isSubjectLoading } = UseGetSubjectsQuery({
        pageNumber: 1,
        pageSize: 10
    });

    const { data: curriculums } = useCurriculumQuery();

    const [selectedSubject, setSelectedSubject] = useState<FancyBoxType[]>([])

    const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)

    const handleFilterChange = (filterName: string, value: string | string[] | Date | null) => {
        setFilters(prev => ({ ...prev, [filterName]: value }))
        // set pageIndex = 1
    }

    const categories = ['Grade 10', 'Grade 11', 'Grade 12']

    useEffect(() => {
        handleFilterChange('subjectIds', selectedSubject.map(subject => subject.value))
    }, [selectedSubject])

    const clearFilters = () => {
        setFilters({
            schoolId: null,
            subjectIds: [],
            semester: null,
            documentYear: null,
            provinceId: null,
            categoryIds: [],
            curriculumIds: [],
            search: ''
        })
        // set pageIndex = 1
    }

    const activeFiltersCount = Object.values(filters).filter(value =>
        value !== '' && value !== null && (Array.isArray(value) ? value.length > 0 : true)
    ).length

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
            <div className="relative flex-grow">
                <Input
                    type="text"
                    placeholder="Search documents..."
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="mr-2" size={20} />
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                                {activeFiltersCount}
                            </span>
                        )}
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-[35vw]">
                    <DialogHeader>
                        <DialogTitle>Filter Documents</DialogTitle>
                        <DialogDescription>
                            Apply filters to narrow down the document list.
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] mt-4">
                        <div className="space-y-4 pr-4">
                            <div className='flex justify-between'>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Year</Label>
                                    <Combobox
                                        items={generateYearOptions(2000, new Date().getFullYear(), 'desc')}
                                        setValue={(value) => handleFilterChange('documentYear', value)}
                                        value={filters.documentYear?.toString() ?? ''}
                                        placeHolder="Select Year"
                                        className="w-full"
                                    />

                                </div>

                                <div className="space-y-6 flex flex-col">
                                    <Label className="text-sm font-semibold">Semester</Label>
                                    <RadioGroup
                                        defaultValue={filters.semester?.toString() ?? ''}
                                        onValueChange={(value) => handleFilterChange('semester', value)}
                                        className='flex'
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="1" id="r1" />
                                            <Label htmlFor="r1">Semester 1</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="2" id="r2" />
                                            <Label htmlFor="r2">Semester 2</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-semibold">Province</Label>
                                <Combobox
                                    items={provinces?.data.map(province => {
                                        return {
                                            label: province.provinceName,
                                            value: province.provinceId.toString()
                                        }
                                    }) ?? []}
                                    setValue={value => handleFilterChange('provinceId', value)}
                                    value={filters.provinceId ?? ''}
                                    placeHolder='Select Province'
                                    className='w-full'
                                />
                            </div>
                            <div className="flex space-y-2 flex-col">
                                <Label className="text-sm font-semibold">School</Label>
                                <Combobox
                                    items={schools?.data.map(school => {
                                        return {
                                            label: school.schoolName,
                                            value: school.id
                                        }
                                    }) ?? []}
                                    setValue={value => handleFilterChange('schoolId', value)}
                                    value={filters.schoolId ?? ''}
                                    placeHolder='Select School'
                                    disabled={isSchoolLoading}
                                    className='w-full'
                                />
                            </div>

                            <div className='flex gap-16'>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Categories</Label>
                                    <div className="space-y-2">
                                        {categories.map(category => (
                                            <div key={category} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`category-${category}`}
                                                    checked={filters.categoryIds.includes(category)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            handleFilterChange('categoryIds', [...filters.categoryIds, category])
                                                        } else {
                                                            handleFilterChange('categoryIds', filters.categoryIds.filter(id => id !== category))
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`category-${category}`}>{category}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Curriculums</Label>
                                    <div className="space-y-2">
                                        {curriculums?.map(curriculum => (
                                            <div key={curriculum.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`curriculum-${curriculum}`}
                                                    checked={filters.curriculumIds.includes(curriculum.id)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            handleFilterChange('curriculumIds', [...filters.curriculumIds, curriculum.id])
                                                        } else {
                                                            handleFilterChange('curriculumIds', filters.curriculumIds.filter(id => id !== curriculum.id))
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={`curriculum-${curriculum}`}>{curriculum.curriculumName}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className='flex flex-col gap-2'>
                                <Label className="text-sm font-semibold">Subjects</Label>
                                <FancyBox
                                    items={subjects?.data.map(subject => {
                                        return {
                                            label: subject.subjectName,
                                            value: subject.id,
                                            color: getRandomHexColor(),
                                            groupBy: subject.categoryName
                                        }
                                    }) ?? []}
                                    selectedValues={selectedSubject}
                                    setSelectedValues={setSelectedSubject}
                                    disabled={isSubjectLoading}
                                />
                            </div>

                        </div>
                    </ScrollArea>
                    <div className="mt-4 flex justify-between">
                        <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                        <Button onClick={() => {
                            setIsFilterDialogOpen(false)
                            handleFilter()
                        }}>Apply Filters</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}