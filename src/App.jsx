import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Communities from "@/components/pages/Communities";
import CommunityDetail from "@/components/pages/CommunityDetail";
import PostDetail from "@/components/pages/PostDetail";
import MyFeed from "@/components/pages/MyFeed";
import Trending from "@/components/pages/Trending";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
<Routes>
          <Route path="/" element={<Communities searchQuery={searchQuery} />} />
          <Route path="/community/:id" element={<CommunityDetail />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/feed" element={<MyFeed />} />
          <Route path="/trending" element={<Trending />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;