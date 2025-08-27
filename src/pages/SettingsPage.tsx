import { motion } from "framer-motion";
import { Settings, Palette, Monitor, Bell, Shield, User } from "lucide-react";

const SettingsPage = () => {
  const settingsCategories = [
    {
      icon: User,
      title: "Profile",
      description: "Manage your account and personal preferences",
      action: "Manage Profile"
    },
    {
      icon: Palette,
      title: "Appearance",
      description: "Customize theme, colors, and visual preferences",
      action: "Customize Theme"
    },
    {
      icon: Monitor,
      title: "Display",
      description: "Adjust gallery layout and image quality settings",
      action: "Display Options"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Control alerts for new wallpapers and updates",
      action: "Notification Settings"
    },
    {
      icon: Shield,
      title: "Privacy",
      description: "Manage data usage and privacy preferences",
      action: "Privacy Settings"
    }
  ];

  const handleSettingClick = (title: string) => {
    window.dispatchEvent(new CustomEvent('showToast', { 
      detail: { message: `${title} settings coming soon!`, type: 'info' }
    }));
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="w-24 h-24 mx-auto mb-8 glass-card rounded-full flex items-center justify-center"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Settings size={48} className="text-primary animate-pulse-glow" />
          </motion.div>

          <h1 className="font-space text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Settings
          </h1>
          <p className="font-poppins text-xl text-muted-foreground max-w-2xl mx-auto">
            Customize your wallpaper experience and manage preferences
          </p>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid gap-6">
          {settingsCategories.map((setting, index) => (
            <motion.div
              key={setting.title}
              className="glass-card p-8 rounded-2xl hover-lift interactive-card group"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:shadow-glow transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <setting.icon size={32} className="text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="font-space text-2xl font-bold text-foreground mb-2">
                      {setting.title}
                    </h3>
                    <p className="text-muted-foreground font-poppins">
                      {setting.description}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={() => handleSettingClick(setting.title)}
                  className="glass-button px-6 py-3 rounded-xl font-poppins font-semibold text-primary hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {setting.action}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* App Info */}
        <motion.div
          className="mt-12 text-center glass-card p-8 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="font-space text-xl font-bold mb-4 text-foreground">
            App Information
          </h3>
          <div className="space-y-2 text-muted-foreground font-poppins">
            <p>Version: 1.0.0</p>
            <p>Last Update: Today</p>
            <p>Premium Experience Activated</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;