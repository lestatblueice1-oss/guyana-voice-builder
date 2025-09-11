import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: "Infrastructure", name: "Infrastructure" },
  { id: "Health", name: "Health" },
  { id: "Housing", name: "Housing" },
  { id: "Education", name: "Education" },
];

export const CategoryDrawer = ({ isOpen, onClose, onCategorySelect }: CategoryDrawerProps) => {
  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full bg-card z-50 transition-transform duration-300 ease-out shadow-strong ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '75vw', maxWidth: '320px' }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-foreground">Categories</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="w-full text-left p-4 rounded-lg border border-card-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group"
              >
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};