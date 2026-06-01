import { useState } from "react";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { useResumeData } from "@/hooks/useResumeData";
import { Button } from "@/components/ui/button";
import { Download, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";

export default function ResumeBuilder() {
  const { data, updateData, clearData } = useResumeData();
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30">
      {/* LEFT PANEL - Form */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full md:w-[450px] lg:w-[500px] border-r border-border bg-sidebar flex flex-col z-10 shrink-0 ${isPrinting ? 'no-print hidden' : ''}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border bg-sidebar/95 backdrop-blur shrink-0">
          <div className="flex items-center gap-2 text-sidebar-foreground">
            <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.5)]">
              <span className="text-[10px] font-bold text-primary-foreground">CV</span>
            </div>
            <h1 className="font-semibold tracking-tight">Studio Resume</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-popover border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear entire resume?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your entered data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Yes, clear data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button 
              size="sm" 
              onClick={handlePrint}
              className="h-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all hover:shadow-lg"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden relative">
          <ResumeForm data={data} updateData={updateData} />
          {/* Subtle gradient overlay to indicate scrollable content at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-sidebar to-transparent pointer-events-none" />
        </div>
      </motion.div>
      
      {/* RIGHT PANEL - Preview */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`flex-1 overflow-auto bg-[#0a0a0a] relative flex justify-center py-10 px-4 md:px-10 ${isPrinting ? 'print-container !bg-white !py-0 !px-0' : ''}`}
      >
        <div className={`w-full max-w-[850px] transition-transform origin-top ${isPrinting ? 'max-w-none w-full !transform-none !shadow-none' : 'shadow-2xl'}`}>
          <ResumePreview data={data} />
        </div>
      </motion.div>
    </div>
  );
}
