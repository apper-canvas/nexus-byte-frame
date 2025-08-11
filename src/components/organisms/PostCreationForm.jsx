import React, { useState, useRef } from "react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { toast } from "react-toastify";

const PostCreationForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  communityId,
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageFile: null,
    linkUrl: "",
    tags: []
  });
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [linkPreview, setLinkPreview] = useState(null);
  const [loadingStates, setLoadingStates] = useState({
    imageUpload: false,
    linkPreview: false
  });
  
  const fileInputRef = useRef(null);
  const contentRef = useRef(null);

  // Available tags for communities
  const availableTags = [
    "Discussion", "Question", "Tutorial", "News", "Show & Tell", 
    "Help Wanted", "Feedback", "Resource", "Event", "Poll"
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }
    
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }
    
    if (formData.linkUrl && !isValidUrl(formData.linkUrl)) {
      newErrors.linkUrl = "Please enter a valid URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleImageUpload = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    setLoadingStates(prev => ({ ...prev, imageUpload: true }));
    
    // Simulate image upload delay
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({ ...prev, imageFile: file }));
        setLoadingStates(prev => ({ ...prev, imageUpload: false }));
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }, 1000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const generateLinkPreview = async (url) => {
    if (!isValidUrl(url)) return;
    
    setLoadingStates(prev => ({ ...prev, linkPreview: true }));
    
    // Simulate link preview generation
    setTimeout(() => {
      try {
        const urlObj = new URL(url);
        setLinkPreview({
          title: `Preview for ${urlObj.hostname}`,
          description: `Link preview for ${url}`,
          image: `https://via.placeholder.com/200x120/5B47E0/ffffff?text=${urlObj.hostname}`,
          domain: urlObj.hostname
        });
        setLoadingStates(prev => ({ ...prev, linkPreview: false }));
      } catch (error) {
        setLoadingStates(prev => ({ ...prev, linkPreview: false }));
      }
    }, 800);
  };

  const handleLinkUrlChange = (url) => {
    handleInputChange("linkUrl", url);
    if (url && isValidUrl(url)) {
      generateLinkPreview(url);
    } else {
      setLinkPreview(null);
    }
  };

  const toggleTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const postData = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      communityId: String(communityId),
      author: "CurrentUser", // This would come from auth context
      tags: formData.tags,
      imageUrl: imagePreview || null,
      linkUrl: formData.linkUrl.trim() || null,
      linkPreview: linkPreview || null
    };

    try {
      await onSubmit(postData);
      handleClose();
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      content: "",
      imageFile: null,
      linkUrl: "",
      tags: []
    });
    setErrors({});
    setImagePreview(null);
    setLinkPreview(null);
    setLoadingStates({ imageUpload: false, linkPreview: false });
    onClose();
  };

  const formatText = (command) => {
    const textarea = contentRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const beforeText = formData.content.substring(0, start);
    const afterText = formData.content.substring(end);

    let newText = "";
    let newCursorPos = start;

    switch (command) {
      case "bold":
        newText = `${beforeText}**${selectedText || "bold text"}**${afterText}`;
        newCursorPos = selectedText ? end + 4 : start + 2;
        break;
      case "italic":
        newText = `${beforeText}_${selectedText || "italic text"}_${afterText}`;
        newCursorPos = selectedText ? end + 2 : start + 1;
        break;
      case "link":
        const linkText = selectedText || "link text";
        newText = `${beforeText}[${linkText}](url)${afterText}`;
        newCursorPos = start + linkText.length + 3;
        break;
      default:
        return;
    }

    handleInputChange("content", newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 font-display">
              Create New Post
            </h2>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col max-h-[calc(90vh-80px)]">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                  <span className="text-xs text-gray-500 ml-2">
                    ({formData.title.length}/200)
                  </span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="What's your post about?"
                  className={cn(
                    "w-full",
                    errors.title && "border-red-300 focus:border-red-500"
                  )}
                  maxLength={200}
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Content with formatting toolbar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                
                {/* Formatting Toolbar */}
                <div className="border border-gray-300 rounded-t-lg bg-gray-50 px-3 py-2 flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("bold")}
                    className="p-1.5"
                    title="Bold"
                  >
                    <ApperIcon name="Bold" size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("italic")}
                    className="p-1.5"
                    title="Italic"
                  >
                    <ApperIcon name="Italic" size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => formatText("link")}
                    className="p-1.5"
                    title="Link"
                  >
                    <ApperIcon name="Link" size={16} />
                  </Button>
                  <div className="text-xs text-gray-500 ml-auto">
                    Markdown supported
                  </div>
                </div>
                
                <textarea
                  ref={contentRef}
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Share your thoughts, ask questions, or start a discussion..."
                  className={cn(
                    "w-full min-h-[120px] px-3 py-2 border border-t-0 border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none",
                    errors.content && "border-red-300 focus:ring-red-500"
                  )}
                  rows={6}
                />
                {errors.content && (
                  <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image (Optional)
                </label>
                <div
                  className={cn(
                    "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors",
                    dragActive && "border-primary-400 bg-primary-50",
                    loadingStates.imageUpload && "opacity-50"
                  )}
                  onDrop={handleDrop}
                  onDragOver={handleDrag}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                >
                  {loadingStates.imageUpload ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-2"></div>
                      <p className="text-sm text-gray-600">Uploading...</p>
                    </div>
                  ) : imagePreview ? (
                    <div className="space-y-3">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <div className="flex justify-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Change Image
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, imageFile: null }));
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <ApperIcon name="Upload" className="h-8 w-8 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Drag and drop an image here, or{" "}
                          <button
                            type="button"
                            className="text-primary-600 hover:text-primary-700 font-medium"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            browse files
                          </button>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files[0] && handleImageUpload(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Link URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link URL (Optional)
                </label>
                <Input
                  value={formData.linkUrl}
                  onChange={(e) => handleLinkUrlChange(e.target.value)}
                  placeholder="https://example.com"
                  className={cn(
                    "w-full",
                    errors.linkUrl && "border-red-300 focus:border-red-500"
                  )}
                />
                {errors.linkUrl && (
                  <p className="text-red-600 text-sm mt-1">{errors.linkUrl}</p>
                )}
                
                {/* Link Preview */}
                {loadingStates.linkPreview && (
                  <div className="mt-3 p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Generating preview...</span>
                    </div>
                  </div>
                )}
                
                {linkPreview && (
                  <div className="mt-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex space-x-3">
                      <img 
                        src={linkPreview.image} 
                        alt="Link preview"
                        className="w-16 h-16 rounded object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {linkPreview.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {linkPreview.description}
                        </p>
                        <p className="text-xs text-primary-600 mt-1">
                          {linkPreview.domain}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                        formData.tags.includes(tag)
                          ? "bg-primary-100 text-primary-800 border-2 border-primary-300"
                          : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                {formData.tags.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Selected: {formData.tags.join(", ")}
                  </p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="min-w-24"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Posting...
                  </div>
                ) : (
                  "Create Post"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostCreationForm;