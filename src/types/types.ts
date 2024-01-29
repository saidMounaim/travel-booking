type GalleryTourProps = {
  titleGallery?: string | undefined;
  imageGallery?: File | undefined;
}[];

export interface CreateTourFormProps {
  tour: {
    body: string;
    title: string;
    checkIn: Date;
    checkOut: Date;
    guests: string;
    pricePerNight: string;
    galleryTour: GalleryTourProps;
    feauturedImage?: string;
  };
}
