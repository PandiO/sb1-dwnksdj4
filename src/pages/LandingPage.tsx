import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Slideshow } from '../components/Slideshow';
import { ImageUploadModal } from '../components/ImageUploadModal';

const DEMO_IMAGES = [
  {
    id: '1',
    url: 'https://www.dropbox.com/scl/fi/lamvulvwv126hxfwl7lat/1.jpg?rlkey=ff5h3fsy88mq2se5kwmahhhyq&st=x3p9libg&dl=0',
    title: 'Yosemite Valley',
    photographer: 'Bailey Zindel',
    description: 'Sunrise at Yosemite National Park'
  },
  {
    id: '2',
    url: 'https://www.dropbox.com/scl/fi/1p2mehhfy13vptq0q9dhh/Forrestview_south-west_Cinix_noon.jpg?rlkey=xq2jb0r70l8wuuclpn4cr0jxz&st=1xlm521l&dl=0',
    title: 'Northern Lights',
    photographer: 'Jonatan Pie',
    description: 'Aurora Borealis in Iceland'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2',
    title: 'Antelope Canyon',
    photographer: 'Aman Upadhyay',
    description: 'Light beams in Upper Antelope Canyon'
  }
];

export function LandingPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [images, setImages] = useState(DEMO_IMAGES);

  const handleImageSubmit = async (data: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const imageUrl = URL.createObjectURL(data.file);
      
      const newImage = {
        id: Date.now().toString(),
        url: imageUrl,
        title: data.title,
        photographer: data.photographer,
        description: data.description
      };
      
      setImages(prevImages => [...prevImages, newImage]);
      setShowUploadModal(false);
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Slideshow */}
      <div className="fixed inset-0">
        <Slideshow images={images} />
      </div>

      {/* Fixed Content Overlay */}
      <div className="relative z-30">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-white p-8">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Our Community
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Share your most beautiful moments with the world. Submit your photos to be featured in our background slideshow.
            </p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Upload className="h-5 w-5 mr-2" />
              Submit Your Photo
            </button>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <ImageUploadModal
          onClose={() => setShowUploadModal(false)}
          onSubmit={handleImageSubmit}
        />
      )}
    </div>
  );
}