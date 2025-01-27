import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { writeFile } from 'fs/promises'
import sharp from 'sharp'

const CDN_PATH = '/var/www/resources/CDN'

export async function POST(request: Request) {
    if (!fs.existsSync(CDN_PATH)){
        fs.mkdirSync(CDN_PATH, { recursive: true })
    }

    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'No file received.' },
                { status: 400 }
            )
        }

        const bytes = await file.arrayBuffer()
        // Convert to Uint8Array for proper typing
        const buffer = new Uint8Array(bytes)

        const compressedImageBuffer = await sharp(buffer)
            .resize(1920, 1080, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: 80 })
            .toBuffer()

        const filename = `${Date.now()}-${file.name}`
        const filepath = path.join(CDN_PATH, filename)

        await writeFile(filepath, new Uint8Array(compressedImageBuffer))

        return NextResponse.json({
            success: true,
            message: 'File uploaded successfully!',
            path: `http://www.resources.com/CDN/${filename}`
        })

    } catch (error) {
        console.log({error});
        return NextResponse.json(
            { success: false, message: 'Error uploading file.' },
            { status: 500 }
        )
    }
}

export async function DELETE(request: Request) {
    if (!fs.existsSync(CDN_PATH)){
        fs.mkdirSync(CDN_PATH, { recursive: true })
    }

    try {

        const {imagename} = await request.json();

        if (!imagename) {
            return NextResponse.json(
                { success: false, message: 'imagename is required' },
                { status: 400 }
            )
        }

        const filepath = path.join(CDN_PATH, imagename)

        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath)
            return NextResponse.json({
                success: true,
                message: 'File deleted successfully!'
            })
        }

        return NextResponse.json(
            { success: false, message: 'File not found' },
            { status: 404 }
        )

    } catch (error) {
        console.log({error});
        return NextResponse.json(
            { success: false, message: 'Deleting file error.' },
            { status: 500 }
        )
    }
}
