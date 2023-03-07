import React, { useState } from 'react';

const AddFile = () => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const files = [...e.dataTransfer.files];
    handleFileAdded(files);
  };

  const handleFileAdded = (files) => {
    files.forEach((file) => {
      alert(`The file ${file.name} has been added!`);
    });
  };

  return (
    <div
      className={`border-2 border-dashed border-gray-400 rounded-lg text-gray-400 text-center py-16 transition-colors ${
        dragging ? 'bg-gray-200 border-gray-600' : 'bg-gray-50 hover:bg-gray-100'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      Drag and drop a file here to upload
    </div>
  );
};

export default AddFile;
