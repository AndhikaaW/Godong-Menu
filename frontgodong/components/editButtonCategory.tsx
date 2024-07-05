// File: src/components/EditButtonCategory.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditButtonProps {
  category: {
    id: string;
    name: string;
    icon: string | null;
    description: string;
  };
  onCategoryEdited: () => void;
}

export default function EditButton({ category, onCategoryEdited }: EditButtonProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: category.id,
    name: category.name,
    icon: category.icon,
    description: category.description,
  });


  useEffect(() => {
    setFormData({
      id: category.id,
      name: category.name,
      icon: category.icon,
      description: category.description,
    });
  }, [category]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    // for (const pair of form.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    // const config = {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Headers": "Content-Type",
        //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        // },
        // withCredentials: true,
    // };
    try {
      const response = await axios.post('http://godongbackend.test/api/editcategories', form);
      console.log('Category edited successfully:', response.data);
      setOpen(false);
      onCategoryEdited(); // Call the function to refresh the category list
    } catch (error) {
      console.error('Error editing category:', error);
      setError('Failed to edit category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const EditCategoryForm = ({ className }: React.ComponentProps<'form'>) => {
    return (
      <form onSubmit={handleSubmit} className={cn('grid items-start gap-4 w-full', className)}>
        <div className="flex flex-row w-full gap-2">
          <div className="flex flex-col w-1/2">
            <div className="grid gap-2">
              <Label htmlFor="id">Category ID</Label>
              <Input name="id" type="text" id="id" className="rounded-xl" value={formData.id} readOnly />
            </div>
            <div className="h-full mt-2">
              <Label className="w-full mb-2 h-fit" htmlFor="description">Description</Label>
              <Textarea
                name="description"
                className="rounded-xl h-full"
                id="description"
                placeholder="Description of Category"
                defaultValue={formData.description}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input name="name" id="name" className="rounded-xl" placeholder="Name of Category" defaultValue={formData.name} required />
            </div>
            <div className="mt-9 flex items-center h-full justify-center w-full">
              <label
                htmlFor="icon"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Choose picture</span>
                  </p>
                </div>
                <input name="icon" id="icon" type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end gap-2 border-t pt-4 mt-4">
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Editing...' : 'Edit'}
          </Button>
        </div>
      </form>
    );
  };

  const Content = () => (
    <div className="grid gap-4 py-4">
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
      </DialogHeader>
      <EditCategoryForm />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#F4F7FE] text-black">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] sm:max--[500px] bg-[#F4F7FE]">
        <Content />
      </DialogContent>
    </Dialog>
  );
}
