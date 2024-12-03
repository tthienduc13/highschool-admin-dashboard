import { UseCreateOccupationMutation } from "@/api/occupation/query";
import { CareerInfo } from "@/api/occupation/type";
import { CsvImporter } from "@/components/core/commons/csv-importer";

export const ImportOccupationMajorButton = () => {
    const { mutate: createOccupation } = UseCreateOccupationMutation();

    return (
        <CsvImporter
            fields={[
                {
                    "label": "Major Codes",
                    "value": "MajorCodes"
                },
                {
                    "label": "Name",
                    "value": "Name"
                },
                {
                    "label": "Description",
                    "value": "Description"
                },
                {
                    "label": "Detail",
                    "value": "Detail"
                },
                {
                    "label": "Chance to Find Job",
                    "value": "ChanceToFindJob"
                },
                {
                    "label": "Minimum Salary",
                    "value": "MinSalary"
                },
                {
                    "label": "Average Salary",
                    "value": "AverageSalary"
                },
                {
                    "label": "Maximum Salary",
                    "value": "MaxSalary"
                },
                {
                    "label": "Knowledge",
                    "value": "Knowledge"
                },
                {
                    "label": "Skills",
                    "value": "Skills"
                },
                {
                    "label": "Abilities",
                    "value": "Abilities"
                },
                {
                    "label": "Personality",
                    "value": "Personality"
                },
                {
                    "label": "Technology",
                    "value": "Technology"
                }
            ]}
            onImport={async (parsedData) => {
                const formattedData: CareerInfo[] = parsedData.map(
                    (item) => ({
                        majorCodes: JSON.parse(String(item.MajorCodes)),
                        name: String(item.Name),
                        description: String(item.Description),
                        detail: String(item.Detail),
                        chanceToFindJob: Number(item.ChanceToFindJob),
                        minSalary: Number(item.MinSalary),
                        averageSalary: Number(item.AverageSalary),
                        maxSalary: Number(item.MaxSalary),
                        knowledge: JSON.parse(String(item.Knowledge)),
                        skills: JSON.parse(String(item.skills)),
                        abilities: JSON.parse(String(item.abilities)),
                        personality: JSON.parse(String(item.personality)),
                        technology: JSON.parse(String(item.technology))
                    })
                );

                try {
                    createOccupation({
                        careerInfoList: formattedData
                    });
                } catch (error) {
                    console.error(
                        "Error creating batch of schools",
                        error
                    );
                }
            }}
        />
    )
}