import { University } from "@/api/university/type"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe2, Mail, MapPin, Phone } from "lucide-react"

export const UniversityInformationCard = ({ university }: { university?: University }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">University Information</CardTitle>
                <CardDescription>Contact details and location</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{university?.region}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{university?.contactPhone}</span>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${university?.contactEmail}`} className="text-sm hover:underline">
                            {university?.contactEmail}
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <Globe2 className="h-4 w-4 text-muted-foreground" />
                        <a href={university?.websiteLink} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                            {university?.websiteLink}
                        </a>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}