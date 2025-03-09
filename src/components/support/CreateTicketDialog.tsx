
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TicketCheck, Paperclip, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { subject: string; message: string; priority: string; category: string }) => void;
}

export const CreateTicketDialog = ({ 
  open, 
  onOpenChange,
  onSubmit
}: CreateTicketDialogProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({ subject, message, priority, category });
      setSubject("");
      setMessage("");
      setPriority("normal");
      setCategory("general");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center">
            <TicketCheck className="h-5 w-5 mr-2 text-purple-600" />
            <DialogTitle>Create Support Ticket</DialogTitle>
          </div>
          <DialogDescription>
            Please provide details about your issue or question. Our support team will respond as soon as possible.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={category} 
                onValueChange={setCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="account">Account Issues</SelectItem>
                  <SelectItem value="payment">Payment Problems</SelectItem>
                  <SelectItem value="task">Task Related</SelectItem>
                  <SelectItem value="technical">Technical Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={priority} 
                onValueChange={setPriority}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Brief description of your issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Please provide as much detail as possible..."
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="resize-none"
            />
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-gray-500">
            <AlertCircle className="h-4 w-4 mt-0.5" />
            <p>
              Please don't include sensitive information like passwords or financial details in your message.
            </p>
          </div>
          
          <DialogFooter className="mt-6 flex justify-between items-center gap-4">
            <Button 
              type="button" 
              variant="outline" 
              size="sm"
              className="mr-auto"
              disabled={isSubmitting}
            >
              <Paperclip className="h-4 w-4 mr-1" /> Attach File
            </Button>
            
            <div className="flex space-x-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting || !subject.trim() || !message.trim()}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Ticket"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
