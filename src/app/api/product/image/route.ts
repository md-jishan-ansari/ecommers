import { NextResponse } from 'next/server'
import { uploadImages } from '@/src/middleware/uploadImages';


export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const urls = await uploadImages(formData);

        return NextResponse.json({
            success: true,
            message: 'Files uploaded successfully!',
            urls
        });

    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Error uploading files.' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { imageUrls } = await request.json();

        if (!imageUrls || !Array.isArray(imageUrls)) {
            return NextResponse.json(
                { success: false, message: 'imageUrls array is required' },
                { status: 400 }
            );
        }

        const response = await fetch(
            `${process.env.STATIC_CDN_URL}/api/image/delete-image`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${process.env.PROJECT_API_KEY}`
                },
                body: JSON.stringify({ imageUrls }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Delete failed');
        }

        return NextResponse.json({
            success: true,
            message: 'Files deleted successfully!',
            data
        });

    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json(
            { success: false, message: 'Error deleting files.' },
            { status: 500 }
        );
    }
}
