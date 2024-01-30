import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  const formData = await req.formData();

  const imageGallery = formData.getAll("imageGallery");
  const titleGallery = formData.getAll("titleGallery");

  let tourImages: any = [];

  if (imageGallery && titleGallery) {
    const results = titleGallery.map((title, index) => ({
      titleGallery: title,
      imageGallery: imageGallery[index],
    }));

    const promises = results.map(async (gallery: any) => {
      const contentType = req.headers.get("content-type") || "text/plain";

      const filename = `${nanoid(10)}${contentType.split("/")[1]}`;

      const blob = await put(filename, gallery.imageGallery, {
        contentType,
        access: "public",
        addRandomSuffix: false,
      });

      const title = gallery.titleGallery;
      const image = blob.url;

      tourImages.push({
        titleGallery: title.toString(),
        imageGallery: image.toString(),
      });
    });

    await Promise.all(promises);
  }

  return NextResponse.json(tourImages);
}
