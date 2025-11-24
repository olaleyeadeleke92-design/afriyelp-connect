import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Building2,
  Edit,
  Plus,
  Calendar,
  Activity,
  Megaphone,
  Eye,
  Phone,
  MessageCircle,
  Globe,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { categories } from "@/data/categories";

const updateSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  content: z.string().trim().min(1, "Content is required").max(1000),
});

const BusinessDashboard = () => {
  const { id } = useParams();
  
  // Mock business data - will be replaced with Laravel API
  const [business] = useState({
    id: id,
    name: "Sample Business",
    category: "Technology & Digital Services",
    description: "A leading technology solutions provider offering web development, app development, and digital marketing services.",
    address: "45 Herbert Macaulay Way, Yaba, Lagos",
    phone: "+2348087654321",
    whatsapp: "+2348087654321",
    website: "https://example.com",
    verified: true,
    status: "active",
    views: 1234,
    call_clicks: 89,
    whatsapp_clicks: 156,
  });

  const [updates, setUpdates] = useState([
    {
      id: "1",
      title: "New Service Launch",
      content: "We're excited to announce our new AI-powered chatbot service!",
      update_type: "update",
      created_at: new Date().toISOString(),
      event_date: null,
    },
    {
      id: "2",
      title: "Tech Meetup 2025",
      content: "Join us for our annual technology meetup with industry leaders.",
      update_type: "event",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      event_date: new Date(Date.now() + 604800000).toISOString(),
    },
  ]);
  
  const [loading] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    title: "",
    content: "",
    update_type: "update",
    event_date: "",
  });

  // Placeholder for future Laravel API integration
  useEffect(() => {
    if (id) {
      // TODO: Fetch business data from Laravel API
      // fetchBusiness(id);
      // fetchUpdates(id);
    }
  }, [id]);

  const handleAddUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      updateSchema.parse(updateForm);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    // Mock add update - will be replaced with Laravel API
    const newUpdate = {
      id: Date.now().toString(),
      business_id: id,
      title: updateForm.title,
      content: updateForm.content,
      update_type: updateForm.update_type,
      event_date: updateForm.event_date || null,
      created_at: new Date().toISOString(),
    };

    setUpdates([newUpdate, ...updates]);
    toast.success("Update added successfully");
    setShowUpdateDialog(false);
    setUpdateForm({
      title: "",
      content: "",
      update_type: "update",
      event_date: "",
    });
    
    // TODO: Send to Laravel API
  };

  const handleDeleteUpdate = (updateId: string) => {
    // Mock delete - will be replaced with Laravel API
    setUpdates(updates.filter(update => update.id !== updateId));
    toast.success("Update deleted successfully");
    
    // TODO: Send delete request to Laravel API
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-4 w-4" />;
      case "activity":
        return <Activity className="h-4 w-4" />;
      default:
        return <Megaphone className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {business?.name}
              </h1>
              <div className="flex items-center gap-2">
                <Badge variant={business?.verified ? "default" : "secondary"}>
                  {business?.verified ? "Verified" : "Unverified"}
                </Badge>
                <Badge variant="outline" className="capitalize">
                  {business?.status}
                </Badge>
              </div>
            </div>
            <Link to={`/business/${id}`}>
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Public Page
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Stats Cards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5" />
                  Profile Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{business?.views || 0}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Phone className="h-5 w-5" />
                  Call Clicks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{business?.call_clicks || 0}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Clicks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{business?.whatsapp_clicks || 0}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 mt-6">
            {/* Business Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Business Information
                  </span>
                  <Link to="/add-business">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{business?.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="font-medium">{business?.description}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{business?.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium">{business?.phone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Updates, Events & Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5" />
                    Updates & Events
                  </span>
                  <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Update, Event, or Activity</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddUpdate} className="space-y-4">
                        <div>
                          <Label htmlFor="type">Type</Label>
                          <Select
                            value={updateForm.update_type}
                            onValueChange={(value) =>
                              setUpdateForm({ ...updateForm, update_type: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="update">Update</SelectItem>
                              <SelectItem value="event">Event</SelectItem>
                              <SelectItem value="activity">Activity</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={updateForm.title}
                            onChange={(e) =>
                              setUpdateForm({ ...updateForm, title: e.target.value })
                            }
                            required
                            maxLength={100}
                          />
                        </div>
                        <div>
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            value={updateForm.content}
                            onChange={(e) =>
                              setUpdateForm({ ...updateForm, content: e.target.value })
                            }
                            required
                            maxLength={1000}
                          />
                        </div>
                        {updateForm.update_type === "event" && (
                          <div>
                            <Label htmlFor="event_date">Event Date</Label>
                            <Input
                              id="event_date"
                              type="datetime-local"
                              value={updateForm.event_date}
                              onChange={(e) =>
                                setUpdateForm({
                                  ...updateForm,
                                  event_date: e.target.value,
                                })
                              }
                            />
                          </div>
                        )}
                        <Button type="submit">Add Update</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {updates.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">
                    No updates yet. Add your first update!
                  </p>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {updates.map((update) => (
                      <div
                        key={update.id}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="capitalize">
                              {getUpdateIcon(update.update_type)}
                              {update.update_type}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUpdate(update.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                        <h4 className="font-semibold mb-1">{update.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {update.content}
                        </p>
                        {update.event_date && (
                          <p className="text-xs text-muted-foreground">
                            Event Date:{" "}
                            {new Date(update.event_date).toLocaleDateString()}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Posted: {new Date(update.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
