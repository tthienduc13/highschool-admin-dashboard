import { useCreateMajorCategoryMutation } from "@/api/major/query";
import { MajorCategory } from "@/api/major/type";
import { CsvImporter } from "@/components/core/commons/csv-importer";

export const ImportMajorCategoryButton = () => {
    const { mutate: createMajorCategory } = useCreateMajorCategoryMutation();

    return (
        <CsvImporter
            fields={[
                {
                    "label": "Major Category Code",
                    "value": "MajorCategoryCode"
                },
                {
                    "label": "Name",
                    "value": "Name"
                },
                {
                    "label": "MBTI Types",
                    "value": "MBTITypes"
                },
                {
                    "label": "Primary Holland Trait",
                    "value": "PrimaryHollandTrait"
                },
                {
                    "label": "Secondary Holland Trait",
                    "value": "SecondaryHollandTrait"
                }
            ]}
            onImport={async (parsedData) => {
                const formattedData: MajorCategory[] = parsedData.map(
                    (item) => ({
                        majorCategoryCode: String(item.MajorCategoryCode),
                        name: String(item.Name),
                        mbtiTypes: String(item.MBTITypes).split(",").map((type) => type.trim()),
                        primaryHollandTrait: String(item.PrimaryHollandTrait),
                        secondaryHollandTrait: String(item.SecondaryHollandTrait)
                    })
                );

                try {
                    createMajorCategory({
                        majorCategories: formattedData
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