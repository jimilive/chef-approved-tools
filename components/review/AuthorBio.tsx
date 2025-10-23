import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AuthorBioProps {
  name?: string;
  title?: string;
  bio?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function AuthorBio({
  name = "Scott Bradley",
  title = "Professional Chef • 45 Years Cooking Experience",
  bio = "Former Kitchen Manager at Mellow Mushroom with 24 years of restaurant experience. A.A.S. Culinary Arts from Seattle Central College, B.S. Business Administration from University of Montana. I've used Victorinox knives daily since culinary school in 1998, testing them through hundreds of thousands of cuts in professional kitchens.",
  imageSrc = "/images/team/head-shot-1.jpg",
  imageAlt = "Scott Bradley, Professional Chef"
}: AuthorBioProps) {
  return (
    <div className="bg-white p-6 my-8 border border-gray-300 rounded-lg grid grid-cols-[100px_1fr] gap-5 items-start">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={100}
        height={100}
        className="rounded-full object-cover"
      />
      <div>
        <h3 className="m-0 mb-2">About {name}</h3>
        <p className="my-1 font-bold">
          {title}
        </p>
        <p className="my-2 text-sm leading-relaxed">
          {bio}
        </p>
        <Link href="/about" className="text-blue-600 font-bold hover:text-blue-800">
          Read more about my testing methodology →
        </Link>
      </div>
    </div>
  );
}
