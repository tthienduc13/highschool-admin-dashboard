import { useCreateUniversityMajorListMutation } from "@/api/university/query";
import { AdmissionMethod, DegreeLevel, UniversityMajor } from "@/api/university/type";
import { CsvImporter } from "@/components/core/commons/csv-importer";
import { useToast } from "@/hooks/use-toast";

export const ImportUniversityMajorButton = ({ uniCode }: { uniCode: string }) => {
    const { toast } = useToast();
    const { mutate: createUniversityMajor } = useCreateUniversityMajorListMutation();

    const isAdmissionMethod = (majorCode: string) => {
        return Object.values(AdmissionMethod).includes(majorCode as AdmissionMethod);
    }

    const isDegreeLevel = (degreeLevel: string) => {
        return Object.values(DegreeLevel).includes(degreeLevel as DegreeLevel);
    }

    return (
        <CsvImporter
            fields={[
                {
                    "label": "UniCode",
                    "value": "uniCode"
                },
                {
                    "label": "Major Code",
                    "value": "majorCode"
                },
                {
                    "label": "Admission Method",
                    "value": "admissionMethod"
                },
                {
                    "label": "Quota",
                    "value": "quota"
                },
                {
                    "label": "Degree Level",
                    "value": "degreeLevel"
                }
            ]}
            onImport={async (parsedData) => {

                const formattedData: UniversityMajor[] = [];

                for (const item of parsedData) {
                    if (!isAdmissionMethod(String(item.admissionMethod))) {
                        toast({
                            title: "Some fields are invalid",
                            description: "Admission method is invalid",
                            variant: "destructive"
                        });
                        return;
                    } else if (!isDegreeLevel(String(item.degreeLevel))) {
                        toast({
                            title: "Some fields are invalid",
                            description: "Degree level is invalid",
                            variant: "destructive"
                        });
                        return;
                    }

                    formattedData.push({
                        uniCode: String(item.uniCode === "" ? uniCode : item.uniCode),
                        majorCode: String(item.majorCode ?? ""),
                        admissionMethod: String(item.admissionMethod),
                        quota: Number(item.quota),
                        degreeLevel: String(item.degreeLevel),
                    });
                }

                try {
                    if (formattedData.length > 0) {
                        createUniversityMajor({
                            universityMajorList: formattedData
                        });
                    }


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