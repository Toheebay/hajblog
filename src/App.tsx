
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SupabaseAuthProvider } from "./contexts/SupabaseAuthContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import Index from "./pages/Index";
import ItemDetail from "./pages/ItemDetail";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import CreateListing from "./pages/CreateListing";
import MyListings from "./pages/MyListings";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CreateBlogPost from "./pages/CreateBlogPost";
import EditBlogPost from "./pages/EditBlogPost";
import Donate from "./pages/Donate";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import AdminCourses from "./pages/AdminCourses";
import Certifications from "./pages/Certifications";
import Mentorship from "./pages/Mentorship";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SupabaseAuthProvider>
          <AuthProvider>
            <CurrencyProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/item/:id" element={<ItemDetail />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/create-listing" element={<CreateListing />} />
                  <Route path="/my-listings" element={<MyListings />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/chat/:userId" element={<Chat />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogPost />} />
                  <Route path="/blog/create" element={<CreateBlogPost />} />
                  <Route path="/blog/:id/edit" element={<EditBlogPost />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="/courses/:id" element={<CourseDetail />} />
                  <Route path="/admin/courses" element={<AdminCourses />} />
                  <Route path="/certifications" element={<Certifications />} />
                  <Route path="/mentorship" element={<Mentorship />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CurrencyProvider>
          </AuthProvider>
        </SupabaseAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
