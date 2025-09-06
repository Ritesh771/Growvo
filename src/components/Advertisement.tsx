import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Percent,
  Clock,
  Zap,
  Star,
  Gift,
  Rocket,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

const Advertisement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(27 * 24 * 60 * 60); // 27 days in seconds

  useEffect(() => {
    // Get or set end time in localStorage
    const endTimeKey = 'adEndTime';
    let endTime: number;
    const storedEndTime = localStorage.getItem(endTimeKey);
    if (!storedEndTime) {
      endTime = Date.now() + (27 * 24 * 60 * 60 * 1000); // 27 days from now
      localStorage.setItem(endTimeKey, endTime.toString());
    } else {
      endTime = parseInt(storedEndTime);
    }

    // Calculate initial time left
    const initialTimeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
    setTimeLeft(initialTimeLeft);

    // Show advertisement only if time hasn't expired
    if (initialTimeLeft > 0) {
      setIsOpen(true);
    }

    // Countdown timer
    const timer = setInterval(() => {
      const currentTimeLeft = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(currentTimeLeft);
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
    // Handle claim action here
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-full max-w-xs sm:max-w-lg border-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden p-2 sm:p-6 rounded-xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-400 rounded-full opacity-20"
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <DialogHeader className="text-center px-2 sm:px-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-4"
                >
                  <div className="relative">
                    <Gift className="h-16 w-16 text-yellow-400" />
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                     
                    </motion.div>
                  </div>
                </motion.div>

                <DialogTitle className="flex items-center justify-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  
                  MEGA DEAL!
                  
                </DialogTitle>

                <DialogDescription className="text-base sm:text-lg text-blue-100 font-semibold text-center">
                             High Demand Period - Major Projects Alert!
                </DialogDescription>
              </DialogHeader>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col items-center space-y-4 sm:space-y-6 py-4 sm:py-6"
              >
                {/* Main discount badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge className="text-lg sm:text-2xl px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-2xl animate-pulse">
                    
                    30% OFF ON EVERYTHING!
                  </Badge>
                </motion.div>

                {/* Features list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 w-full">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-2 bg-white/10 rounded-lg p-2 sm:p-3 backdrop-blur-sm"
                  >
                    <Target className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium">Premium Components</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-2 bg-white/10 rounded-lg p-2 sm:p-3 backdrop-blur-sm"
                  >
                    <TrendingUp className="h-5 w-5 text-blue-400" />
                    <span className="text-sm font-medium">Expert Services</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center gap-2 bg-white/10 rounded-lg p-2 sm:p-3 backdrop-blur-sm"
                  >
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-medium">Priority Support</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center gap-2 bg-white/10 rounded-lg p-2 sm:p-3 backdrop-blur-sm"
                  >
                    <Clock className="h-5 w-5 text-purple-400" />
                    <span className="text-sm font-medium">Fast Delivery</span>
                  </motion.div>
                </div>

                {/* Countdown timer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-red-600/20 rounded-lg p-2 sm:p-4 text-center border border-red-400/30"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-red-400" />
                    <span className="text-red-300 font-semibold">Limited Time Offer!</span>
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-white font-mono">
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-xs text-red-200 mt-1">Time remaining to claim</p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-center text-blue-100 leading-relaxed text-sm sm:text-base px-1"
                >
                  🔥 Perfect timing for your major projects! Get professional components and expert services at unbeatable prices during this high-demand period.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col gap-3 w-full items-center"
                >
                  <Button
                    onClick={handleClaim}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    
                    CLAIM NOW!
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                  >
                    <X className="h-4 w-4 mr-2" />
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
