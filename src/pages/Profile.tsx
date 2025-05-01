
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { User, UserCog } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    fullName: "Krushna Mengal",
    email: "krushnamengal46@gmail.com",
    bio: "I'm a content writer and project manager who loves collaborating on documents.",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notifications: {
      email: true,
      desktop: true,
      collaborationInvites: true,
      documentUpdates: false,
    },
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    });
    
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        notifications: {
          ...formData.notifications,
          [name.split('.')[1]]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-theme-blue">Account Settings</h1>
        <p className="text-gray-600">Manage your profile and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/lovable-uploads/bbe9c739-3127-46cd-b2fb-2f2d731f581f.png" />
                  <AvatarFallback className="bg-theme-blue text-white text-xl">KM</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="w-full">Change Picture</Button>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input 
                      id="fullName"
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="Your email address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea 
                      id="bio"
                      name="bio" 
                      value={formData.bio} 
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself" 
                      className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  
                  <Button type="submit" className="bg-theme-blue hover:bg-theme-blue/90">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      id="currentPassword"
                      name="currentPassword" 
                      type="password" 
                      value={formData.currentPassword} 
                      onChange={handleInputChange}
                      placeholder="••••••••"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword"
                      name="newPassword" 
                      type="password" 
                      value={formData.newPassword} 
                      onChange={handleInputChange}
                      placeholder="••••••••" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword"
                      name="confirmPassword" 
                      type="password" 
                      value={formData.confirmPassword} 
                      onChange={handleInputChange}
                      placeholder="••••••••" 
                    />
                  </div>
                  
                  <Button type="submit" className="bg-theme-blue hover:bg-theme-blue/90">
                    Change Password
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="notifications.email" 
                        name="notifications.email" 
                        checked={formData.notifications.email} 
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-theme-blue"
                      />
                      <Label htmlFor="notifications.email">Email Notifications</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="notifications.desktop" 
                        name="notifications.desktop" 
                        checked={formData.notifications.desktop} 
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-theme-blue"
                      />
                      <Label htmlFor="notifications.desktop">Desktop Notifications</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="notifications.collaborationInvites" 
                        name="notifications.collaborationInvites" 
                        checked={formData.notifications.collaborationInvites} 
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-theme-blue"
                      />
                      <Label htmlFor="notifications.collaborationInvites">Collaboration Invites</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="notifications.documentUpdates" 
                        name="notifications.documentUpdates" 
                        checked={formData.notifications.documentUpdates} 
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-theme-blue"
                      />
                      <Label htmlFor="notifications.documentUpdates">Document Updates</Label>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Notification Settings Updated",
                        description: "Your notification settings have been saved.",
                      });
                    }}
                    className="bg-theme-blue hover:bg-theme-blue/90"
                  >
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4 flex-wrap">
                <Button variant="outline" className="border-theme-blue text-theme-blue hover:bg-theme-blue/10">
                  Download My Data
                </Button>
                <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
