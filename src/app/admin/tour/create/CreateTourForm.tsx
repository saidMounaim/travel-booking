"use client";

import { DatePicker } from "@/components/shared/DatePicker";
import LoadingButton from "@/components/shared/LoadingButton";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTourFormSchema, createTourFormValues } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { draftToMarkdown } from "markdown-draft-js";
import { useToast } from "@/components/ui/use-toast";
import { createTour } from "../actions";

const CreateTourForm = () => {
  const { toast } = useToast();

  const form = useForm<createTourFormValues>({
    resolver: zodResolver(createTourFormSchema),
  });

  const [galleryItems, setGalleryItems] = useState([
    { title: "", image: null },
  ]);

  const handleAddImage = () => {
    setGalleryItems([...galleryItems, { title: "", image: null }]);
  };

  async function onSubmit(values: createTourFormValues) {
    let tourImage: any = "";
    let tourImages: any = [];

    if (values.feauturedImage) {
      const res = await fetch("/api/tour/featured/upload", {
        method: "POST",
        body: values.feauturedImage,
      });
      tourImage = await res.json();
    }

    if (values.galleryTour) {
      const formData = new FormData();

      values.galleryTour.forEach((item: any) => {
        formData.append("titleGallery", item.titleGallery);
        formData.append("imageGallery", item.imageGallery);
      });

      const res = await fetch("/api/tour/images/upload", {
        method: "POST",
        body: formData,
      });
      tourImages = await res.json();
    }

    try {
      await createTour({
        tour: {
          ...values,
          feauturedImage: tourImage.url.toString(),
          galleryTour: tourImages,
        },
      });
      toast({
        className: "bg-green-600 text-white font-semiBold",
        description: "Tour created successfully",
      });
    } catch (error) {
      toast({
        className: "bg-red-600 text-white font-semiBold",
        description: "Something went wrong, please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        encType="multipart/form-data"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <Label onClick={() => form.setFocus("body")}>Description</Label>
              <FormControl>
                <RichTextEditor
                  onChange={(draft) => field.onChange(draftToMarkdown(draft))}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Check In & Check Out Input */}
        <div className="flex items-center justify-between gap-2">
          <DatePicker name="checkIn" form={form} placeholder="Check In" />
          <DatePicker name="checkOut" form={form} placeholder="Check Out" />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="w-full">
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guests</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Guests" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              control={form.control}
              name="pricePerNight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per night</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price per night"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="feauturedImage"
          render={({ field: { value, ...fieldValues } }) => (
            <FormItem>
              <FormLabel>Feautured Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...fieldValues}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    fieldValues.onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-1xl font-bold mt-4">Gallery</h2>
          {galleryItems.map((imageSet, index) => (
            <>
              <div className="flex items-center gap-2" key={index}>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name={`galleryTour.${index}.titleGallery`}
                    render={({ field: { value, ...fieldValues } }) => (
                      <FormItem>
                        <FormLabel>Title of Image</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Title of Image"
                            {...fieldValues}
                            onChange={(e) => {
                              fieldValues.onChange(e.target.value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name={`galleryTour.${index}.imageGallery`}
                    render={({ field: { value, ...fieldValues } }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            {...fieldValues}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              fieldValues.onChange(file);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </>
          ))}
          <div className="flex flex-col items-end">
            <Button type="button" onClick={handleAddImage}>
              Add new image
            </Button>
          </div>
        </div>

        <LoadingButton
          type="submit"
          className="bg-blue-700 hover:bg-blue-800"
          loading={form.formState.isSubmitting}
        >
          Create
        </LoadingButton>
      </form>
    </Form>
  );
};

export default CreateTourForm;
