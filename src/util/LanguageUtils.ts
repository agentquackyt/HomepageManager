// Map of language codes to our supported languages
const languageMap: { [key: string]: string } = {
    "EN": "EN",
    "EN-US": "EN",
    "EN-GB": "EN",
    "DE": "DE",
    "DE-DE": "DE",
    "FR": "FR",
    "FR-FR": "FR",
    "ES": "ES",
    "ES-ES": "ES",
    "IT": "IT",
    "IT-IT": "IT",
    "NL": "NL",
    "NL-NL": "NL",
    "AR": "AR",
    "AR-SA": "AR",
    "UK": "UK",
    "UK-UA": "UK"
};

// Helper function to get language from Accept-Language header
export function getUserLanguage(request: Request) {
    // Get the Accept-Language header
    const acceptLanguage = request.headers.get("Accept-Language");
    
    // If no header is present, return English
    if (!acceptLanguage) {
        return "EN";
    }

    // Split the header into individual language preferences
    const languages = acceptLanguage
        .split(",")
        .map(lang => {
            const [locale, quality = "q=1"] = lang.split(";");
            const q = parseFloat(quality.split("=")[1]) || 1;
            return { locale: locale.trim().toUpperCase(), q };
        })
        .sort((a, b) => b.q - a.q); // Sort by quality value, highest first

    

    // Find the first matching language
    for (const lang of languages) {
        const mappedLang = languageMap[lang.locale];
        if (mappedLang) {
            return mappedLang;
        }
    }

    // Default to English if no match is found
    return "EN";
}