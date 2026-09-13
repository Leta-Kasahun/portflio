import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function saveUploadedFile(
  file: File,
  subfolder: string = "uploads"
): Promise<string | null> {
  if (!file || file.size === 0 || !(file instanceof File)) {
    return null;
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), "public", subfolder);
  await mkdir(uploadDir, { recursive: true });

  const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniqueName = `${Date.now()}_${sanitizedOriginalName}`;
  const filePath = join(uploadDir, uniqueName);

  await writeFile(filePath, buffer);

  return `/${subfolder}/${uniqueName}`;
}
