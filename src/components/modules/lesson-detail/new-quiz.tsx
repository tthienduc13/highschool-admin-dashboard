"use client"

import { useState } from "react"
import { X, Plus, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Question, TypeQuestion } from "@/api/question/type"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useCreateQuestionMutation } from "@/api/question/query"

interface NewQuizProps {
    isOpen: boolean
    setOpen: (value: boolean) => void
}

export const NewQuiz = ({ isOpen, setOpen }: NewQuizProps) => {
    const { mutateAsync: createQuestion, isPending: isCreating } = useCreateQuestionMutation({
        categoryId: "01933d47-76c2-7740-5a8c-fea986615e79",
        questionCategory: "Lesson",
    });
    const [formData, setFormData] = useState<Partial<Question>>({
        category: "Lesson",
        categoryId: "01933d47-76c2-7740-5a8c-fea986615e79",
        questionType: "SingleChoice",
        difficulty: "Recognizing",
        questionContent: "",
        questionAnswers: [
            { answerContent: "", isCorrectAnswer: false },
            { answerContent: "", isCorrectAnswer: false },
        ],
    })

    const addAnswer = () => {
        if (formData.questionAnswers && formData.questionAnswers.length < 6) {
            setFormData({
                ...formData,
                questionAnswers: [
                    ...(formData.questionAnswers || []),
                    { answerContent: "", isCorrectAnswer: false },
                ],
            })
        }
    }

    const removeAnswer = (index: number) => {
        if (formData.questionAnswers && formData.questionAnswers.length > 2) {
            setFormData({
                ...formData,
                questionAnswers: formData.questionAnswers.filter((_, i) => i !== index),
            })
        }
    }

    const updateAnswer = (index: number, isCorrect: boolean) => {
        if (formData.questionAnswers) {
            const newAnswers = formData.questionAnswers.map((answer, i) => ({
                ...answer,
                isCorrectAnswer: i === index ? isCorrect : false,
            }))
            setFormData({
                ...formData,
                questionAnswers: newAnswers,
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate that at least one answer is marked as correct
        const hasCorrectAnswer = formData.questionAnswers?.some(
            (answer) => answer.isCorrectAnswer
        )

        if (!hasCorrectAnswer) {
            alert("Please mark at least one answer as correct")
            return
        }

        try {
            // Here you would typically send the data to your API
            console.log(formData)
            const result = await createQuestion([formData as Question])
            // After successful submission, you could redirect back to the quiz list
            if (result.status === 200) setOpen(false)
        } catch (error) {
            console.error("Error creating quiz:", error)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTitle></DialogTitle>
            <DialogContent className="max-w-[80vw] h-[90vh] overflow-y-auto">
                <div className="bg-background">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-6 flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => setOpen(false)} disabled={isCreating}>
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <h1 className="text-2xl font-bold">Create New Quiz</h1>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Question Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="question">Question Content</Label>
                                        <Input
                                            id="question"
                                            placeholder="Enter your question here"
                                            value={formData.questionContent}
                                            onChange={(e) =>
                                                setFormData({ ...formData, questionContent: e.target.value })
                                            }
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="difficulty">Difficulty Level</Label>
                                        <Select
                                            value={formData.difficulty}
                                            onValueChange={(value: TypeQuestion) =>
                                                setFormData({ ...formData, difficulty: value })
                                            }
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select difficulty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Recognizing">Recognizing</SelectItem>
                                                <SelectItem value="Understanding">Understanding</SelectItem>
                                                <SelectItem value="Applying">Applying</SelectItem>
                                                <SelectItem value="Analyzing">Analyzing</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Answers</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {formData.questionAnswers?.map((answer, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 rounded-lg border p-4"
                                        >
                                            <div className="flex-1 space-y-2">
                                                <Label htmlFor={`answer-${index}`}>
                                                    Answer {index + 1}
                                                </Label>
                                                <Input
                                                    id={`answer-${index}`}
                                                    placeholder="Enter answer"
                                                    value={answer.answerContent}
                                                    onChange={(e) => {
                                                        const newAnswers = [...(formData.questionAnswers || [])]
                                                        newAnswers[index] = {
                                                            ...newAnswers[index],
                                                            answerContent: e.target.value,
                                                        }
                                                        setFormData({ ...formData, questionAnswers: newAnswers })
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div className="flex items-center gap-4 pt-8">
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        id={`correct-${index}`}
                                                        checked={answer.isCorrectAnswer}
                                                        onCheckedChange={(checked) =>
                                                            updateAnswer(index, checked)
                                                        }
                                                    />
                                                    <Label htmlFor={`correct-${index}`}>Correct</Label>
                                                </div>
                                                {formData.questionAnswers &&
                                                    formData.questionAnswers.length > 2 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeAnswer(index)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                            </div>
                                        </div>
                                    ))}

                                    {formData.questionAnswers &&
                                        formData.questionAnswers.length < 6 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                onClick={addAnswer}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Answer
                                            </Button>
                                        )}
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-4">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isCreating}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isCreating}>Create Quiz</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

