
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SupabaseAuthProvider } from "@/contexts/SupabaseAuthContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import ItemDetail from "./pages/ItemDetail";
import Donate from "./pages/Donate";
import Chat from "./pages/Chat";
import Messages from "./pages/Messages";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CreateBlogPost from "./pages/CreateBlogPost";
import EditBlogPost from "./pages/EditBlogPost";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import AdminCourses from "./pages/AdminCourses";
import Mentorship from "./pages/Mentorship";
import Certifications from "./pages/Certifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <SupabaseAuthProvider>
            <CurrencyProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-listing" element={<CreateListing />} />
                <Route path="/my-listings" element={<MyListings />} />
                <Route path="/item/:id" element={<ItemDetail />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/create" element={<CreateBlogPost />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/blog/:id/edit" element={<EditBlogPost />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<CourseDetail />} />
                <Route path="/admin/courses" element={<AdminCourses />} />
                <Route path="/mentorship" element={<Mentorship />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CurrencyProvider>
          </SupabaseAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
