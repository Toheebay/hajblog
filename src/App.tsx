
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import Index from "./pages/Index";
import ItemDetail from "./pages/ItemDetail";
import Chat from "./pages/Chat";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import BlogPost from "./pages/BlogPost";
import CreateBlogPost from "./pages/CreateBlogPost";
import EditBlogPost from "./pages/EditBlogPost";
import Donate from "./pages/Donate";
import Courses from "./pages/Courses";
import AdminCourses from "./pages/AdminCourses";
import Certifications from "./pages/Certifications";
import Mentorship from "./pages/Mentorship";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CurrencyProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/item/:id" element={<ItemDetail />} />
              <Route path="/chat/:userId" element={<Chat />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-listing" element={<CreateListing />} />
              <Route path="/my-listings" element={<MyListings />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/:id" element={<BlogPost />} />
              <Route path="/community/create" element={<CreateBlogPost />} />
              <Route path="/community/edit/:id" element={<EditBlogPost />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/mentorship" element={<Mentorship />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CurrencyProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
