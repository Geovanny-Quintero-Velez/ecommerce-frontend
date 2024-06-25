import { useState } from 'react';

interface TagsProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
}

const Tags = ({ tags, onRemoveTag }: TagsProps) => {
  return (
    <div className="flex space-x-2 mb-4">
      {tags.map(tag => (
        <div key={tag} className="bg-gray-200 px-4 py-2 rounded-full flex items-center">
          {tag}
          <button onClick={() => onRemoveTag(tag)} className="ml-2 text-red-500">x</button>
        </div>
      ))}
    </div>
  );
};

export default Tags;
