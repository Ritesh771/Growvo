import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift, Target, TrendingUp, Star, Clock, X } from "lucide-react";

const Advertisement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(27 * 24 * 60 * 60);

  useEffect(() => {
    const endTimeKey = 'adEndTime';
    let endTime: number;
    const storedEndTime = localStorage.getItem(endTimeKey);
    if (!storedEndTime) {
      endTime = Date.now() + (27 * 24 * 60 * 60 * 1000);
      localStorage.setItem(endTimeKey, endTime.toString());
    } else {
      endTime = parseInt(storedEndTime);
    }
    const initialTimeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    setTimeLeft(initialTimeLeft);
    if (initialTimeLeft > 0) {
      setIsOpen(true);
    }
    const timer = setInterval(() => {
      const currentTimeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(currentTimeLeft);
      if (currentTimeLeft <= 0) setIsOpen(false);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClaim = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[90vw] max-w-[320px] aspect-square border-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden p-3 rounded-xl">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400 rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-400 rounded-full opacity-20"
                animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 h-full flex flex-col justify-between"
            >
              {/* Header */}
              <DialogHeader className="text-center px-1 pt-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-2"
                >
                  <Gift className="h-12 w-12 text-yellow-400" />
                </motion.div>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  MEGA DEAL!
                </DialogTitle>
                <DialogDescription className="text-sm text-blue-100 font-semibold text-center">
                  High Demand - Major Projects Alert!
                </DialogDescription>
              </DialogHeader>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center space-y-2 flex-grow justify-center"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Badge className="text-lg px-4 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-lg">
                    30% OFF ON EVERYTHING!
                  </Badge>
                </motion.div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-1.5 w-full">
                  {[
                    { icon: <Target className="h-4 w-4 text-green-400" />, text: "Premium" },
                    { icon: <TrendingUp className="h-4 w-4 text-blue-400" />, text: "Expert" },
                    { icon: <Star className="h-4 w-4 text-yellow-400" />, text: "Priority" },
                    { icon: <Clock className="h-4 w-4 text-purple-400" />, text: "Fast" },
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-1.5 bg-white/10 rounded-lg p-1.5 backdrop-blur-sm text-xs"
                    >
                      {feature.icon}
                      <span>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Countdown */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-red-600/20 rounded-lg p-2 text-center border border-red-400/30 w-full"
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock className="h-4 w-4 text-red-400" />
                    <span className="text-red-300 font-semibold text-xs">Limited Time!</span>
                  </div>
                  <div className="text-lg font-bold font-mono">
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-xs text-red-200 mt-0.5">Time remaining</p>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="flex flex-col gap-2 w-full items-center pb-2"
                >
                  <Button
                    onClick={handleClaim}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold shadow-lg text-sm py-1"
                  >
                    CLAIM NOW!
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 text-xs py-1"
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    Close
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Advertisement;
