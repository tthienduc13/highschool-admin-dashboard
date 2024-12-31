"use client"
import { useGetQuestionsQuery } from "@/api/question/query";
import { useState } from "react";
import { NewQuiz } from "./new-quiz";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Answer } from "@/api/question/type";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

export const Quiz = () => {

    const { data: responseQuestion, isLoading } = useGetQuestionsQuery({
        categoryId: "01941859-eabb-7d8f-f135-350be88ec298",
        questionCategory: "Lesson",
    });

    const [isCreateQuiz, setIsCreateQuiz] = useState<boolean>(false);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="grid gap-4">
            {isCreateQuiz && <NewQuiz isOpen={isCreateQuiz} setOpen={setIsCreateQuiz} />}
            <Button
                onClick={() => setIsCreateQuiz(true)}
            >
                <IconPlus className="h-4 w-4" />
                Create Quiz
            </Button>
            {responseQuestion?.data?.questions.map((question) => (
                <Card key={question.id}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">
                            {question.questionContent}
                        </CardTitle>
                        <Badge variant="secondary">{question.difficulty}</Badge>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible>
                            <AccordionItem value="answers">
                                <AccordionTrigger>View Answers</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid gap-2">
                                        {question.answers.map((answer: Answer) => (
                                            <div
                                                key={answer.id}
                                                className={`rounded-lg border p-3 ${answer.isCorrectAnswer
                                                    ? "border-green-500 bg-green-500/10"
                                                    : "border-border"
                                                    }`}
                                            >
                                                {answer.answerContent}
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}