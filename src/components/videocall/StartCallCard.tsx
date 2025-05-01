
import React from "react";
import { motion } from "framer-motion";
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface StartCallCardProps {
  roomId: string;
  startCall: () => void;
}

const StartCallCard = ({ roomId, startCall }: StartCallCardProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-nunito">Start a New Video Call</CardTitle>
        <CardDescription className="font-nunito">
          Connect with Bloomie in a private video call. Your room ID is unique to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <motion.div 
          className="w-32 h-32 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Video className="h-16 w-16 text-primary-foreground" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="mb-2 font-medium font-nunito">Your Private Room</p>
          <p className="text-sm bg-muted p-3 rounded-md font-mono">{roomId}</p>
        </motion.div>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg" 
            onClick={startCall}
            className="bg-green-600 hover:bg-green-700 px-8 font-nunito shadow-md hover:shadow-lg transition-all"
          >
            Start Video Call
          </Button>
        </motion.div>
      </CardFooter>
    </Card>
  );
};

export default StartCallCard;
