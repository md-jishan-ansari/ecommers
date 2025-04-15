const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

export async function uploadImages(formData: FormData): Promise<{ [key: string]: string }> {
    try {
        // Get all entries from FormData
        const entries = Array.from(formData.entries());

        // Create a map of name to file
        const nameFileMap = new Map<string, any>();
        entries.forEach(([key, value]) => {
            // Check if the value is a file-like object
            if (value && typeof value === 'object' && 'type' in value) {
                nameFileMap.set(key, value);
            }
        });

        if (nameFileMap.size === 0) {
            throw new Error('No files received');
        }

        const uploadFormData = new FormData();

        // Append files with their original names
        nameFileMap.forEach((file, name) => {
            if (allowedTypes.includes(file.type)) {
                uploadFormData.append(name, file);
            }
        });

        uploadFormData.append("quality", "80");
        uploadFormData.append("maxWidth", "1920");
        uploadFormData.append("maxHeight", "1080");

        console.log(uploadFormData);

        const response = await fetch(
            `${process.env.STATIC_CDN_URL}/api/image/upload-image`,
            {
                method: "POST",
                body: uploadFormData,
                headers: {
                    'Authorization': `Bearer ${process.env.PROJECT_API_KEY}`
                }
            }
        );

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.urls;

    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}