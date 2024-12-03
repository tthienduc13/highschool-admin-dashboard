"use client"

import { useGetMajorNameQuery } from "@/api/major/query";
import { UseCreateOccupationMutation, UseGetOccupationsQuery, useUpdateOccupationMutation } from "@/api/occupation/query";
import { CareerInfo } from "@/api/occupation/type";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FancyBox, FancyBoxType } from "@/components/ui/fancy-box";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getRandomHexColor } from "@/lib/utils";
import { MinusCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialCareerInfo: CareerInfo = {
    majorCodes: [],
    name: '',
    description: '',
    detail: '',
    chanceToFindJob: 50,
    minSalary: 0,
    averageSalary: 0,
    maxSalary: 0,
    knowledge: [{ title: '', bulletPoints: [''] }],
    skills: [{ title: '', bulletPoints: [''] }],
    abilities: [{ title: '', bulletPoints: [''] }],
    personality: [{ title: '', bulletPoints: [''] }],
    technology: [{ title: '', bulletPoints: [''] }],
}

function OccupationModifyModule() {
    const { data: majors, isPending: isLoadingMajor } = useGetMajorNameQuery({
        pageSize: 10,
        pageNumber: -1,
    });

    const [careerInfo, setCareerInfo] = useState<CareerInfo>(initialCareerInfo);

    const { id } = useParams();
    const decodedId = decodeURIComponent(id as string);
    const router = useRouter();

    const { data: occupationData, isPending: isLoadingOccupation } = UseGetOccupationsQuery({
        pageNumber: 1,
        pageSize: 1,
        search: decodedId as string
    });

    useEffect(() => {
        if (decodedId !== 'create' && occupationData?.totalCount == 0) {
            router.push('/career-mentor/occupation');
        }
        setCareerInfo(occupationData?.data[0] ?? initialCareerInfo);
    }, [isLoadingOccupation, occupationData])

    const [majorCodes, setMajorCodes] = useState<FancyBoxType[]>(initialCareerInfo?.majorCodes.map(majorCode => {
        return {
            label: majorCode,
            value: majorCode,
            color: getRandomHexColor()
        }
    }) ?? []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setCareerInfo(prev => ({ ...prev, [name]: value }))
    }

    const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCareerInfo(prev => ({ ...prev, [name]: parseInt(value, 10) }))
    }

    const handleSliderChange = (value: number[]) => {
        setCareerInfo(prev => ({ ...prev, chanceToFindJob: value[0] }))
    }

    const handleBulletPointSectionChange = (
        sectionIndex: number,
        field: 'knowledge' | 'skills' | 'abilities' | 'personality' | 'technology',
        key: 'title' | 'bulletPoints',
        value: string | string[],
        bulletPointIndex?: number
    ) => {
        setCareerInfo(prev => ({
            ...prev,
            [field]: prev[field].map((section, i) => {
                if (i === sectionIndex) {
                    if (key === 'bulletPoints' && typeof bulletPointIndex === 'number') {
                        return {
                            ...section,
                            bulletPoints: section.bulletPoints.map((point, j) =>
                                j === bulletPointIndex ? value : point
                            )
                        }
                    }
                    return { ...section, [key]: value }
                }
                return section
            })
        }))
    }

    const addBulletPointSection = (field: 'knowledge' | 'skills' | 'abilities' | 'personality' | 'technology') => {
        setCareerInfo(prev => ({
            ...prev,
            [field]: [...prev[field], { title: '', bulletPoints: [''] }]
        }))
    }

    const removeBulletPointSection = (index: number, field: 'knowledge' | 'skills' | 'abilities' | 'personality' | 'technology') => {
        setCareerInfo(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    const addBulletPoint = (sectionIndex: number, field: 'knowledge' | 'skills' | 'abilities' | 'personality' | 'technology') => {
        setCareerInfo(prev => ({
            ...prev,
            [field]: prev[field].map((section, i) =>
                i === sectionIndex
                    ? { ...section, bulletPoints: [...section.bulletPoints, ''] }
                    : section
            )
        }))
    }

    const removeBulletPoint = (sectionIndex: number, bulletPointIndex: number, field: 'knowledge' | 'skills' | 'abilities' | 'personality' | 'technology') => {
        setCareerInfo(prev => ({
            ...prev,
            [field]: prev[field].map((section, i) =>
                i === sectionIndex
                    ? { ...section, bulletPoints: section.bulletPoints.filter((_, j) => j !== bulletPointIndex) }
                    : section
            )
        }))
    }

    const { mutate: createOccupation } = UseCreateOccupationMutation();
    const { mutate: updateOccupation } = useUpdateOccupationMutation();
    const { toast } = useToast();

    const validationFields = () => {
        if (!careerInfo.name || !careerInfo.description || !careerInfo.detail
            || !careerInfo.description) {

            toast({
                title: "Some errors occurred",
                description: "Please fill all required fields",
                variant: "destructive",
            });

            return false;
        }

        if (careerInfo.minSalary > careerInfo.averageSalary || careerInfo.averageSalary > careerInfo.maxSalary) {
            toast({
                title: "Some errors occurred",
                description: "Please make sure that min salary is less than average salary and average salary is less than max salary",
                variant: "destructive",
            });

            return false;
        }

        if (careerInfo.minSalary < 0 || careerInfo.averageSalary < 0 || careerInfo.maxSalary < 0) {
            toast({
                title: "Some errors occurred",
                description: "Please make sure that salary fields are positive numbers",
                variant: "destructive",
            });

            return false;
        }

        return true;
    }

    const handleSave = () => {
        if (!validationFields()) {
            return;
        }

        try {
            if (decodedId === 'create') {
                createOccupation({
                    careerInfoList: [careerInfo]
                });
                setCareerInfo(initialCareerInfo);
            } else {
                updateOccupation({
                    careerInfo: careerInfo
                });
            }

        } catch {
            return;
        }
    }

    useEffect(() => {
        setCareerInfo(prev => ({ ...prev, majorCodes: majorCodes.map(majorCode => majorCode.value) }))
    }, [majorCodes])

    if (isLoadingMajor) {
        return <div>Loading...</div>
    }


    return (
        <div className="space-y-8 p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold tracking-tight text-primary">Career Information</CardTitle>
                    <CardDescription>Enter the details for the new career path</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="name">Career Name</Label>
                            <Input id="name" name="name" value={careerInfo.name} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea id="description" name="description" value={careerInfo.description} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label htmlFor="detail">Detailed Description</Label>
                            <Textarea id="detail" name="detail" value={careerInfo.detail} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="flex w-full space-x-12">
                        <div className="space-y-2 w-[25vw]">
                            <Label>Major Codes</Label>
                            <FancyBox
                                items={
                                    majors?.data?.map(major => {
                                        return {
                                            label: major.name,
                                            value: major.majorCode,
                                            color: getRandomHexColor()
                                        }
                                    }) || []
                                }
                                selectedValues={majorCodes}
                                setSelectedValues={setMajorCodes}
                            />
                        </div>
                        <div className="space-y-6 w-[55vw]">
                            <Label>Chance to Find Job <span className="font-bold">({careerInfo.chanceToFindJob}%)</span></Label>
                            <Slider
                                value={[careerInfo.chanceToFindJob]}
                                onValueChange={handleSliderChange}
                                max={100}
                                step={1}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label htmlFor="minSalary">Minimum Salary</Label>
                                <Input
                                    id="minSalary"
                                    name="minSalary"
                                    type="number"
                                    value={careerInfo.minSalary}
                                    onChange={handleNumberInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="averageSalary">Average Salary</Label>
                                <Input
                                    id="averageSalary"
                                    name="averageSalary"
                                    type="number"
                                    value={careerInfo.averageSalary}
                                    onChange={handleNumberInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="maxSalary">Maximum Salary</Label>
                                <Input
                                    id="maxSalary"
                                    name="maxSalary"
                                    type="number"
                                    value={careerInfo.maxSalary}
                                    onChange={handleNumberInputChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bullet Point Sections */}
                    {(['knowledge', 'skills', 'abilities', 'personality', 'technology'] as const).map((field) => (
                        <div key={field} className="space-y-4">
                            <Label className="text-lg font-semibold capitalize">{field}</Label>
                            {careerInfo[field].map((section, sectionIndex) => (
                                <Card key={sectionIndex}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <Input
                                                value={section.title}
                                                onChange={(e) => handleBulletPointSectionChange(sectionIndex, field, 'title', e.target.value)}
                                                placeholder={`${field} Section Title`}
                                                className="font-semibold"
                                            />
                                            <Button type="button" variant="outline" size="icon" onClick={() => removeBulletPointSection(sectionIndex, field)}>
                                                <MinusCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        {section.bulletPoints.map((point, bulletPointIndex) => (
                                            <div key={bulletPointIndex} className="flex items-center space-x-2">
                                                <Input
                                                    value={point}
                                                    onChange={(e) => handleBulletPointSectionChange(sectionIndex, field, 'bulletPoints', e.target.value, bulletPointIndex)}
                                                    placeholder={`Bullet Point ${bulletPointIndex + 1}`}
                                                />
                                                <Button type="button" variant="outline" size="icon" onClick={() => removeBulletPoint(sectionIndex, bulletPointIndex, field)}>
                                                    <MinusCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" onClick={() => addBulletPoint(sectionIndex, field)} className="mt-2">
                                            Add Bullet Point
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                            <Button type="button" variant="outline" onClick={() => addBulletPointSection(field)} className="mt-2">
                                Add {field.charAt(0).toUpperCase() + field.slice(1)} Section
                            </Button>
                        </div>
                    ))}
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={handleSave}
                    >
                        Create Career Information
                    </Button>
                </CardFooter>
            </Card>
        </div>

    )
}

export default OccupationModifyModule;